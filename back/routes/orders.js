const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // ============ USER ROUTES ============

  // Создать заказ
  router.post('/', async (req, res) => {
    const client = await pool.connect();
    try {
      const { 
        user_id, items, delivery_city, delivery_address, 
        delivery_date, delivery_time, payment_method, notes,
        customer_name, customer_phone, customer_email,
        total_amount, status, payment_status,
        seller_id  // ID продавца (может отличаться от user_id для клиента)
      } = req.body;

      // Если есть user_id, проверяем что пользователь существует
      if (user_id) {
        const userCheck = await client.query('SELECT id FROM users WHERE id = $1', [user_id]);
        if (userCheck.rows.length === 0) {
          return res.status(404).json({ error: 'Пользователь не найден' });
        }
      }

      await client.query('BEGIN');

      // Создание заказа
      const orderResult = await client.query(
        `INSERT INTO orders 
         (user_id, customer_name, customer_phone, customer_email, 
          total_amount, delivery_city, delivery_address, delivery_date, delivery_time,
          payment_method, payment_status, notes, status, seller_id) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
         RETURNING *`,
        [
          user_id || null, 
          customer_name, 
          customer_phone, 
          customer_email,
          total_amount,
          delivery_city, 
          delivery_address, 
          delivery_date, 
          delivery_time,
          payment_method || 'cash', 
          payment_status || 'pending',
          notes, 
          status || 'pending',
          seller_id || null
        ]
      );

      const orderId = orderResult.rows[0].id;

      // Добавление позиций заказа
      for (const item of items) {
        await client.query(
          'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4)',
          [orderId, item.product_id, item.quantity, item.unit_price]
        );
      }

      // Если есть seller_id, проверяем есть ли открытая смена
      if (seller_id) {
        const shiftCheck = await client.query(
          'SELECT id FROM shifts WHERE user_id = $1 AND status = $2',
          [seller_id, 'open']
        );

        if (shiftCheck.rows.length > 0) {
          const shiftId = shiftCheck.rows[0].id;
          
          // Добавляем продажу в смену
          await client.query(
            `INSERT INTO shift_sales (shift_id, order_id, sale_amount, discount_amount, payment_method)
             VALUES ($1, $2, $3, $4, $5)`,
            [shiftId, orderId, total_amount, 0, payment_method || 'cash']
          );

          // Обновляем статистику смены
          await client.query(
            `UPDATE shifts 
             SET total_sales = total_sales + $1, total_orders = total_orders + 1
             WHERE id = $2`,
            [total_amount, shiftId]
          );
        }
      }

      await client.query('COMMIT');

      res.status(201).json({ 
        success: true, 
        message: 'Заказ успешно создан',
        order: orderResult.rows[0] 
      });
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Create order error:', error);
      res.status(500).json({ error: 'Ошибка при создании заказа' });
    } finally {
      client.release();
    }
  });

  // Получить заказы пользователя
  router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
      const result = await pool.query(
        `SELECT o.*, 
                array_agg(json_build_object(
                  'product_id', oi.product_id,
                  'product_name', p.name,
                  'quantity', oi.quantity,
                  'unit_price', oi.unit_price
                )) as items
         FROM orders o
         LEFT JOIN order_items oi ON o.id = oi.order_id
         LEFT JOIN products p ON oi.product_id = p.id
         WHERE o.user_id = $1
         GROUP BY o.id
         ORDER BY o.created_at DESC`,
        [userId]
      );

      res.json({ success: true, orders: result.rows });
    } catch (error) {
      console.error('Get user orders error:', error);
      res.status(500).json({ error: 'Ошибка при получении заказов' });
    }
  });

  // ============ WORKER ROUTES ============

  // Получить все заказы (worker и admin)
  router.get('/all', async (req, res) => {
    const { userId } = req.query;

    try {
      // Проверка прав
      const userCheck = await pool.query('SELECT role FROM users WHERE id = $1', [userId]);
      if (userCheck.rows.length === 0 || !['admin', 'worker'].includes(userCheck.rows[0].role)) {
        return res.status(403).json({ error: 'Доступ запрещен' });
      }

      const result = await pool.query(
        `SELECT o.*, 
                u.name as user_name,
                u.email as user_email,
                u.phone as user_phone,
                array_agg(json_build_object(
                  'product_id', oi.product_id,
                  'product_name', p.name,
                  'quantity', oi.quantity,
                  'unit_price', oi.unit_price
                )) as items
         FROM orders o
         LEFT JOIN users u ON o.user_id = u.id
         LEFT JOIN order_items oi ON o.id = oi.order_id
         LEFT JOIN products p ON oi.product_id = p.id
         GROUP BY o.id, u.name, u.email, u.phone
         ORDER BY o.created_at DESC`
      );

      res.json({ success: true, orders: result.rows });
    } catch (error) {
      console.error('Get all orders error:', error);
      res.status(500).json({ error: 'Ошибка при получении заказов' });
    }
  });

  // Подтвердить заказ (worker и admin)
  router.put('/:orderId/confirm', async (req, res) => {
    const { orderId } = req.params;
    const { userId } = req.body;

    try {
      // Проверка прав
      const userCheck = await pool.query('SELECT role FROM users WHERE id = $1', [userId]);
      if (userCheck.rows.length === 0 || !['admin', 'worker'].includes(userCheck.rows[0].role)) {
        return res.status(403).json({ error: 'Доступ запрещен' });
      }

      const result = await pool.query(
        'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
        ['confirmed', orderId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Заказ не найден' });
      }

      res.json({ 
        success: true, 
        message: 'Заказ успешно подтвержден',
        order: result.rows[0] 
      });
    } catch (error) {
      console.error('Confirm order error:', error);
      res.status(500).json({ error: 'Ошибка при подтверждении заказа' });
    }
  });

  // Изменить статус заказа (worker и admin)
  router.put('/:orderId/status', async (req, res) => {
    const { orderId } = req.params;
    const { userId, status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'in_transit', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Недопустимый статус' });
    }

    try {
      // Проверка прав
      const userCheck = await pool.query('SELECT role FROM users WHERE id = $1', [userId]);
      if (userCheck.rows.length === 0 || !['admin', 'worker'].includes(userCheck.rows[0].role)) {
        return res.status(403).json({ error: 'Доступ запрещен' });
      }

      const result = await pool.query(
        'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
        [status, orderId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Заказ не найден' });
      }

      res.json({ 
        success: true, 
        message: 'Статус заказа успешно обновлен',
        order: result.rows[0] 
      });
    } catch (error) {
      console.error('Update order status error:', error);
      res.status(500).json({ error: 'Ошибка при обновлении статуса' });
    }
  });

  // Получить один заказ по ID (должен быть после /all)
  router.get('/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
      const result = await pool.query(
        `SELECT o.*, 
                array_agg(json_build_object(
                  'product_id', oi.product_id,
                  'product_name', p.name,
                  'quantity', oi.quantity,
                  'unit_price', oi.unit_price
                )) as items
         FROM orders o
         LEFT JOIN order_items oi ON o.id = oi.order_id
         LEFT JOIN products p ON oi.product_id = p.id
         WHERE o.id = $1
         GROUP BY o.id`,
        [orderId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Заказ не найден' });
      }

      res.json({ success: true, order: result.rows[0] });
    } catch (error) {
      console.error('Get order error:', error);
      res.status(500).json({ error: 'Ошибка при получении заказа' });
    }
  });

  return router;
};

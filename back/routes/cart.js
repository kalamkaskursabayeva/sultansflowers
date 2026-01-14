const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // Получить корзину пользователя
  router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
      const result = await pool.query(
        `SELECT ci.*, p.name, p.price_per_unit, p.price_per_box, p.color, 
                p.variety, p.stem_length, p.packaging_type, p.image_url,
                p.min_order_quantity
         FROM cart_items ci
         LEFT JOIN products p ON ci.product_id = p.id
         WHERE ci.user_id = $1
         ORDER BY ci.created_at DESC`,
        [userId]
      );

      res.json({ success: true, cart: result.rows });
    } catch (error) {
      console.error('Get cart error:', error);
      res.status(500).json({ error: 'Ошибка при получении корзины' });
    }
  });

  // Добавить товар в корзину
  router.post('/', async (req, res) => {
    const { userId, product_id, quantity } = req.body;

    try {
      // Проверяем есть ли уже этот товар в корзине
      const existing = await pool.query(
        'SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2',
        [userId, product_id]
      );

      if (existing.rows.length > 0) {
        // Обновляем количество
        const result = await pool.query(
          `UPDATE cart_items 
           SET quantity = quantity + $1, updated_at = CURRENT_TIMESTAMP 
           WHERE user_id = $2 AND product_id = $3 
           RETURNING *`,
          [quantity, userId, product_id]
        );
        
        res.json({ success: true, message: 'Количество обновлено', item: result.rows[0] });
      } else {
        // Добавляем новый товар
        const result = await pool.query(
          `INSERT INTO cart_items (user_id, product_id, quantity) 
           VALUES ($1, $2, $3) 
           RETURNING *`,
          [userId, product_id, quantity]
        );
        
        res.json({ success: true, message: 'Товар добавлен в корзину', item: result.rows[0] });
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      res.status(500).json({ error: 'Ошибка при добавлении в корзину' });
    }
  });

  // Обновить количество товара
  router.put('/:itemId', async (req, res) => {
    const { itemId } = req.params;
    const { quantity, userId } = req.body;

    try {
      if (quantity <= 0) {
        // Удаляем если количество 0
        await pool.query(
          'DELETE FROM cart_items WHERE id = $1 AND user_id = $2',
          [itemId, userId]
        );
        res.json({ success: true, message: 'Товар удален из корзины' });
      } else {
        // Обновляем количество
        const result = await pool.query(
          `UPDATE cart_items 
           SET quantity = $1, updated_at = CURRENT_TIMESTAMP 
           WHERE id = $2 AND user_id = $3 
           RETURNING *`,
          [quantity, itemId, userId]
        );
        
        res.json({ success: true, message: 'Количество обновлено', item: result.rows[0] });
      }
    } catch (error) {
      console.error('Update cart error:', error);
      res.status(500).json({ error: 'Ошибка при обновлении корзины' });
    }
  });

  // Удалить товар из корзины
  router.delete('/:itemId', async (req, res) => {
    const { itemId } = req.params;
    const { userId } = req.query;

    try {
      await pool.query(
        'DELETE FROM cart_items WHERE id = $1 AND user_id = $2',
        [itemId, userId]
      );
      
      res.json({ success: true, message: 'Товар удален из корзины' });
    } catch (error) {
      console.error('Delete cart item error:', error);
      res.status(500).json({ error: 'Ошибка при удалении товара' });
    }
  });

  // Очистить корзину
  router.delete('/user/:userId/clear', async (req, res) => {
    const { userId } = req.params;

    try {
      await pool.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);
      res.json({ success: true, message: 'Корзина очищена' });
    } catch (error) {
      console.error('Clear cart error:', error);
      res.status(500).json({ error: 'Ошибка при очистке корзины' });
    }
  });

  return router;
};

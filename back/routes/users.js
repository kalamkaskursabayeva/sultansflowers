const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (pool, logger) => {
  // ============ AUTHENTICATION ============
  
  // Регистрация нового пользователя (только role: user)
  router.post('/users/register', async (req, res) => {
    const { email, password, name, phone, city, company_name } = req.body;
    
    try {
      // Проверка существования email
      const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
      }

      // Хеширование пароля
      const passwordHash = await bcrypt.hash(password, 10);

      // Создание пользователя
      const result = await pool.query(
        `INSERT INTO users (email, password_hash, name, phone, city, company_name, role) 
         VALUES ($1, $2, $3, $4, $5, $6, 'user') 
         RETURNING id, email, name, phone, role, city, company_name, created_at`,
        [email, passwordHash, name, phone, city, company_name]
      );

      // Логирование успешной регистрации
      await logger.logRegistration(
        result.rows[0].id, 
        email, 
        req.ip, 
        req.get('user-agent'), 
        true
      );

      res.status(201).json({ 
        success: true, 
        message: 'Пользователь успешно зарегистрирован',
        user: result.rows[0] 
      });
    } catch (error) {
      console.error('Registration error:', error);
      
      // Логирование ошибки регистрации
      await logger.logRegistration(
        null, 
        email, 
        req.ip, 
        req.get('user-agent'), 
        false, 
        error.message
      );
      
      res.status(500).json({ error: 'Ошибка при регистрации' });
    }
  });

  // Авторизация
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1 AND is_active = true', [email]);
      
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Неверный email или пароль' });
      }

      const user = result.rows[0];
      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        return res.status(401).json({ error: 'Неверный email или пароль' });
      }

      // Не возвращаем password_hash
      const { password_hash, ...userWithoutPassword } = user;

      // Логирование успешного входа
      await logger.logLogin(
        user.id, 
        email, 
        req.ip, 
        req.get('user-agent'), 
        true
      );

      res.json({ 
        success: true, 
        message: 'Успешный вход',
        user: userWithoutPassword 
      });
    } catch (error) {
      console.error('Login error:', error);
      
      // Логирование ошибки входа
      await logger.logLogin(
        null, 
        email, 
        req.ip, 
        req.get('user-agent'), 
        false, 
        error.message
      );
      
      res.status(500).json({ error: 'Ошибка при авторизации' });
    }
  });

  // ============ ADMIN ROUTES ============

  // Получить всех пользователей (только для admin)
  router.get('/admin/users', async (req, res) => {
    const { adminId } = req.query;

    try {
      // Проверка прав админа
      const adminCheck = await pool.query('SELECT role FROM users WHERE id = $1', [adminId]);
      if (adminCheck.rows.length === 0 || adminCheck.rows[0].role !== 'admin') {
        return res.status(403).json({ error: 'Доступ запрещен. Требуются права администратора' });
      }

      const result = await pool.query(
        `SELECT id, email, name, phone, role, city, company_name, is_active, created_at 
         FROM users ORDER BY created_at DESC`
      );

      res.json({ success: true, users: result.rows });
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({ error: 'Ошибка при получении пользователей' });
    }
  });

  // Изменить роль пользователя (только для admin)
  router.put('/admin/users/:userId/role', async (req, res) => {
    const { userId } = req.params;
    const { adminId, newRole } = req.body;

    if (!['user', 'worker', 'admin'].includes(newRole)) {
      return res.status(400).json({ error: 'Недопустимая роль' });
    }

    try {
      // Проверка прав админа
      const adminCheck = await pool.query('SELECT role FROM users WHERE id = $1', [adminId]);
      if (adminCheck.rows.length === 0 || adminCheck.rows[0].role !== 'admin') {
        return res.status(403).json({ error: 'Доступ запрещен' });
      }

      const result = await pool.query(
        'UPDATE users SET role = $1 WHERE id = $2 RETURNING id, email, name, role',
        [newRole, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      res.json({ 
        success: true, 
        message: 'Роль успешно изменена',
        user: result.rows[0] 
      });
    } catch (error) {
      console.error('Update role error:', error);
      res.status(500).json({ error: 'Ошибка при изменении роли' });
    }
  });

  // Удалить пользователя (только для admin)
  router.delete('/admin/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const { adminId } = req.query;

    try {
      // Проверка прав админа
      const adminCheck = await pool.query('SELECT role FROM users WHERE id = $1', [adminId]);
      if (adminCheck.rows.length === 0 || adminCheck.rows[0].role !== 'admin') {
        return res.status(403).json({ error: 'Доступ запрещен' });
      }

      // Нельзя удалить самого себя
      if (userId === adminId) {
        return res.status(400).json({ error: 'Невозможно удалить собственную учетную запись' });
      }

      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING email', [userId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      res.json({ 
        success: true, 
        message: `Пользователь ${result.rows[0].email} успешно удален` 
      });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ error: 'Ошибка при удалении пользователя' });
    }
  });

  // Редактировать пользователя (только для admin)
  router.put('/admin/users/:userId', async (req, res) => {
    const { userId } = req.params;
    const { adminId, name, phone, email, city, company_name, is_active } = req.body;

    try {
      // Проверка прав админа
      const adminCheck = await pool.query('SELECT role FROM users WHERE id = $1', [adminId]);
      if (adminCheck.rows.length === 0 || adminCheck.rows[0].role !== 'admin') {
        return res.status(403).json({ error: 'Доступ запрещен' });
      }

      // Проверка email на уникальность (если меняется)
      if (email) {
        const emailCheck = await pool.query(
          'SELECT id FROM users WHERE email = $1 AND id != $2', 
          [email, userId]
        );
        if (emailCheck.rows.length > 0) {
          return res.status(400).json({ error: 'Email уже используется другим пользователем' });
        }
      }

      const result = await pool.query(
        `UPDATE users SET 
          name = COALESCE($1, name),
          phone = COALESCE($2, phone),
          email = COALESCE($3, email),
          city = COALESCE($4, city),
          company_name = COALESCE($5, company_name),
          is_active = COALESCE($6, is_active)
         WHERE id = $7 
         RETURNING id, email, name, phone, role, city, company_name, is_active, created_at`,
        [name, phone, email, city, company_name, is_active, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      res.json({ 
        success: true, 
        message: 'Пользователь успешно обновлен',
        user: result.rows[0]
      });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ error: 'Ошибка при обновлении пользователя' });
    }
  });

  // Изменить пароль пользователя (только для admin)
  router.put('/admin/users/:userId/password', async (req, res) => {
    const { userId } = req.params;
    const { adminId, newPassword } = req.body;

    try {
      // Проверка прав админа
      const adminCheck = await pool.query('SELECT role FROM users WHERE id = $1', [adminId]);
      if (adminCheck.rows.length === 0 || adminCheck.rows[0].role !== 'admin') {
        return res.status(403).json({ error: 'Доступ запрещен' });
      }

      // Хеширование нового пароля
      const passwordHash = await bcrypt.hash(newPassword, 10);

      const result = await pool.query(
        'UPDATE users SET password_hash = $1 WHERE id = $2 RETURNING email',
        [passwordHash, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      res.json({ 
        success: true, 
        message: `Пароль для ${result.rows[0].email} успешно изменен`
      });
    } catch (error) {
      console.error('Update password error:', error);
      res.status(500).json({ error: 'Ошибка при изменении пароля' });
    }
  });

  // ============ USER PROFILE ============

  // Обновить профиль пользователя
  router.put('/profile/:userId', async (req, res) => {
    const { userId } = req.params;
    const { name, phone, city, company_name } = req.body;

    try {
      const result = await pool.query(
        `UPDATE users 
         SET name = $1, phone = $2, city = $3, company_name = $4, updated_at = CURRENT_TIMESTAMP
         WHERE id = $5
         RETURNING id, email, name, phone, role, city, company_name, created_at`,
        [name, phone, city, company_name, userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Пользователь не найден' });
      }

      res.json({ 
        success: true, 
        message: 'Профиль успешно обновлен',
        user: result.rows[0] 
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ error: 'Ошибка при обновлении профиля' });
    }
  });

  // Получить статистику пользователя
  router.get('/profile/:userId/stats', async (req, res) => {
    const { userId } = req.params;

    try {
      // Получить количество заказов и общую сумму
      const ordersStats = await pool.query(
        `SELECT 
          COUNT(*) as total_orders,
          COUNT(*) FILTER (WHERE status IN ('pending', 'confirmed', 'in_transit')) as active_orders,
          COALESCE(SUM(total_amount), 0) as total_spent
         FROM orders 
         WHERE user_id = $1`,
        [userId]
      );

      // Получить количество предзаказов
      const preordersStats = await pool.query(
        `SELECT COUNT(*) as total_preorders
         FROM preorders 
         WHERE user_id = $1`,
        [userId]
      );

      res.json({ 
        success: true, 
        stats: {
          totalOrders: parseInt(ordersStats.rows[0].total_orders) || 0,
          activeOrders: parseInt(ordersStats.rows[0].active_orders) || 0,
          totalSpent: parseFloat(ordersStats.rows[0].total_spent) || 0,
          totalPreorders: parseInt(preordersStats.rows[0].total_preorders) || 0
        }
      });
    } catch (error) {
      console.error('Get profile stats error:', error);
      res.status(500).json({ error: 'Ошибка при получении статистики' });
    }
  });

  return router;
};

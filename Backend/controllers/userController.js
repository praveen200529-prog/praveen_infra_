// ─────────────────────────────────────────────────────────────
// User Controller — admin manages employees
// ─────────────────────────────────────────────────────────────

const bcrypt = require('bcrypt');
const pool   = require('../config/db');

async function listUsers(req, res) {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, email, role, is_active, created_at FROM users ORDER BY created_at DESC'
    );
    return res.json({ success: true, users: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

async function createUser(req, res) {
  const { name, email, password, role = 'employee' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
  }
  if (!['admin', 'employee'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Role must be admin or employee.' });
  }

  try {
    const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Email already in use.' });
    }

    const hash = await bcrypt.hash(password, 12);
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name, email.toLowerCase().trim(), hash, role]
    );

    await pool.execute(
      'INSERT INTO activity_log (user_id, user_name, action, entity_type, entity_id, entity_name) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, req.user.name, 'Created user', 'user', result.insertId, name]
    );

    return res.status(201).json({ success: true, message: 'User created.', userId: result.insertId });
  } catch (err) {
    console.error('❌ Create user error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

async function setUserActive(req, res) {
  const { id } = req.params;
  const { is_active } = req.body;

  try {
    await pool.execute('UPDATE users SET is_active = ? WHERE id = ?', [is_active ? 1 : 0, id]);

    await pool.execute(
      'INSERT INTO activity_log (user_id, user_name, action, entity_type, entity_id) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, req.user.name, is_active ? 'Reactivated user' : 'Deactivated user', 'user', id]
    );

    return res.json({ success: true, message: `User ${is_active ? 'reactivated' : 'deactivated'}.` });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

async function updatePassword(req, res) {
  const { id } = req.params;
  const { password } = req.body;

  // Users can only change their own password unless they're admin
  if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
    return res.status(403).json({ success: false, message: 'Forbidden.' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
  }

  try {
    const hash = await bcrypt.hash(password, 12);
    await pool.execute('UPDATE users SET password_hash = ? WHERE id = ?', [hash, id]);
    return res.json({ success: true, message: 'Password updated.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

module.exports = { listUsers, createUser, setUserActive, updatePassword };

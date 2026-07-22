// ─────────────────────────────────────────────────────────────
// Expense Controller
// ─────────────────────────────────────────────────────────────

const pool = require('../config/db');

async function listExpenses(req, res) {
  try {
    const [rows] = await pool.execute(
      `SELECT e.*, u.name AS created_by_name
       FROM expenses e
       LEFT JOIN users u ON e.created_by = u.id
       WHERE e.project_id = ?
       ORDER BY e.expense_date DESC, e.created_at DESC`,
      [req.params.projectId]
    );

    // Summary
    const [[summary]] = await pool.execute(
      `SELECT
         COALESCE(SUM(amount), 0) AS total_spent,
         COALESCE(SUM(CASE WHEN category='Materials'     THEN amount ELSE 0 END), 0) AS materials,
         COALESCE(SUM(CASE WHEN category='Labor'         THEN amount ELSE 0 END), 0) AS labor,
         COALESCE(SUM(CASE WHEN category='Equipment'     THEN amount ELSE 0 END), 0) AS equipment,
         COALESCE(SUM(CASE WHEN category='Permits'       THEN amount ELSE 0 END), 0) AS permits,
         COALESCE(SUM(CASE WHEN category='Subcontractor' THEN amount ELSE 0 END), 0) AS subcontractor,
         COALESCE(SUM(CASE WHEN category='Transport'     THEN amount ELSE 0 END), 0) AS transport,
         COALESCE(SUM(CASE WHEN category='Misc'          THEN amount ELSE 0 END), 0) AS misc
       FROM expenses WHERE project_id = ?`,
      [req.params.projectId]
    );

    return res.json({ success: true, expenses: rows, summary });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

async function createExpense(req, res) {
  const { category, amount, expense_date, vendor, notes } = req.body;
  const { projectId } = req.params;

  if (!amount || isNaN(amount)) {
    return res.status(400).json({ success: false, message: 'A valid amount is required.' });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO expenses (project_id, category, amount, expense_date, vendor, notes, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [projectId, category || 'Misc', amount, expense_date || null, vendor || null, notes || null, req.user.id]
    );

    const [[proj]] = await pool.execute('SELECT name FROM projects WHERE id = ?', [projectId]);
    await pool.execute(
      'INSERT INTO activity_log (user_id, user_name, action, entity_type, entity_id, entity_name) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, req.user.name, `Added ₹${amount} expense (${category || 'Misc'})`, 'project', projectId, proj?.name]
    );

    return res.status(201).json({ success: true, message: 'Expense added.', expenseId: result.insertId });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

async function updateExpense(req, res) {
  const { id } = req.params;
  const { category, amount, expense_date, vendor, notes } = req.body;

  try {
    await pool.execute(
      'UPDATE expenses SET category=?, amount=?, expense_date=?, vendor=?, notes=? WHERE id=?',
      [category, amount, expense_date || null, vendor || null, notes || null, id]
    );
    return res.json({ success: true, message: 'Expense updated.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

async function deleteExpense(req, res) {
  const { id } = req.params;
  try {
    await pool.execute('DELETE FROM expenses WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Expense deleted.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

module.exports = { listExpenses, createExpense, updateExpense, deleteExpense };

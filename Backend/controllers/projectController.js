// ─────────────────────────────────────────────────────────────
// Project Controller
// ─────────────────────────────────────────────────────────────

const pool = require('../config/db');

async function listProjects(req, res) {
  try {
    const { status } = req.query;
    let sql = `
      SELECT p.*, u.name AS creator_name,
             COALESCE(SUM(e.amount), 0) AS total_spent
      FROM projects p
      LEFT JOIN users u ON p.created_by = u.id
      LEFT JOIN expenses e ON e.project_id = p.id
    `;
    const params = [];
    if (status) { sql += ' WHERE p.status = ?'; params.push(status); }
    sql += ' GROUP BY p.id ORDER BY p.created_at DESC';

    const [rows] = await pool.execute(sql, params);
    return res.json({ success: true, projects: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

async function getProject(req, res) {
  try {
    const [rows] = await pool.execute(
      `SELECT p.*, u.name AS creator_name,
              COALESCE(SUM(e.amount), 0) AS total_spent
       FROM projects p
       LEFT JOIN users u ON p.created_by = u.id
       LEFT JOIN expenses e ON e.project_id = p.id
       WHERE p.id = ?
       GROUP BY p.id`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Project not found.' });
    return res.json({ success: true, project: rows[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

async function createProject(req, res) {
  const {
    name, client, location, contract_value, budget,
    start_date, end_date, status, description,
    project_manager, tags, progress_pct
  } = req.body;

  if (!name || !client) {
    return res.status(400).json({ success: false, message: 'Project name and client are required.' });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO projects
         (name, client, location, contract_value, budget, start_date, end_date,
          status, description, project_manager, tags, progress_pct, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, client, location || null,
        contract_value || 0, budget || 0,
        start_date || null, end_date || null,
        status || 'Planning', description || null,
        project_manager || null, tags || null,
        progress_pct || 0, req.user.id
      ]
    );

    await pool.execute(
      'INSERT INTO activity_log (user_id, user_name, action, entity_type, entity_id, entity_name) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, req.user.name, 'Created project', 'project', result.insertId, name]
    );

    return res.status(201).json({ success: true, message: 'Project created.', projectId: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

async function updateProject(req, res) {
  const { id } = req.params;
  const {
    name, client, location, contract_value, budget,
    start_date, end_date, status, description,
    project_manager, tags, progress_pct
  } = req.body;

  try {
    await pool.execute(
      `UPDATE projects SET
         name=?, client=?, location=?, contract_value=?, budget=?,
         start_date=?, end_date=?, status=?, description=?,
         project_manager=?, tags=?, progress_pct=?
       WHERE id=?`,
      [
        name, client, location || null,
        contract_value || 0, budget || 0,
        start_date || null, end_date || null,
        status, description || null,
        project_manager || null, tags || null,
        progress_pct || 0, id
      ]
    );

    await pool.execute(
      'INSERT INTO activity_log (user_id, user_name, action, entity_type, entity_id, entity_name) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, req.user.name, 'Updated project', 'project', id, name]
    );

    return res.json({ success: true, message: 'Project updated.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

async function archiveProject(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute('SELECT name FROM projects WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'Project not found.' });

    await pool.execute('UPDATE projects SET status = ? WHERE id = ?', ['Archived', id]);

    await pool.execute(
      'INSERT INTO activity_log (user_id, user_name, action, entity_type, entity_id, entity_name) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, req.user.name, 'Archived project', 'project', id, rows[0].name]
    );

    return res.json({ success: true, message: 'Project archived.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

async function getPortfolioStats(req, res) {
  try {
    const [[stats]] = await pool.execute(`
      SELECT
        COUNT(*) AS total_projects,
        SUM(CASE WHEN status='Active' THEN 1 ELSE 0 END) AS active_count,
        SUM(CASE WHEN status='Completed' THEN 1 ELSE 0 END) AS completed_count,
        SUM(CASE WHEN status='Planning' THEN 1 ELSE 0 END) AS planning_count,
        SUM(CASE WHEN status='On Hold' THEN 1 ELSE 0 END) AS onhold_count,
        SUM(contract_value) AS total_contract_value,
        SUM(budget) AS total_budget
      FROM projects WHERE status != 'Archived'
    `);

    const [[spendData]] = await pool.execute(`
      SELECT COALESCE(SUM(e.amount), 0) AS total_spent
      FROM expenses e
      JOIN projects p ON e.project_id = p.id
      WHERE p.status != 'Archived'
    `);

    const [enquiryCount] = await pool.execute('SELECT COUNT(*) AS cnt FROM enquiries');
    const [recentActivity] = await pool.execute(
      'SELECT * FROM activity_log ORDER BY created_at DESC LIMIT 10'
    );
    const [upcomingDeadlines] = await pool.execute(`
      SELECT id, name, client, end_date, status
      FROM projects
      WHERE end_date >= CURDATE() AND status IN ('Active','Planning')
      ORDER BY end_date ASC LIMIT 5
    `);

    return res.json({
      success: true,
      stats: { ...stats, total_spent: spendData.total_spent },
      open_enquiries: enquiryCount[0].cnt,
      recent_activity: recentActivity,
      upcoming_deadlines: upcomingDeadlines,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

module.exports = { listProjects, getProject, createProject, updateProject, archiveProject, getPortfolioStats };

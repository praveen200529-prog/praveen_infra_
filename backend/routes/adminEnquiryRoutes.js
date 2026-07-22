// ─────────────────────────────────────────────────────────────
// Admin Enquiry Routes — read-only CRM view
// ─────────────────────────────────────────────────────────────

const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/authMiddleware');
const pool = require('../config/db');

// GET /portal/api/enquiries?page=1&limit=20&search=
router.get('/', protect(), async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;
    const search = req.query.search ? `%${req.query.search}%` : null;

    let sql    = 'SELECT * FROM enquiries';
    let countSql = 'SELECT COUNT(*) AS total FROM enquiries';
    const params = [];
    const countParams = [];

    if (search) {
      sql      += ' WHERE full_name LIKE ? OR email LIKE ? OR project_type LIKE ?';
      countSql += ' WHERE full_name LIKE ? OR email LIKE ? OR project_type LIKE ?';
      params.push(search, search, search);
      countParams.push(search, search, search);
    }

    sql += ` ORDER BY submitted_at DESC LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;

    const [rows]  = await pool.execute(sql, params);
    const [[{total}]] = await pool.execute(countSql, countParams);

    return res.json({
      success: true,
      enquiries: rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;

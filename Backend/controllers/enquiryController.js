// ─────────────────────────────────────────────────────────────
// Enquiry Controller — handles form submission
// ─────────────────────────────────────────────────────────────

const { validationResult } = require('express-validator');
const pool = require('../config/db');

/**
 * POST /api/enquiries
 * Validates input, sanitizes data, and inserts into MySQL.
 */
async function submitEnquiry(req, res) {
  // ── Check validation results ────────────────────────────
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }

  try {
    const { fullName, company, email, phone, projectType, projectDetails } = req.body;

    // Get client IP address
    const ipAddress = req.ip || req.connection?.remoteAddress || null;

    // ── Parameterized INSERT (prevents SQL injection) ──────
    const sql = `
      INSERT INTO enquiries (full_name, company, email, phone, project_type, project_details, ip_address)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      fullName,
      company || null,
      email,
      phone || null,
      projectType,
      projectDetails,
      ipAddress,
    ];

    const [result] = await pool.execute(sql, values);

    console.log(`✅ New enquiry #${result.insertId} from ${fullName} (${email})`);

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! We will get back to you within 1 business day.',
      enquiryId: result.insertId,
    });
  } catch (err) {
    console.error('❌ Error saving enquiry:', err);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    });
  }
}

module.exports = { submitEnquiry };

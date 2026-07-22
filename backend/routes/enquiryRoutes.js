// ─────────────────────────────────────────────────────────────
// Enquiry Routes
// ─────────────────────────────────────────────────────────────

const express = require('express');
const router = express.Router();
const { enquiryValidationRules } = require('../middleware/validators');
const { submitEnquiry } = require('../controllers/enquiryController');

// POST /api/enquiries — submit a new enquiry
router.post('/', enquiryValidationRules, submitEnquiry);

module.exports = router;

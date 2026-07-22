// ─────────────────────────────────────────────────────────────
// Validation & Sanitization rules (express-validator)
// ─────────────────────────────────────────────────────────────

const { body } = require('express-validator');

// Allowed project types (must match the <select> options in the form)
const ALLOWED_PROJECT_TYPES = [
  'Road Construction',
  'Highway Development',
  'Bridge Construction',
  'Flyovers & Overpasses',
  'Civil Infrastructure',
  'EPC Project',
  'Other',
];

const enquiryValidationRules = [
  // Full Name — required, 2-100 characters
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters')
    .escape(),

  // Company — optional, max 150 characters
  body('company')
    .optional({ values: 'falsy' })
    .trim()
    .isLength({ max: 150 }).withMessage('Company name must not exceed 150 characters')
    .escape(),

  // Email — required, valid email
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),

  // Phone — optional, basic phone pattern
  body('phone')
    .optional({ values: 'falsy' })
    .trim()
    .matches(/^[+]?[\d\s\-()]{7,20}$/).withMessage('Please provide a valid phone number'),

  // Project Type — required, must be one of the allowed values
  body('projectType')
    .trim()
    .notEmpty().withMessage('Project type is required')
    .isIn(ALLOWED_PROJECT_TYPES).withMessage('Invalid project type selected'),

  // Project Details — required, 10-2000 characters
  body('projectDetails')
    .trim()
    .notEmpty().withMessage('Project details are required')
    .isLength({ min: 10, max: 2000 }).withMessage('Project details must be between 10 and 2000 characters')
    .escape(),
];

module.exports = { enquiryValidationRules, ALLOWED_PROJECT_TYPES };

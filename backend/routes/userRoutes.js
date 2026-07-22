// ─────────────────────────────────────────────────────────────
// User Routes (admin only)
// ─────────────────────────────────────────────────────────────

const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  listUsers, createUser, setUserActive, updatePassword
} = require('../controllers/userController');

router.get('/',    protect(['admin']), listUsers);
router.post('/',   protect(['admin']), createUser);
router.patch('/:id/status',   protect(['admin']), setUserActive);
router.patch('/:id/password', protect(),          updatePassword);

module.exports = router;

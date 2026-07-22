// ─────────────────────────────────────────────────────────────
// Project Routes
// ─────────────────────────────────────────────────────────────

const express = require('express');
const router  = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  listProjects, getProject, createProject,
  updateProject, archiveProject, getPortfolioStats
} = require('../controllers/projectController');

router.get('/stats',       protect(), getPortfolioStats);
router.get('/',            protect(), listProjects);
router.get('/:id',         protect(), getProject);
router.post('/',           protect(['admin']), createProject);
router.put('/:id',         protect(['admin']), updateProject);
router.patch('/:id/archive', protect(['admin']), archiveProject);

module.exports = router;

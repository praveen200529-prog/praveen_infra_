// ─────────────────────────────────────────────────────────────
// File Routes
// ─────────────────────────────────────────────────────────────

const express = require('express');
const router  = express.Router({ mergeParams: true });
const { protect } = require('../middleware/authMiddleware');
const {
  upload, listFiles, uploadFile,
  togglePublish, updateCaption, deleteFile
} = require('../controllers/fileController');

router.get('/',    protect(), listFiles);
router.post('/',   protect(), upload.single('file'), uploadFile);
router.patch('/:id/publish', protect(['admin']), togglePublish);
router.patch('/:id/caption', protect(), updateCaption);
router.delete('/:id', protect(['admin']), deleteFile);

module.exports = router;

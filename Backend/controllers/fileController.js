// ─────────────────────────────────────────────────────────────
// File Controller — handles photo/document uploads
// ─────────────────────────────────────────────────────────────

const path = require('path');
const fs   = require('fs');
const pool = require('../config/db');
const multer = require('multer');

// ── Multer storage config ────────────────────────────────────
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp|pdf|doc|docx|xls|xlsx|txt/;
    if (allowed.test(path.extname(file.originalname).toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type.'));
    }
  },
});

// ── Determine file type from mime ────────────────────────────
function detectFileType(mimetype) {
  return mimetype.startsWith('image/') ? 'photo' : 'document';
}

// ── Controllers ───────────────────────────────────────────────
async function listFiles(req, res) {
  try {
    const [rows] = await pool.execute(
      `SELECT f.*, u.name AS uploader_name
       FROM project_files f
       LEFT JOIN users u ON f.uploaded_by = u.id
       WHERE f.project_id = ?
       ORDER BY f.uploaded_at DESC`,
      [req.params.projectId]
    );
    return res.json({ success: true, files: rows });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

async function uploadFile(req, res) {
  if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded.' });

  const { caption } = req.body;
  const { projectId } = req.params;
  const fileType = detectFileType(req.file.mimetype);

  try {
    const [result] = await pool.execute(
      `INSERT INTO project_files
         (project_id, filename, original_name, file_type, mime_type, file_size, caption, uploaded_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        projectId, req.file.filename, req.file.originalname,
        fileType, req.file.mimetype, req.file.size,
        caption || null, req.user.id
      ]
    );

    await pool.execute(
      'INSERT INTO activity_log (user_id, user_name, action, entity_type, entity_id) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, req.user.name, `Uploaded ${fileType}: ${req.file.originalname}`, 'project', projectId]
    );

    return res.status(201).json({ success: true, message: 'File uploaded.', fileId: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

async function togglePublish(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute('SELECT is_published FROM project_files WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'File not found.' });
    const newVal = rows[0].is_published ? 0 : 1;
    await pool.execute('UPDATE project_files SET is_published = ? WHERE id = ?', [newVal, id]);
    return res.json({ success: true, is_published: newVal });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

async function updateCaption(req, res) {
  const { id } = req.params;
  const { caption } = req.body;
  try {
    await pool.execute('UPDATE project_files SET caption = ? WHERE id = ?', [caption || null, id]);
    return res.json({ success: true, message: 'Caption updated.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

async function deleteFile(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute('SELECT filename FROM project_files WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ success: false, message: 'File not found.' });

    // Delete physical file
    const filePath = path.join(UPLOAD_DIR, rows[0].filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await pool.execute('DELETE FROM project_files WHERE id = ?', [id]);
    return res.json({ success: true, message: 'File deleted.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}

module.exports = { upload, listFiles, uploadFile, togglePublish, updateCaption, deleteFile };

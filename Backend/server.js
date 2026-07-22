// ─────────────────────────────────────────────────────────────
// Praveen Infra — Backend Server Entry Point
// ─────────────────────────────────────────────────────────────

require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const path    = require('path');

const pool   = require('./config/db');

// ── Public routes ────────────────────────────────────────────
const enquiryRoutes = require('./routes/enquiryRoutes');

// ── Portal routes ─────────────────────────────────────────────
const authRoutes         = require('./routes/authRoutes');
const userRoutes         = require('./routes/userRoutes');
const projectRoutes      = require('./routes/projectRoutes');
const expenseRoutes      = require('./routes/expenseRoutes');
const fileRoutes         = require('./routes/fileRoutes');
const adminEnquiryRoutes = require('./routes/adminEnquiryRoutes');

const app  = express();
const PORT = process.env.SERVER_PORT || 3000;

// ── Middleware ───────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Serve uploaded files (private — accessed by authenticated portal only) ──
app.use('/portal/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Serve public frontend ─────────────────────────────────────
app.use(express.static(path.join(__dirname, '..', 'Frontend')));

// ── Public API routes ─────────────────────────────────────────
app.use('/api/enquiries', enquiryRoutes);

// ── Portal API routes ─────────────────────────────────────────
app.use('/portal/api/auth',         authRoutes);
app.use('/portal/api/users',        userRoutes);
app.use('/portal/api/projects',     projectRoutes);
app.use('/portal/api/projects/:projectId/expenses', expenseRoutes);
app.use('/portal/api/projects/:projectId/files',    fileRoutes);
app.use('/portal/api/enquiries',    adminEnquiryRoutes);

// ── Serve portal HTML pages ───────────────────────────────────
app.get('/portal', (_req, res) => {
  res.redirect('/portal/login');
});
app.get('/portal/login', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'portal', 'login.html'));
});
app.get('/portal/dashboard', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'portal', 'dashboard.html'));
});
app.get('/portal/projects', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'portal', 'projects.html'));
});
app.get('/portal/projects/:id', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'portal', 'project-detail.html'));
});
app.get('/portal/analytics', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'portal', 'analytics.html'));
});
app.get('/portal/users', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'portal', 'users.html'));
});
app.get('/portal/enquiries', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'portal', 'enquiries.html'));
});

// ── Public site root ──────────────────────────────────────────
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'index.html'));
});

// ── Health check ────────────────────────────────────────────
app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// ── 404 handler ─────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global error handler ────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: err.message || 'Internal server error' });
});

// ── Start server ────────────────────────────────────────────
async function start() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📋 Public site:   http://localhost:${PORT}/`);
      console.log(`🔐 Portal login:  http://localhost:${PORT}/portal/login`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to database:', err.message);
    process.exit(1);
  }
}

start();

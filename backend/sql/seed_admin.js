// =============================================================
// Seed Script — Creates the first Admin user
// Run: node Backend/sql/seed_admin.js
// =============================================================

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const bcrypt = require('bcrypt');
const pool   = require('../config/db');

const ADMIN = {
  name:     'Praveen Admin',
  email:    'admin@praveeninfra.com',
  password: 'Admin@1234',   // ← Change this after first login!
  role:     'admin',
};

async function seed() {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Connected to database');

    // Check if already exists
    const [existing] = await conn.execute('SELECT id FROM users WHERE email = ?', [ADMIN.email]);
    if (existing.length > 0) {
      console.log('⚠️  Admin user already exists — skipping seed.');
      conn.release();
      process.exit(0);
    }

    const hash = await bcrypt.hash(ADMIN.password, 12);
    const [result] = await conn.execute(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [ADMIN.name, ADMIN.email, hash, ADMIN.role]
    );

    console.log(`\n🎉 Admin user created!`);
    console.log(`   ID:       ${result.insertId}`);
    console.log(`   Name:     ${ADMIN.name}`);
    console.log(`   Email:    ${ADMIN.email}`);
    console.log(`   Password: ${ADMIN.password}  ← CHANGE THIS AFTER FIRST LOGIN`);
    console.log(`\n   Login at: http://localhost:3000/portal/login\n`);

    conn.release();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    console.error('   Make sure you ran portal.sql in phpMyAdmin first.');
    process.exit(1);
  }
}

seed();

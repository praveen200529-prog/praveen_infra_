-- =============================================================
-- Praveen Infra — Internal Portal Database Schema
-- Run this in phpMyAdmin AFTER running init.sql
-- =============================================================

USE praveen_infra;

-- ── Users (employees & admins) ────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(100)   NOT NULL,
  email         VARCHAR(255)   NOT NULL UNIQUE,
  password_hash VARCHAR(255)   NOT NULL,
  role          ENUM('admin','employee') NOT NULL DEFAULT 'employee',
  is_active     TINYINT(1)     NOT NULL DEFAULT 1,
  created_at    TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Projects ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  name             VARCHAR(200)   NOT NULL,
  client           VARCHAR(200)   NOT NULL,
  location         VARCHAR(200)   DEFAULT NULL,
  contract_value   DECIMAL(15,2)  DEFAULT 0.00,
  budget           DECIMAL(15,2)  DEFAULT 0.00,
  start_date       DATE           DEFAULT NULL,
  end_date         DATE           DEFAULT NULL,
  status           ENUM('Planning','Active','On Hold','Completed','Archived') NOT NULL DEFAULT 'Planning',
  description      TEXT           DEFAULT NULL,
  project_manager  VARCHAR(100)   DEFAULT NULL,
  tags             VARCHAR(500)   DEFAULT NULL,
  progress_pct     TINYINT        DEFAULT 0,
  created_by       INT            DEFAULT NULL,
  created_at       TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Expenses (per project) ────────────────────────────────────
CREATE TABLE IF NOT EXISTS expenses (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  project_id  INT            NOT NULL,
  category    ENUM('Materials','Labor','Equipment','Permits','Subcontractor','Transport','Misc') NOT NULL DEFAULT 'Misc',
  amount      DECIMAL(15,2)  NOT NULL,
  expense_date DATE          DEFAULT NULL,
  vendor      VARCHAR(200)   DEFAULT NULL,
  notes       TEXT           DEFAULT NULL,
  created_by  INT            DEFAULT NULL,
  created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Project Files (photos & documents) ────────────────────────
CREATE TABLE IF NOT EXISTS project_files (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  project_id    INT            NOT NULL,
  filename      VARCHAR(255)   NOT NULL,
  original_name VARCHAR(255)   NOT NULL,
  file_type     ENUM('photo','document') NOT NULL DEFAULT 'document',
  mime_type     VARCHAR(100)   DEFAULT NULL,
  file_size     INT            DEFAULT NULL,
  caption       VARCHAR(500)   DEFAULT NULL,
  is_published  TINYINT(1)     NOT NULL DEFAULT 0,
  uploaded_by   INT            DEFAULT NULL,
  uploaded_at   TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Activity Log ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activity_log (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT            DEFAULT NULL,
  user_name   VARCHAR(100)   DEFAULT NULL,
  action      VARCHAR(200)   NOT NULL,
  entity_type VARCHAR(50)    DEFAULT NULL,
  entity_id   INT            DEFAULT NULL,
  entity_name VARCHAR(200)   DEFAULT NULL,
  created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

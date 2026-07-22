-- =============================================================
-- Praveen Infra — Enquiry Form Database Initialization Script
-- Run this in phpMyAdmin or MySQL CLI before starting the server
-- =============================================================

CREATE DATABASE IF NOT EXISTS praveen_infra
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE praveen_infra;

CREATE TABLE IF NOT EXISTS enquiries (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  full_name       VARCHAR(100)   NOT NULL,
  company         VARCHAR(150)   DEFAULT NULL,
  email           VARCHAR(255)   NOT NULL,
  phone           VARCHAR(20)    DEFAULT NULL,
  project_type    VARCHAR(50)    NOT NULL,
  project_details TEXT           NOT NULL,
  ip_address      VARCHAR(45)    DEFAULT NULL,
  submitted_at    TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

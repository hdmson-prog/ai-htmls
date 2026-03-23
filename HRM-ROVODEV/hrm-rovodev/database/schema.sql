-- HRM System Database Schema
-- MySQL 5.7+ with InnoDB
-- Charset: utf8mb4

-- ============================================================================
-- USERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(50) NOT NULL UNIQUE,
  `email` varchar(100) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','staff') NOT NULL DEFAULT 'staff',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_username` (`username`),
  INDEX `idx_email` (`email`),
  INDEX `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- PASSWORD REMEMBER TOKENS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS `password_remember_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `token` varchar(64) NOT NULL UNIQUE,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX `idx_token` (`token`),
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_expires_at` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- DEPARTMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100) NOT NULL UNIQUE,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- STAFF TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS `staff` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100),
  `profile_picture` varchar(255),
  `date_of_birth` date,
  `living_address` text,
  `home_address` text,
  `cellphone` varchar(20),
  `gender` enum('Male','Female','Other') DEFAULT 'Other',
  `national_id` varchar(50),
  `department_id` int(11) NOT NULL,
  `onboarding_date` date,
  `remark` text,
  `status` enum('Active','Resigned') NOT NULL DEFAULT 'Active',
  `resign_date` date,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  INDEX `idx_first_name` (`first_name`),
  INDEX `idx_last_name` (`last_name`),
  INDEX `idx_department_id` (`department_id`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- CONTRACTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS `contracts` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `staff_id` int(11) NOT NULL,
  `signed_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('Active','Ended') NOT NULL DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX `idx_staff_id` (`staff_id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_signed_date` (`signed_date`),
  INDEX `idx_end_date` (`end_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SAMPLE DATA
-- ============================================================================

-- Insert default admin user
-- Username: admin
-- Email: admin@hrm.com
-- Password: Admin@1234 (bcrypt hash - use setup script to generate)
-- This placeholder hash will be replaced by setup.php
INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`) VALUES
(1, 'admin', 'admin@hrm.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Insert sample departments
INSERT INTO `departments` (`id`, `name`, `description`) VALUES
(1, 'Human Resources', 'Human Resources Management Department'),
(2, 'Information Technology', 'Software Development and IT Infrastructure'),
(3, 'Finance', 'Financial Planning and Accounting'),
(4, 'Operations', 'Business Operations and Process Management'),
(5, 'Marketing', 'Marketing and Brand Management');

-- Insert sample staff members
INSERT INTO `staff` (`id`, `first_name`, `last_name`, `email`, `date_of_birth`, `cellphone`, `gender`, `national_id`, `department_id`, `status`) VALUES
(1, 'John', 'Smith', 'john.smith@hrm.com', '1990-05-15', '+1-555-0101', 'Male', 'ID001', 2, 'Active'),
(2, 'Sarah', 'Johnson', 'sarah.johnson@hrm.com', '1992-08-22', '+1-555-0102', 'Female', 'ID002', 3, 'Active'),
(3, 'Michael', 'Brown', 'michael.brown@hrm.com', '1988-12-03', '+1-555-0103', 'Male', 'ID003', 1, 'Active'),
(4, 'Emily', 'Davis', 'emily.davis@hrm.com', '1995-02-14', '+1-555-0104', 'Female', 'ID004', 4, 'Active'),
(5, 'David', 'Wilson', 'david.wilson@hrm.com', '1991-07-09', '+1-555-0105', 'Male', 'ID005', 5, 'Active');

-- Insert sample contracts (3-year contracts from signing date)
INSERT INTO `contracts` (`staff_id`, `signed_date`, `end_date`, `status`) VALUES
(1, '2022-01-10', '2025-01-10', 'Active'),
(2, '2022-03-15', '2025-03-15', 'Active'),
(3, '2021-06-01', '2024-06-01', 'Ended'),
(4, '2023-01-20', '2026-01-20', 'Active'),
(5, '2022-09-12', '2025-09-12', 'Active');

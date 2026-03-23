<?php
define('APP_NAME', 'HRM System');
define('APP_URL', 'http://localhost/hrm');
define('UPLOAD_DIR', __DIR__ . '/../uploads/');
define('UPLOAD_URL', APP_URL . '/uploads/');
define('SESSION_NAME', 'hrm_session');
define('REMEMBER_COOKIE', 'hrm_remember');
define('REMEMBER_EXPIRE', 60 * 60 * 24 * 30); // 30 days

// Start session
if (session_status() === PHP_SESSION_NONE) {
    session_name(SESSION_NAME);
    session_start();
}

// Autoload helpers
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/../helpers/functions.php';
require_once __DIR__ . '/../helpers/auth.php';

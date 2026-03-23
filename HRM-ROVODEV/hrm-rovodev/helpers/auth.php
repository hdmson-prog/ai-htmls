<?php
/**
 * Check if user is logged in
 */
function is_logged_in(): bool {
    return isset($_SESSION['user_id']);
}

/**
 * Require authentication - redirect to login if not logged in
 */
function require_auth(): void {
    // Check remember me cookie
    if (!is_logged_in() && isset($_COOKIE[REMEMBER_COOKIE])) {
        $token = $_COOKIE[REMEMBER_COOKIE];
        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare(
            'SELECT u.id, u.username, u.role FROM password_remember_tokens t
             JOIN users u ON u.id = t.user_id
             WHERE t.token = ? AND t.expires_at > NOW()'
        );
        $stmt->execute([hash('sha256', $token)]);
        $user = $stmt->fetch();
        if ($user) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];
        }
    }
    if (!is_logged_in()) {
        redirect('auth/login');
    }
}

/**
 * Get current logged-in user info
 */
function current_user(): array {
    return [
        'id'       => $_SESSION['user_id'] ?? null,
        'username' => $_SESSION['username'] ?? '',
        'role'     => $_SESSION['role'] ?? 'staff',
    ];
}

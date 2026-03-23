<?php
/**
 * Sanitize output to prevent XSS
 */
function e(string $str): string {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

/**
 * Generate CSRF token and store in session
 */
function csrf_token(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF token from POST
 */
function verify_csrf(string $token = ''): bool {
    if (empty($token)) {
        $token = $_POST['csrf_token'] ?? '';
    }
    return !empty($token) && hash_equals($_SESSION['csrf_token'] ?? '', $token);
}

/**
 * Redirect helper
 * Accepts either a full URL (http://...) or a path relative to APP_URL
 */
function redirect(string $url): void {
    if (str_starts_with($url, 'http://') || str_starts_with($url, 'https://')) {
        header('Location: ' . $url);
    } else {
        header('Location: ' . APP_URL . '/' . ltrim($url, '/'));
    }
    exit;
}

/**
 * Flash message helper
 */
function set_flash(string $type, string $message): void {
    $_SESSION['flash'][$type] = $message;
}

function get_flash(): ?array {
    if (isset($_SESSION['flash']) && !empty($_SESSION['flash'])) {
        $flash = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $flash;
    }
    return null;
}

/**
 * Calculate age from date of birth
 */
function calculate_age(string $dob): int {
    $birthDate = new DateTime($dob);
    $today = new DateTime();
    return (int)$birthDate->diff($today)->y;
}

/**
 * Calculate contract end date (default: +3 years from signed date)
 */
function contract_end_date(string $signedDate, int $durationMonths = 36): string {
    $date = new DateTime($signedDate);
    $date->modify('+' . $durationMonths . ' months');
    return $date->format('Y-m-d');
}

/**
 * Format date for display
 */
function fmt_date(?string $date): string {
    if (!$date) return '-';
    return date('d M Y', strtotime($date));
}

/**
 * Paginate helper
 */
function paginate(int $total, int $currentPage, int $perPage): array {
    $totalPages = (int)ceil($total / $perPage);
    $offset = ($currentPage - 1) * $perPage;
    return [
        'total'       => $total,
        'per_page'    => $perPage,
        'current'     => $currentPage,
        'total_pages' => $totalPages,
        'offset'      => $offset,
    ];
}

/**
 * Validate uploaded image
 */
function validate_image(array $file): ?string {
    $allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $maxSize = 5 * 1024 * 1024; // 5MB
    if ($file['error'] !== UPLOAD_ERR_OK) return 'Image upload failed.';
    if (!in_array($file['type'], $allowed)) return 'Only JPG, PNG, GIF, WEBP images allowed.';
    if ($file['size'] > $maxSize) return 'Image must be under 5MB.';
    return null;
}

/**
 * Save uploaded image
 */
function save_image(array $file, string $prefix = 'staff'): string {
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = $prefix . '_' . uniqid() . '.' . strtolower($ext);
    $dest = UPLOAD_DIR . $filename;
    move_uploaded_file($file['tmp_name'], $dest);
    return $filename;
}

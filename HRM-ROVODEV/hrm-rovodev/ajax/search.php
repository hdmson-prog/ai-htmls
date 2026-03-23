<?php
/**
 * AJAX Search Endpoint - Search for staff members
 */

require_once dirname(__DIR__) . '/config/app.php';

// Set JSON response header
header('Content-Type: application/json');

// Check if user is authenticated
if (!require_auth()) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Get search query from GET parameter
$query = isset($_GET['q']) ? trim($_GET['q']) : '';

// Return empty array if query is empty
if (empty($query)) {
    echo json_encode([]);
    exit;
}

// Load Staff model
require_once BASE_PATH . '/models/Staff.php';

try {
    $staffModel = new Staff();
    
    // Search for staff with limit of 10 results
    $results = $staffModel->search($query, 10);
    
    // Format results with required fields
    $formatted_results = [];
    foreach ($results as $staff) {
        $formatted_results[] = [
            'id' => $staff['id'] ?? null,
            'name' => $staff['name'] ?? '',
            'department' => $staff['department'] ?? '',
            'cellphone' => $staff['cellphone'] ?? '',
            'status' => $staff['status'] ?? 'Active',
            'image' => $staff['image'] ?? null
        ];
    }
    
    echo json_encode($formatted_results);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Search failed']);
}
?>

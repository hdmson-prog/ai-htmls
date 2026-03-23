<?php
/**
 * HRM Application - Front Controller / Entry Point
 */

// Define base path
define('BASE_PATH', __DIR__);

// Load application config
require BASE_PATH . '/config/app.php';

// Load all models
require_once BASE_PATH . '/models/User.php';
require_once BASE_PATH . '/models/Staff.php';
require_once BASE_PATH . '/models/Department.php';
require_once BASE_PATH . '/models/Contract.php';

// Get the URL from $_GET['url'] (set by .htaccess)
$url = isset($_GET['url']) ? trim($_GET['url'], '/') : '';

// Parse the URL into segments
$segments = array_filter(explode('/', $url));
$segments = array_values($segments); // Re-index array

// Default module and action
$module = $segments[0] ?? 'dashboard';
$action = $segments[1] ?? 'index';
$id = $segments[2] ?? null;

// Handle routing
try {
    // DASHBOARD routes
    if (empty($url) || $module === 'dashboard') {
        require_controller('DashboardController');
        $controller = new DashboardController();
        $controller->index();
    }
    
    // AUTH routes (including /login, /register, /logout shortcuts)
    elseif ($module === 'auth' || $module === 'login' || $module === 'register' || $module === 'logout') {
        require_controller('AuthController');
        $controller = new AuthController();
        
        // Handle shortcut routes
        if ($module === 'login') {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $controller->processLogin();
            } else {
                $controller->showLogin();
            }
        } elseif ($module === 'register') {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $controller->processRegister();
            } else {
                $controller->showRegister();
            }
        } elseif ($module === 'logout') {
            $controller->logout();
        } elseif ($action === 'login') {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $controller->processLogin();
            } else {
                $controller->showLogin();
            }
        } elseif ($action === 'register') {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $controller->processRegister();
            } else {
                $controller->showRegister();
            }
        } elseif ($action === 'logout') {
            $controller->logout();
        } else {
            throw new Exception('Auth action not found');
        }
    }
    
    // DEPARTMENTS routes
    elseif ($module === 'departments') {
        require_controller('DepartmentController');
        $controller = new DepartmentController();
        
        if ($action === 'index' || $action === 'departments') {
            $controller->index();
        } elseif ($action === 'create') {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $controller->store();
            } else {
                $controller->create();
            }
        } elseif ($action === 'edit' && $id) {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $controller->update($id);
            } else {
                $controller->edit($id);
            }
        } elseif ($action === 'delete' && $id) {
            $controller->delete($id);
        } else {
            throw new Exception('Department action not found');
        }
    }
    
    // STAFF routes
    elseif ($module === 'staff') {
        require_controller('StaffController');
        $controller = new StaffController();
        
        if ($action === 'index' || $action === 'staff') {
            $controller->index();
        } elseif ($action === 'create') {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $controller->store();
            } else {
                $controller->create();
            }
        } elseif ($action === 'show' && $id) {
            $controller->show($id);
        } elseif ($action === 'edit' && $id) {
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $controller->update($id);
            } else {
                $controller->edit($id);
            }
        } elseif ($action === 'resign' && $id) {
            $controller->resign($id);
        } elseif ($action === 'delete' && $id) {
            $controller->delete($id);
        } else {
            throw new Exception('Staff action not found');
        }
    }
    
    // RESIGNED routes
    elseif ($module === 'resigned') {
        require_controller('ResignedController');
        $controller = new ResignedController();
        
        if ($action === 'index' || $action === 'resigned') {
            $controller->index();
        } elseif ($action === 'reonboard' && $id) {
            $controller->reOnboard($id);
        } else {
            throw new Exception('Resigned action not found');
        }
    }
    
    // AJAX routes
    elseif ($module === 'ajax') {
        if ($action === 'search') {
            require BASE_PATH . '/ajax/search.php';
        } else {
            throw new Exception('AJAX action not found');
        }
    }
    
    // 404 - Route not found
    else {
        http_response_code(404);
        require BASE_PATH . '/views/errors/404.php';
    }
    
} catch (Exception $e) {
    // Handle errors gracefully
    http_response_code(500);
    echo "Error: " . htmlspecialchars($e->getMessage());
}

/**
 * Helper function to require a controller file
 */
function require_controller($controller_name) {
    $file = BASE_PATH . '/controllers/' . $controller_name . '.php';
    if (file_exists($file)) {
        require_once $file;
    } else {
        throw new Exception("Controller not found: $controller_name");
    }
}
?>

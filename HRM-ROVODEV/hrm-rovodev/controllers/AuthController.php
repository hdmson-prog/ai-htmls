<?php

class AuthController
{
    protected $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    /**
     * Show login form
     */
    public function showLogin()
    {
        if (is_logged_in()) {
            redirect(APP_URL . '/dashboard');
        }
        require BASE_PATH . '/views/auth/login.php';
    }

    /**
     * Process login
     */
    public function processLogin()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            redirect(APP_URL . '/login');
        }

        // Verify CSRF token
        if (!verify_csrf($_POST['csrf_token'] ?? '')) {
            set_flash('error', 'Invalid request. Please try again.');
            redirect(APP_URL . '/login');
        }

        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        $remember = isset($_POST['remember_me']);

        // Validate input
        if (empty($email) || empty($password)) {
            set_flash('error', 'Please provide both email and password.');
            redirect(APP_URL . '/login');
        }

        // Find user by email
        $user = $this->userModel->findByEmail($email);

        if (!$user || !$this->userModel->verifyPassword($password, $user['password'])) {
            set_flash('error', 'Invalid email or password.');
            redirect(APP_URL . '/login');
        }

        // Set session
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['role'] = $user['role'] ?? 'staff';

        // Handle remember me
        if ($remember) {
            $token = bin2hex(random_bytes(32));
            $token_hash = hash('sha256', $token);
            $expires = date('Y-m-d H:i:s', strtotime('+30 days'));

            if ($this->userModel->storeRememberToken($user['id'], $token_hash, $expires)) {
                setcookie(
                    'remember_token',
                    $token,
                    strtotime('+30 days'),
                    '/',
                    '',
                    true,  // secure (HTTPS only)
                    true   // httponly
                );
            }
        }

        set_flash('success', 'Login successful. Welcome back!');
        redirect(APP_URL . '/dashboard');
    }

    /**
     * Show registration form
     */
    public function showRegister()
    {
        if (is_logged_in()) {
            redirect(APP_URL . '/dashboard');
        }
        require BASE_PATH . '/views/auth/register.php';
    }

    /**
     * Process registration
     */
    public function processRegister()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            redirect(APP_URL . '/register');
        }

        // Verify CSRF token
        if (!verify_csrf($_POST['csrf_token'] ?? '')) {
            set_flash('error', 'Invalid request. Please try again.');
            redirect(APP_URL . '/register');
        }

        $username = trim($_POST['username'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        $password_confirm = $_POST['password_confirm'] ?? '';

        // Validate input
        if (empty($username) || empty($email) || empty($password) || empty($password_confirm)) {
            set_flash('error', 'All fields are required.');
            redirect(APP_URL . '/register');
        }

        if (strlen($password) < 6) {
            set_flash('error', 'Password must be at least 6 characters.');
            redirect(APP_URL . '/register');
        }

        if ($password !== $password_confirm) {
            set_flash('error', 'Passwords do not match.');
            redirect(APP_URL . '/register');
        }

        // Check if email already exists
        if ($this->userModel->findByEmail($email)) {
            set_flash('error', 'Email already registered.');
            redirect(APP_URL . '/register');
        }

        // Check if username already exists
        if ($this->userModel->findByUsername($username)) {
            set_flash('error', 'Username already taken.');
            redirect(APP_URL . '/register');
        }

        // Create user
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        $data = [
            'username' => $username,
            'email' => $email,
            'password' => $hashed_password
        ];

        if ($this->userModel->create($data)) {
            set_flash('success', 'Registration successful. Please log in.');
            redirect(APP_URL . '/login');
        } else {
            set_flash('error', 'Registration failed. Please try again.');
            redirect(APP_URL . '/register');
        }
    }

    /**
     * Process logout
     */
    public function logout()
    {
        // Delete remember token if exists
        if (isset($_COOKIE['remember_token'])) {
            $token_hash = hash('sha256', $_COOKIE['remember_token']);
            $this->userModel->deleteRememberToken($token_hash);
            setcookie('remember_token', '', time() - 3600, '/', '', true, true);
        }

        // Destroy session
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params['path'], $params['domain'],
                $params['secure'], $params['httponly']
            );
        }
        session_destroy();

        redirect(APP_URL . '/auth/login');
    }
}

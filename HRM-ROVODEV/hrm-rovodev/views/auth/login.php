<?php
ob_start();
?>

<div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="card shadow-lg" style="width: 100%; max-width: 400px;">
        <div class="card-body p-5">
            <h2 class="card-title text-center mb-4 text-primary">
                <i class="fas fa-lock me-2"></i>Login
            </h2>

            <?php if (isset($error)): ?>
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <?php echo e($error); ?>
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            <?php endif; ?>

            <form method="POST" action="<?php echo APP_URL; ?>/auth/login">
                <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">

                <div class="mb-3">
                    <label for="email" class="form-label">Email or Username</label>
                    <input type="text" class="form-control" id="email" name="email" required autofocus>
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" required>
                </div>

                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="remember_me" name="remember_me">
                    <label class="form-check-label" for="remember_me">
                        Remember me
                    </label>
                </div>

                <button type="submit" class="btn btn-primary w-100 mb-3">
                    <i class="fas fa-sign-in-alt me-2"></i>Login
                </button>
            </form>

            <hr>

            <p class="text-center text-muted mb-0">
                Don't have an account? <a href="<?php echo APP_URL; ?>/register" class="text-decoration-none">Register here</a>
            </p>
        </div>
    </div>
</div>

<?php
$content = ob_get_clean();
$page_title = 'Login';
include __DIR__ . '/../layouts/auth.php';
?>

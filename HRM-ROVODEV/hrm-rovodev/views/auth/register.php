<?php
ob_start();
?>

<div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="card shadow-lg" style="width: 100%; max-width: 450px;">
        <div class="card-body p-5">
            <h2 class="card-title text-center mb-4 text-primary">
                <i class="fas fa-user-plus me-2"></i>Register
            </h2>

            <?php if (isset($errors) && count($errors) > 0): ?>
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <ul class="mb-0">
                        <?php foreach ($errors as $error): ?>
                            <li><?php echo e($error); ?></li>
                        <?php endforeach; ?>
                    </ul>
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            <?php endif; ?>

            <form method="POST" action="<?php echo APP_URL; ?>/auth/register">
                <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">

                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" name="username" required value="<?php echo e($_POST['username'] ?? ''); ?>">
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" name="email" required value="<?php echo e($_POST['email'] ?? ''); ?>">
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" required>
                </div>

                <div class="mb-3">
                    <label for="password_confirm" class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" id="password_confirm" name="password_confirm" required>
                </div>

                <button type="submit" class="btn btn-primary w-100 mb-3">
                    <i class="fas fa-user-check me-2"></i>Register
                </button>
            </form>

            <hr>

            <p class="text-center text-muted mb-0">
                Already have an account? <a href="<?php echo APP_URL; ?>/auth/login" class="text-decoration-none">Login here</a>
            </p>
        </div>
    </div>
</div>

<?php
$content = ob_get_clean();
$page_title = 'Register';
include __DIR__ . '/../layouts/auth.php';
?>

<?php
ob_start();
?>

<div class="mb-4">
    <a href="<?php echo APP_URL; ?>/departments" class="btn btn-outline-secondary">
        <i class="fas fa-arrow-left me-2"></i>Back to Departments
    </a>
</div>

<div class="card border-0 shadow-sm" style="max-width: 600px;">
    <div class="card-header bg-light border-bottom">
        <h5 class="mb-0">Create New Department</h5>
    </div>
    <div class="card-body p-4">
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

        <form method="POST" action="<?php echo APP_URL; ?>/departments">
            <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">

            <div class="mb-3">
                <label for="name" class="form-label">Department Name *</label>
                <input type="text" class="form-control" id="name" name="name" required value="<?php echo e($_POST['name'] ?? ''); ?>">
                <small class="text-muted">e.g. Human Resources, Finance, IT</small>
            </div>

            <div class="mb-4">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" name="description" rows="4"><?php echo e($_POST['description'] ?? ''); ?></textarea>
                <small class="text-muted">Brief description of the department's role and responsibilities</small>
            </div>

            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save me-2"></i>Create Department
                </button>
                <a href="<?php echo APP_URL; ?>/departments" class="btn btn-outline-secondary">Cancel</a>
            </div>
        </form>
    </div>
</div>

<?php
$content = ob_get_clean();
$page_title = 'Create Department';
$active_page = 'departments';
include __DIR__ . '/../layouts/main.php';
?>

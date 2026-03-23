<?php
ob_start();
?>

<div class="mb-4">
    <a href="<?php echo APP_URL; ?>/staff" class="btn btn-outline-secondary">
        <i class="fas fa-arrow-left me-2"></i>Back to Staff
    </a>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-header bg-light border-bottom">
        <h5 class="mb-0">Create New Staff Member</h5>
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

        <form method="POST" action="<?php echo APP_URL; ?>/staff/create" enctype="multipart/form-data">
            <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">

            <div class="row">
                <!-- Photo Upload -->
                <div class="col-md-3 mb-4">
                    <label class="form-label">Profile Photo</label>
                    <div class="text-center">
                        <div id="photoPreview" class="rounded-circle bg-light d-flex align-items-center justify-content-center mb-3" style="width: 150px; height: 150px; margin: 0 auto; border: 2px dashed #ccc;">
                            <i class="fas fa-camera text-muted" style="font-size: 2rem;"></i>
                        </div>
                        <input type="file" class="form-control" id="profile_picture" name="profile_picture" accept="image/*">
                        <small class="text-muted">JPG, PNG (max 5MB)</small>
                    </div>
                </div>

                <!-- Basic Info -->
                <div class="col-md-9">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="first_name" class="form-label">First Name *</label>
                            <input type="text" class="form-control" id="first_name" name="first_name" required value="<?php echo e($_POST['first_name'] ?? ''); ?>">
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="last_name" class="form-label">Last Name *</label>
                            <input type="text" class="form-control" id="last_name" name="last_name" required value="<?php echo e($_POST['last_name'] ?? ''); ?>">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="email" class="form-label">Email *</label>
                            <input type="email" class="form-control" id="email" name="email" required value="<?php echo e($_POST['email'] ?? ''); ?>">
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="date_of_birth" class="form-label">Date of Birth *</label>
                            <input type="date" class="form-control" id="date_of_birth" name="date_of_birth" required value="<?php echo e($_POST['date_of_birth'] ?? ''); ?>">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="gender" class="form-label">Gender *</label>
                            <select class="form-select" id="gender" name="gender" required>
                                <option value="">-- Select Gender --</option>
                                <option value="Male" <?php echo ($_POST['gender'] ?? '') === 'Male' ? 'selected' : ''; ?>>Male</option>
                                <option value="Female" <?php echo ($_POST['gender'] ?? '') === 'Female' ? 'selected' : ''; ?>>Female</option>
                                <option value="Other" <?php echo ($_POST['gender'] ?? '') === 'Other' ? 'selected' : ''; ?>>Other</option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="cellphone" class="form-label">Cellphone *</label>
                            <input type="tel" class="form-control" id="cellphone" name="cellphone" required value="<?php echo e($_POST['cellphone'] ?? ''); ?>">
                        </div>
                    </div>
                </div>
            </div>

            <hr>

            <!-- Address and National ID -->
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="national_id" class="form-label">National ID</label>
                    <input type="text" class="form-control" id="national_id" name="national_id" value="<?php echo e($_POST['national_id'] ?? ''); ?>">
                </div>
            </div>

            <hr>

            <!-- Employment Info -->
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="department_id" class="form-label">Department *</label>
                    <select class="form-select" id="department_id" name="department_id" required>
                        <option value="">-- Select Department --</option>
                        <?php if (isset($departments)): ?>
                            <?php foreach ($departments as $dept): ?>
                                <option value="<?php echo e($dept['id']); ?>" <?php echo ($_POST['department_id'] ?? '') == $dept['id'] ? 'selected' : ''; ?>>
                                    <?php echo e($dept['name']); ?>
                                </option>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </select>
                </div>

                <div class="col-md-6 mb-3">
                    <label for="position" class="form-label">Position *</label>
                    <input type="text" class="form-control" id="position" name="position" required value="<?php echo e($_POST['position'] ?? ''); ?>">
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="salary" class="form-label">Salary *</label>
                    <input type="number" class="form-control" id="salary" name="salary" step="0.01" required value="<?php echo e($_POST['salary'] ?? ''); ?>">
                </div>

                <div class="col-md-6 mb-3">
                    <label for="contract_start" class="form-label">Contract Start Date *</label>
                    <input type="date" class="form-control" id="contract_start" name="contract_start" required value="<?php echo e($_POST['contract_start'] ?? ''); ?>">
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="contract_duration" class="form-label">Contract Duration (Months) *</label>
                    <input type="number" class="form-control" id="contract_duration" name="contract_duration" min="1" required value="<?php echo e($_POST['contract_duration'] ?? '12'); ?>">
                </div>
            </div>

            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save me-2"></i>Create Staff Member
                </button>
                <a href="<?php echo APP_URL; ?>/staff" class="btn btn-outline-secondary">Cancel</a>
            </div>
        </form>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Photo Preview
    const imageInput = document.getElementById('profile_picture');
    const photoPreview = document.getElementById('photoPreview');

    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                photoPreview.innerHTML = '<img src="' + event.target.result + '" class="rounded-circle" style="width: 150px; height: 150px; object-fit: cover;">';
            };
            reader.readAsDataURL(file);
        }
    });
});
</script>

<?php
$content = ob_get_clean();
$page_title = 'Create Staff Member';
$active_page = 'staff';
include __DIR__ . '/../layouts/main.php';
?>

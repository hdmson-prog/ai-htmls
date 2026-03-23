<?php
ob_start();
?>

<div class="mb-4">
    <a href="<?php echo APP_URL; ?>/staff/<?php echo e($staff['id']); ?>" class="btn btn-outline-secondary">
        <i class="fas fa-arrow-left me-2"></i>Back to Staff Profile
    </a>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-header bg-light border-bottom">
        <h5 class="mb-0">Edit Staff Member</h5>
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

        <form method="POST" action="<?php echo APP_URL; ?>/staff/<?php echo e($staff['id']); ?>" enctype="multipart/form-data">
            <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">
            <input type="hidden" name="_method" value="PUT">

            <div class="row">
                <!-- Photo Upload -->
                <div class="col-md-3 mb-4">
                    <label class="form-label">Profile Photo</label>
                    <div class="text-center">
                        <div id="photoPreview" class="rounded-circle bg-light d-flex align-items-center justify-content-center mb-3 mx-auto" style="width: 150px; height: 150px; border: 2px dashed #ccc; overflow: hidden;">
                            <?php if (!empty($staff['image'])): ?>
                                <img src="<?php echo UPLOAD_URL; ?>/staff/<?php echo e($staff['image']); ?>" alt="<?php echo e($staff['name']); ?>" style="width: 150px; height: 150px; object-fit: cover;">
                            <?php else: ?>
                                <i class="fas fa-camera text-muted" style="font-size: 2rem;"></i>
                            <?php endif; ?>
                        </div>
                        <input type="file" class="form-control" id="image" name="image" accept="image/*">
                        <small class="text-muted">JPG, PNG (max 2MB)</small>
                    </div>
                </div>

                <!-- Basic Info -->
                <div class="col-md-9">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="name" class="form-label">Full Name *</label>
                            <input type="text" class="form-control" id="name" name="name" required value="<?php echo e($staff['name'] ?? ''); ?>">
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="dob" class="form-label">Date of Birth *</label>
                            <input type="date" class="form-control" id="dob" name="dob" required value="<?php echo e($staff['dob'] ?? ''); ?>">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="age" class="form-label">Age</label>
                        <input type="number" class="form-control" id="age" name="age" readonly value="<?php echo calculate_age($staff['dob'] ?? ''); ?>">
                        <small class="text-muted">Calculated automatically</small>
                    </div>

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="gender" class="form-label">Gender *</label>
                            <select class="form-select" id="gender" name="gender" required>
                                <option value="">-- Select Gender --</option>
                                <option value="male" <?php echo strtolower($staff['gender'] ?? '') === 'male' ? 'selected' : ''; ?>>Male</option>
                                <option value="female" <?php echo strtolower($staff['gender'] ?? '') === 'female' ? 'selected' : ''; ?>>Female</option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="cellphone" class="form-label">Cellphone *</label>
                            <input type="tel" class="form-control" id="cellphone" name="cellphone" required value="<?php echo e($staff['cellphone'] ?? ''); ?>">
                        </div>
                    </div>
                </div>
            </div>

            <hr>

            <!-- Address Info -->
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="living_address" class="form-label">Living Address</label>
                    <textarea class="form-control" id="living_address" name="living_address" rows="2"><?php echo e($staff['living_address'] ?? ''); ?></textarea>
                </div>

                <div class="col-md-6 mb-3">
                    <label for="home_address" class="form-label">Home Address</label>
                    <textarea class="form-control" id="home_address" name="home_address" rows="2"><?php echo e($staff['home_address'] ?? ''); ?></textarea>
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
                                <option value="<?php echo e($dept['id']); ?>" <?php echo ($staff['department_id'] ?? '') == $dept['id'] ? 'selected' : ''; ?>>
                                    <?php echo e($dept['name']); ?>
                                </option>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </select>
                </div>

                <div class="col-md-6 mb-3">
                    <label for="onboarding_date" class="form-label">Onboarding Date *</label>
                    <input type="date" class="form-control" id="onboarding_date" name="onboarding_date" required value="<?php echo e($staff['onboarding_date'] ?? ''); ?>">
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="contract_signed_date" class="form-label">Contract Signed Date *</label>
                    <input type="date" class="form-control" id="contract_signed_date" name="contract_signed_date" required value="<?php echo e($staff['contract_signed_date'] ?? ''); ?>">
                    <small class="text-muted">Contract will auto-expire +3 years</small>
                </div>

                <div class="col-md-6 mb-3">
                    <label for="contract_end_date" class="form-label">Contract End Date</label>
                    <input type="date" class="form-control" id="contract_end_date" name="contract_end_date" readonly value="<?php echo e($staff['contract_end_date'] ?? ''); ?>">
                    <small class="text-muted">Calculated automatically</small>
                </div>
            </div>

            <div class="mb-4">
                <label for="remark" class="form-label">Remarks</label>
                <textarea class="form-control" id="remark" name="remark" rows="3"><?php echo e($staff['remark'] ?? ''); ?></textarea>
            </div>

            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save me-2"></i>Update Staff Member
                </button>
                <a href="<?php echo APP_URL; ?>/staff/<?php echo e($staff['id']); ?>" class="btn btn-outline-secondary">Cancel</a>
            </div>
        </form>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Photo Preview
    const imageInput = document.getElementById('image');
    const photoPreview = document.getElementById('photoPreview');

    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                photoPreview.innerHTML = '<img src="' + event.target.result + '" style="width: 150px; height: 150px; object-fit: cover;">';
            };
            reader.readAsDataURL(file);
        }
    });

    // Age Auto-Calculation
    const dobInput = document.getElementById('dob');
    const ageInput = document.getElementById('age');

    function calculateAge() {
        if (dobInput.value) {
            const birthDate = new Date(dobInput.value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            ageInput.value = age;
        }
    }

    dobInput.addEventListener('change', calculateAge);

    // Contract End Date Auto-Calculation (3 years from signed date)
    const contractSignedInput = document.getElementById('contract_signed_date');
    const contractEndInput = document.getElementById('contract_end_date');

    function calculateContractEndDate() {
        if (contractSignedInput.value) {
            const signedDate = new Date(contractSignedInput.value);
            const endDate = new Date(signedDate);
            endDate.setFullYear(endDate.getFullYear() + 3);
            
            const year = endDate.getFullYear();
            const month = String(endDate.getMonth() + 1).padStart(2, '0');
            const day = String(endDate.getDate()).padStart(2, '0');
            
            contractEndInput.value = year + '-' + month + '-' + day;
        }
    }

    contractSignedInput.addEventListener('change', calculateContractEndDate);
});
</script>

<?php
$content = ob_get_clean();
$page_title = 'Edit Staff Member';
$active_page = 'staff';
include __DIR__ . '/../layouts/main.php';
?>

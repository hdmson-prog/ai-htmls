<?php
ob_start();
?>

<div class="mb-4">
    <a href="<?php echo APP_URL; ?>/staff" class="btn btn-outline-secondary">
        <i class="fas fa-arrow-left me-2"></i>Back to Staff
    </a>
</div>

<?php if (isset($success)): ?>
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <?php echo e($success); ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<div class="row">
    <!-- Profile Card -->
    <div class="col-md-4">
        <div class="card border-0 shadow-sm">
            <div class="card-body text-center">
                <?php if (!empty($staff['image'])): ?>
                    <img src="<?php echo UPLOAD_URL; ?>/staff/<?php echo e($staff['image']); ?>" alt="<?php echo e($staff['name']); ?>" class="rounded-circle mb-3" style="width: 150px; height: 150px; object-fit: cover;">
                <?php else: ?>
                    <div class="rounded-circle bg-secondary d-flex align-items-center justify-content-center mb-3 mx-auto" style="width: 150px; height: 150px;">
                        <i class="fas fa-user text-white" style="font-size: 3rem;"></i>
                    </div>
                <?php endif; ?>

                <h5 class="card-title"><?php echo e($staff['name'] ?? ''); ?></h5>
                <p class="text-muted"><?php echo e($staff['department_name'] ?? '-'); ?></p>

                <div class="mb-3">
                    <?php 
                        $status = $staff['status'] ?? 'Active';
                        $badgeClass = $status === 'Active' ? 'bg-success' : 'bg-warning';
                    ?>
                    <span class="badge <?php echo $badgeClass; ?> p-2">
                        <?php echo $status; ?>
                    </span>
                </div>

                <hr>

                <div class="text-start">
                    <p class="mb-2">
                        <strong>Gender:</strong> 
                        <?php if (strtolower($staff['gender'] ?? '') === 'male'): ?>
                            <i class="fas fa-mars text-primary"></i> Male
                        <?php elseif (strtolower($staff['gender'] ?? '') === 'female'): ?>
                            <i class="fas fa-venus text-danger"></i> Female
                        <?php else: ?>
                            <?php echo e($staff['gender']); ?>
                        <?php endif; ?>
                    </p>
                    <p class="mb-2"><strong>Age:</strong> <?php echo calculate_age($staff['dob'] ?? ''); ?></p>
                    <p class="mb-2"><strong>DOB:</strong> <?php echo fmt_date($staff['dob'] ?? ''); ?></p>
                    <p class="mb-2"><strong>Cellphone:</strong> <?php echo e($staff['cellphone'] ?? '-'); ?></p>
                </div>

                <hr>

                <div class="d-flex gap-2">
                    <a href="<?php echo APP_URL; ?>/staff/<?php echo e($staff['id']); ?>/edit" class="btn btn-warning flex-grow-1">
                        <i class="fas fa-edit me-2"></i>Edit
                    </a>
                    <button class="btn btn-danger flex-grow-1" data-bs-toggle="modal" data-bs-target="#resignModal">
                        <i class="fas fa-sign-out-alt me-2"></i>Resign
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Details Card -->
    <div class="col-md-8">
        <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-light border-bottom">
                <h6 class="mb-0">Personal Information</h6>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <p class="text-muted mb-1">Living Address</p>
                        <p><?php echo e($staff['living_address'] ?? '-'); ?></p>
                    </div>
                    <div class="col-md-6">
                        <p class="text-muted mb-1">Home Address</p>
                        <p><?php echo e($staff['home_address'] ?? '-'); ?></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-light border-bottom">
                <h6 class="mb-0">Employment Information</h6>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <p class="text-muted mb-1">Onboarding Date</p>
                        <p><strong><?php echo fmt_date($staff['onboarding_date'] ?? ''); ?></strong></p>
                    </div>
                    <div class="col-md-6">
                        <p class="text-muted mb-1">Department</p>
                        <p><strong><?php echo e($staff['department_name'] ?? '-'); ?></strong></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="card border-0 shadow-sm">
            <div class="card-header bg-light border-bottom">
                <h6 class="mb-0">Additional Notes</h6>
            </div>
            <div class="card-body">
                <p><?php echo e($staff['remark'] ?? '-'); ?></p>
            </div>
        </div>
    </div>
</div>

<!-- Contract History -->
<div class="row mt-4">
    <div class="col-md-12">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-light border-bottom">
                <h6 class="mb-0">Contract History</h6>
            </div>
            <div class="card-body">
                <?php if (isset($contracts) && count($contracts) > 0): ?>
                    <div class="table-responsive">
                        <table class="table table-hover mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th>Contract #</th>
                                    <th>Signed Date</th>
                                    <th>End Date</th>
                                    <th>Duration</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($contracts as $contract): ?>
                                    <tr>
                                        <td>#<?php echo e($contract['id'] ?? ''); ?></td>
                                        <td><?php echo fmt_date($contract['signed_date'] ?? ''); ?></td>
                                        <td><?php echo fmt_date($contract['end_date'] ?? ''); ?></td>
                                        <td><?php echo e($contract['duration'] ?? '3 years'); ?></td>
                                        <td>
                                            <?php 
                                                $contractStatus = strtolower($contract['status'] ?? 'active');
                                                $contractBadgeClass = $contractStatus === 'active' ? 'bg-success' : 'bg-secondary';
                                            ?>
                                            <span class="badge <?php echo $contractBadgeClass; ?>">
                                                <?php echo ucfirst($contractStatus); ?>
                                            </span>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php else: ?>
                    <p class="text-muted text-center mb-0">No contract history found</p>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<!-- Resign Confirmation Modal -->
<div class="modal fade" id="resignModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title">Resign Staff Member</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to resign <strong><?php echo e($staff['name']); ?></strong>?</p>
                <p class="text-muted small">This will mark the staff as resigned and move them to the Resigned section.</p>
                
                <div class="mb-3">
                    <label for="resign_date" class="form-label">Resignation Date *</label>
                    <input type="date" class="form-control" id="resign_date" required>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <form method="POST" action="<?php echo APP_URL; ?>/staff/<?php echo e($staff['id']); ?>/resign" style="display: inline;">
                    <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">
                    <input type="hidden" id="resignDateInput" name="resign_date">
                    <button type="submit" class="btn btn-danger" onclick="document.getElementById('resignDateInput').value = document.getElementById('resign_date').value;">
                        Resign Staff
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php
$content = ob_get_clean();
$page_title = 'Staff Profile';
$active_page = 'staff';
include __DIR__ . '/../layouts/main.php';
?>

<?php
ob_start();
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h3>Resigned Staff</h3>
</div>

<?php if (isset($success)): ?>
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <?php echo e($success); ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<div class="card border-0 shadow-sm">
    <div class="card-body">
        <?php if (isset($resignedList) && count($resignedList) > 0): ?>
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Department</th>
                            <th>Cellphone</th>
                            <th>Resign Date</th>
                            <th>Last Contract End</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($resignedList as $staff): ?>
                            <tr>
                                <td>
                                    <?php if (!empty($staff['image'])): ?>
                                        <img src="<?php echo UPLOAD_URL; ?>/staff/<?php echo e($staff['image']); ?>" alt="<?php echo e($staff['name']); ?>" class="rounded-circle" style="width: 40px; height: 40px; object-fit: cover;">
                                    <?php else: ?>
                                        <div class="rounded-circle bg-secondary d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
                                            <i class="fas fa-user text-white"></i>
                                        </div>
                                    <?php endif; ?>
                                </td>
                                <td><strong><?php echo e($staff['name'] ?? ''); ?></strong></td>
                                <td>
                                    <?php if (strtolower($staff['gender'] ?? '') === 'male'): ?>
                                        <i class="fas fa-mars text-primary"></i> Male
                                    <?php elseif (strtolower($staff['gender'] ?? '') === 'female'): ?>
                                        <i class="fas fa-venus text-danger"></i> Female
                                    <?php else: ?>
                                        <?php echo e($staff['gender']); ?>
                                    <?php endif; ?>
                                </td>
                                <td><?php echo e($staff['department_name'] ?? '-'); ?></td>
                                <td><?php echo e($staff['cellphone'] ?? '-'); ?></td>
                                <td>
                                    <strong><?php echo fmt_date($staff['resign_date'] ?? ''); ?></strong>
                                </td>
                                <td><?php echo fmt_date($staff['contract_end_date'] ?? ''); ?></td>
                                <td>
                                    <a href="<?php echo APP_URL; ?>/staff/<?php echo e($staff['id']); ?>" class="btn btn-sm btn-info" title="View">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <button class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#reOnboardModal" data-staff-id="<?php echo e($staff['id']); ?>" data-staff-name="<?php echo e($staff['name']); ?>" title="Re-Onboard">
                                        <i class="fas fa-user-check"></i>
                                    </button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <?php if (isset($pagination) && $pagination['total_pages'] > 1): ?>
                <nav aria-label="Page navigation" class="mt-4">
                    <ul class="pagination justify-content-center">
                        <?php if ($pagination['current_page'] > 1): ?>
                            <li class="page-item">
                                <a class="page-link" href="<?php echo APP_URL; ?>/resigned?page=1">First</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="<?php echo APP_URL; ?>/resigned?page=<?php echo e($pagination['current_page'] - 1); ?>">Previous</a>
                            </li>
                        <?php endif; ?>

                        <?php for ($i = 1; $i <= $pagination['total_pages']; $i++): ?>
                            <li class="page-item <?php echo $i === $pagination['current_page'] ? 'active' : ''; ?>">
                                <a class="page-link" href="<?php echo APP_URL; ?>/resigned?page=<?php echo e($i); ?>">
                                    <?php echo e($i); ?>
                                </a>
                            </li>
                        <?php endfor; ?>

                        <?php if ($pagination['current_page'] < $pagination['total_pages']): ?>
                            <li class="page-item">
                                <a class="page-link" href="<?php echo APP_URL; ?>/resigned?page=<?php echo e($pagination['current_page'] + 1); ?>">Next</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="<?php echo APP_URL; ?>/resigned?page=<?php echo e($pagination['total_pages']); ?>">Last</a>
                            </li>
                        <?php endif; ?>
                    </ul>
                </nav>
            <?php endif; ?>
        <?php else: ?>
            <div class="text-center py-5">
                <i class="fas fa-user-slash" style="font-size: 3rem; opacity: 0.3;"></i>
                <p class="text-muted mt-3">No resigned staff found</p>
            </div>
        <?php endif; ?>
    </div>
</div>

<!-- Re-Onboard Confirmation Modal -->
<div class="modal fade" id="reOnboardModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-success text-white">
                <h5 class="modal-title">Re-Onboard Staff Member</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to re-onboard <strong id="staffName"></strong>?</p>
                <p class="text-muted small">This will mark the staff as active and move them back to the active Staff section.</p>
                
                <div class="mb-3">
                    <label for="new_onboarding_date" class="form-label">New Onboarding Date *</label>
                    <input type="date" class="form-control" id="new_onboarding_date" required>
                </div>

                <div class="mb-3">
                    <label for="new_contract_signed_date" class="form-label">New Contract Signed Date *</label>
                    <input type="date" class="form-control" id="new_contract_signed_date" required>
                    <small class="text-muted">Contract will auto-expire +3 years</small>
                </div>

                <div class="mb-3">
                    <label for="new_contract_end_date" class="form-label">New Contract End Date</label>
                    <input type="date" class="form-control" id="new_contract_end_date" readonly>
                    <small class="text-muted">Calculated automatically</small>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <form method="POST" style="display: inline;">
                    <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">
                    <input type="hidden" id="staffIdInput" name="staff_id">
                    <input type="hidden" id="onboardingDateInput" name="new_onboarding_date">
                    <input type="hidden" id="contractSignedDateInput" name="new_contract_signed_date">
                    <input type="hidden" id="contractEndDateInput" name="new_contract_end_date">
                    <button type="submit" class="btn btn-success" onclick="setFormValues();">
                        Re-Onboard Staff
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
document.getElementById('reOnboardModal').addEventListener('show.bs.modal', function(e) {
    const button = e.relatedTarget;
    const staffId = button.getAttribute('data-staff-id');
    const staffName = button.getAttribute('data-staff-name');
    
    document.getElementById('staffName').textContent = staffName;
    document.getElementById('staffIdInput').value = staffId;
    
    const form = document.querySelector('#reOnboardModal form');
    form.action = '<?php echo APP_URL; ?>/resigned/' + staffId + '/re-onboard';
});

// Contract End Date Auto-Calculation (3 years from signed date)
document.getElementById('new_contract_signed_date').addEventListener('change', function() {
    if (this.value) {
        const signedDate = new Date(this.value);
        const endDate = new Date(signedDate);
        endDate.setFullYear(endDate.getFullYear() + 3);
        
        const year = endDate.getFullYear();
        const month = String(endDate.getMonth() + 1).padStart(2, '0');
        const day = String(endDate.getDate()).padStart(2, '0');
        
        document.getElementById('new_contract_end_date').value = year + '-' + month + '-' + day;
    }
});

function setFormValues() {
    document.getElementById('onboardingDateInput').value = document.getElementById('new_onboarding_date').value;
    document.getElementById('contractSignedDateInput').value = document.getElementById('new_contract_signed_date').value;
    document.getElementById('contractEndDateInput').value = document.getElementById('new_contract_end_date').value;
}
</script>

<?php
$content = ob_get_clean();
$page_title = 'Resigned Staff';
$active_page = 'resigned';
include __DIR__ . '/../layouts/main.php';
?>

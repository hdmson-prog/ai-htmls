<?php
ob_start();
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h3>Staff</h3>
    <a href="<?php echo APP_URL; ?>/staff/create" class="btn btn-primary">
        <i class="fas fa-plus me-2"></i>Add Staff
    </a>
</div>

<?php if (isset($success)): ?>
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <?php echo e($success); ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<div class="card border-0 shadow-sm mb-4">
    <div class="card-body">
        <div class="row g-3">
            <div class="col-md-6">
                <input type="text" class="form-control" id="searchInput" placeholder="Search by name, email, or phone..." value="<?php echo e($search ?? ''); ?>">
            </div>
            <div class="col-md-4">
                <select class="form-select" id="deptFilter">
                    <option value="">All Departments</option>
                    <?php if (isset($departments)): ?>
                        <?php foreach ($departments as $dept): ?>
                            <option value="<?php echo e($dept['id']); ?>" <?php echo ($deptFilter ?? '') == $dept['id'] ? 'selected' : ''; ?>>
                                <?php echo e($dept['name']); ?>
                            </option>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </select>
            </div>
            <div class="col-md-2">
                <select class="form-select" id="sortSelect">
                    <option value="name_asc">Name (A-Z)</option>
                    <option value="name_desc">Name (Z-A)</option>
                    <option value="date_newest">Newest First</option>
                    <option value="date_oldest">Oldest First</option>
                </select>
            </div>
        </div>
    </div>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body">
        <?php if (isset($staffList) && count($staffList) > 0): ?>
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Department</th>
                            <th>Cellphone</th>
                            <th>Contract End</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($staffList as $staff): ?>
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
                                <td><?php echo fmt_date($staff['contract_end_date'] ?? ''); ?></td>
                                <td>
                                    <?php 
                                        $status = $staff['status'] ?? 'Active';
                                        $badgeClass = $status === 'Active' ? 'bg-success' : 'bg-warning';
                                    ?>
                                    <span class="badge <?php echo $badgeClass; ?>">
                                        <?php echo $status; ?>
                                    </span>
                                </td>
                                <td>
                                    <a href="<?php echo APP_URL; ?>/staff/<?php echo e($staff['id']); ?>" class="btn btn-sm btn-info" title="View">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <a href="<?php echo APP_URL; ?>/staff/<?php echo e($staff['id']); ?>/edit" class="btn btn-sm btn-warning" title="Edit">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <button class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-staff-id="<?php echo e($staff['id']); ?>" data-staff-name="<?php echo e($staff['name']); ?>" title="Delete">
                                        <i class="fas fa-trash"></i>
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
                                <a class="page-link" href="<?php echo APP_URL; ?>/staff?page=1">First</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="<?php echo APP_URL; ?>/staff?page=<?php echo e($pagination['current_page'] - 1); ?>">Previous</a>
                            </li>
                        <?php endif; ?>

                        <?php for ($i = 1; $i <= $pagination['total_pages']; $i++): ?>
                            <li class="page-item <?php echo $i === $pagination['current_page'] ? 'active' : ''; ?>">
                                <a class="page-link" href="<?php echo APP_URL; ?>/staff?page=<?php echo e($i); ?>">
                                    <?php echo e($i); ?>
                                </a>
                            </li>
                        <?php endfor; ?>

                        <?php if ($pagination['current_page'] < $pagination['total_pages']): ?>
                            <li class="page-item">
                                <a class="page-link" href="<?php echo APP_URL; ?>/staff?page=<?php echo e($pagination['current_page'] + 1); ?>">Next</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="<?php echo APP_URL; ?>/staff?page=<?php echo e($pagination['total_pages']); ?>">Last</a>
                            </li>
                        <?php endif; ?>
                    </ul>
                </nav>
            <?php endif; ?>
        <?php else: ?>
            <div class="text-center py-5">
                <i class="fas fa-users" style="font-size: 3rem; opacity: 0.3;"></i>
                <p class="text-muted mt-3">No staff found</p>
                <a href="<?php echo APP_URL; ?>/staff/create" class="btn btn-primary">
                    Add First Staff Member
                </a>
            </div>
        <?php endif; ?>
    </div>
</div>

<!-- Delete Confirmation Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title">Delete Staff Member</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete <strong id="staffName"></strong>?</p>
                <p class="text-muted small">This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <form method="POST" style="display: inline;">
                    <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">
                    <input type="hidden" name="_method" value="DELETE">
                    <input type="hidden" id="staffIdInput" name="staff_id">
                    <button type="submit" class="btn btn-danger">Delete Staff</button>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
document.getElementById('deleteModal').addEventListener('show.bs.modal', function(e) {
    const button = e.relatedTarget;
    const staffId = button.getAttribute('data-staff-id');
    const staffName = button.getAttribute('data-staff-name');
    
    document.getElementById('staffName').textContent = staffName;
    document.getElementById('staffIdInput').value = staffId;
    
    const form = document.querySelector('#deleteModal form');
    form.action = '<?php echo APP_URL; ?>/staff/' + staffId;
});

document.getElementById('searchInput').addEventListener('change', function() {
    updateStaffList();
});

document.getElementById('deptFilter').addEventListener('change', function() {
    updateStaffList();
});

document.getElementById('sortSelect').addEventListener('change', function() {
    updateStaffList();
});

function updateStaffList() {
    const search = document.getElementById('searchInput').value;
    const dept = document.getElementById('deptFilter').value;
    const sort = document.getElementById('sortSelect').value;
    
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (dept) params.append('dept', dept);
    if (sort) params.append('sort', sort);
    
    window.location.href = '<?php echo APP_URL; ?>/staff?' + params.toString();
}
</script>

<?php
$content = ob_get_clean();
$page_title = 'Staff';
$active_page = 'staff';
include __DIR__ . '/../layouts/main.php';
?>

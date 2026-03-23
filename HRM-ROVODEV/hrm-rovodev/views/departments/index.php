<?php
ob_start();
?>

<div class="d-flex justify-content-between align-items-center mb-4">
    <h3>Departments</h3>
    <a href="<?php echo APP_URL; ?>/departments/create" class="btn btn-primary">
        <i class="fas fa-plus me-2"></i>Add Department
    </a>
</div>

<?php if (isset($success)): ?>
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        <?php echo e($success); ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<?php if (isset($error)): ?>
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <?php echo e($error); ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<div class="card border-0 shadow-sm">
    <div class="card-body">
        <?php if (isset($departments) && count($departments) > 0): ?>
            <div class="table-responsive">
                <table class="table table-hover mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Staff Count</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($departments as $index => $dept): ?>
                            <tr>
                                <td><?php echo e($index + 1); ?></td>
                                <td><strong><?php echo e($dept['name'] ?? ''); ?></strong></td>
                                <td><?php echo e($dept['description'] ?? '-'); ?></td>
                                <td>
                                    <span class="badge bg-info">
                                        <?php echo e($dept['staff_count'] ?? 0); ?>
                                    </span>
                                </td>
                                <td><?php echo fmt_date($dept['created_at'] ?? ''); ?></td>
                                <td>
                                    <a href="<?php echo APP_URL; ?>/departments/<?php echo e($dept['id']); ?>/edit" class="btn btn-sm btn-warning">
                                        <i class="fas fa-edit"></i> Edit
                                    </a>
                                    <button class="btn btn-sm btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-dept-id="<?php echo e($dept['id']); ?>" data-dept-name="<?php echo e($dept['name']); ?>">
                                        <i class="fas fa-trash"></i> Delete
                                    </button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php else: ?>
            <div class="text-center py-5">
                <i class="fas fa-inbox" style="font-size: 3rem; opacity: 0.3;"></i>
                <p class="text-muted mt-3">No departments found</p>
                <a href="<?php echo APP_URL; ?>/departments/create" class="btn btn-primary">
                    Create First Department
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
                <h5 class="modal-title">Delete Department</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete the department <strong id="deptName"></strong>?</p>
                <p class="text-muted small">This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <form method="POST" style="display: inline;">
                    <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">
                    <input type="hidden" name="_method" value="DELETE">
                    <input type="hidden" id="deptIdInput" name="dept_id">
                    <button type="submit" class="btn btn-danger">Delete Department</button>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
document.getElementById('deleteModal').addEventListener('show.bs.modal', function(e) {
    const button = e.relatedTarget;
    const deptId = button.getAttribute('data-dept-id');
    const deptName = button.getAttribute('data-dept-name');
    
    document.getElementById('deptName').textContent = deptName;
    document.getElementById('deptIdInput').value = deptId;
    
    const form = document.querySelector('#deleteModal form');
    form.action = '<?php echo APP_URL; ?>/departments/' + deptId;
});
</script>

<?php
$content = ob_get_clean();
$page_title = 'Departments';
$active_page = 'departments';
include __DIR__ . '/../layouts/main.php';
?>

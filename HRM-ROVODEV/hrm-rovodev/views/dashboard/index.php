<?php
ob_start();
?>

<div class="row mb-4">
    <div class="col-md-12">
        <div class="input-group">
            <input type="text" class="form-control" id="globalSearch" placeholder="Search staff, departments..." style="max-width: 400px;">
            <button class="btn btn-outline-secondary" type="button">
                <i class="fas fa-search"></i>
            </button>
        </div>
        <div id="searchResults" class="dropdown-menu" style="position: absolute; width: 400px; max-height: 400px; overflow-y: auto; display: none;">
        </div>
    </div>
</div>

<!-- Stat Cards -->
<div class="row mb-4">
    <div class="col-md-3">
        <div class="card border-0 shadow-sm">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <p class="text-muted mb-1">Total Employees</p>
                        <h3 class="mb-0"><?php echo e($totalStaff ?? 0); ?></h3>
                    </div>
                    <i class="fas fa-users text-primary" style="font-size: 2.5rem; opacity: 0.1;"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card border-0 shadow-sm">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <p class="text-muted mb-1">Male Employees</p>
                        <h3 class="mb-0"><?php
                            $maleCount = 0;
                            foreach (($genderStats ?? []) as $g) { if ($g['gender'] === 'Male') $maleCount = $g['count']; }
                            echo e($maleCount);
                        ?></h3>
                    </div>
                    <i class="fas fa-mars text-primary" style="font-size: 2.5rem; opacity: 0.1;"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card border-0 shadow-sm">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <p class="text-muted mb-1">Female Employees</p>
                        <h3 class="mb-0"><?php
                            $femaleCount = 0;
                            foreach (($genderStats ?? []) as $g) { if ($g['gender'] === 'Female') $femaleCount = $g['count']; }
                            echo e($femaleCount);
                        ?></h3>
                    </div>
                    <i class="fas fa-venus text-primary" style="font-size: 2.5rem; opacity: 0.1;"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card border-0 shadow-sm">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <p class="text-muted mb-1">Contracts Ending Soon</p>
                        <h3 class="mb-0"><?php echo e(count($contractsEndingSoon ?? [])); ?></h3>
                    </div>
                    <i class="fas fa-calendar-times text-danger" style="font-size: 2.5rem; opacity: 0.1;"></i>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row mb-4">
    <!-- Gender Chart -->
    <div class="col-md-4">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-light border-bottom">
                <h6 class="mb-0">Gender Distribution</h6>
            </div>
            <div class="card-body">
                <canvas id="genderChart" height="200"></canvas>
            </div>
        </div>
    </div>

    <!-- Contracts Ending Soon -->
    <div class="col-md-8">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-light border-bottom">
                <h6 class="mb-0">Contracts Ending Soon</h6>
            </div>
            <div class="card-body">
                <?php if (count($contractsEndingSoon ?? []) > 0): ?>
                    <div class="table-responsive">
                        <table class="table table-sm mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th>Staff Name</th>
                                    <th>Department</th>
                                    <th>End Date</th>
                                    <th>Days Remaining</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($contractsEndingSoon as $contract): ?>
                                    <tr>
                                        <td><?php echo e(($contract['first_name'] ?? '') . ' ' . ($contract['last_name'] ?? '')); ?></td>
                                        <td><?php echo e($contract['department_name'] ?? ''); ?></td>
                                        <td><?php echo fmt_date($contract['end_date'] ?? ''); ?></td>
                                        <td>
                                            <?php $days = $contract['end_date'] ? max(0, (int)((strtotime($contract['end_date']) - time()) / 86400)) : 0; ?>
                                            <span class="badge <?php echo $days <= 30 ? 'bg-danger' : 'bg-warning'; ?>">
                                                <?php echo e($days); ?> days
                                            </span>
                                        </td>
                                        <td>
                                            <a href="<?php echo APP_URL; ?>/staff/show/<?php echo e($contract['staff_id'] ?? ''); ?>" class="btn btn-sm btn-info">
                                                <i class="fas fa-eye"></i>
                                            </a>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php else: ?>
                    <p class="text-muted text-center mb-0">No contracts ending soon</p>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<div class="row mb-4">
    <!-- Recently Signed Contracts -->
    <div class="col-md-6">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-light border-bottom">
                <h6 class="mb-0">Recently Signed Contracts</h6>
            </div>
            <div class="card-body">
                <?php if (count($recentlySigned ?? []) > 0): ?>
                    <div class="table-responsive">
                        <table class="table table-sm mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th>Staff Name</th>
                                    <th>Signed Date</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($recentlySigned as $contract): ?>
                                    <tr>
                                        <td><?php echo e(($contract['first_name'] ?? '') . ' ' . ($contract['last_name'] ?? '')); ?></td>
                                        <td><?php echo fmt_date($contract['signed_date'] ?? ''); ?></td>
                                        <td><?php echo fmt_date($contract['end_date'] ?? ''); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php else: ?>
                    <p class="text-muted text-center mb-0">No recent contracts</p>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <!-- Departments Overview -->
    <div class="col-md-6">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-light border-bottom">
                <h6 class="mb-0">Departments Overview</h6>
            </div>
            <div class="card-body">
                <?php if (count($departments ?? []) > 0): ?>
                    <div class="table-responsive">
                        <table class="table table-sm mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th>Department Name</th>
                                    <th>Staff Count</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($departments as $dept): ?>
                                    <tr>
                                        <td><?php echo e($dept['name'] ?? ''); ?></td>
                                        <td>
                                            <span class="badge bg-secondary">
                                                <?php echo e($dept['staff_count'] ?? 0); ?>
                                            </span>
                                        </td>
                                        <td>
                                            <a href="<?php echo APP_URL; ?>/departments/edit/<?php echo e($dept['id'] ?? ''); ?>" class="btn btn-sm btn-warning">
                                                <i class="fas fa-edit"></i>
                                            </a>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php else: ?>
                    <p class="text-muted text-center mb-0">No departments found</p>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Gender Chart
    <?php
        $maleCount = 0; $femaleCount = 0;
        foreach (($genderStats ?? []) as $g) {
            if ($g['gender'] === 'Male') $maleCount = (int)$g['count'];
            if ($g['gender'] === 'Female') $femaleCount = (int)$g['count'];
        }
    ?>
    const ctx = document.getElementById('genderChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Male', 'Female'],
            datasets: [{
                data: [<?php echo $maleCount; ?>, <?php echo $femaleCount; ?>],
                backgroundColor: ['#0d6efd', '#d946a6'],
                borderColor: ['#fff', '#fff'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Global Search
    const searchInput = document.getElementById('globalSearch');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.trim();
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        fetch('<?php echo APP_URL; ?>/ajax/search?q=' + encodeURIComponent(query))
            .then(response => response.json())
            .then(data => {
                searchResults.innerHTML = '';
                if (data.results && data.results.length > 0) {
                    data.results.forEach(item => {
                        const div = document.createElement('a');
                        div.href = item.url;
                        div.className = 'dropdown-item';
                        div.textContent = item.name + ' (' + item.type + ')';
                        searchResults.appendChild(div);
                    });
                    searchResults.style.display = 'block';
                } else {
                    searchResults.innerHTML = '<span class="dropdown-item disabled">No results found</span>';
                    searchResults.style.display = 'block';
                }
            });
    });

    document.addEventListener('click', function(e) {
        if (e.target !== searchInput && e.target !== searchResults) {
            searchResults.style.display = 'none';
        }
    });
});
</script>

<?php
$content = ob_get_clean();
$page_title = 'Dashboard';
$active_page = 'dashboard';
include __DIR__ . '/../layouts/main.php';
?>

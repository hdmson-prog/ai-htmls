<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? e($page_title) . ' - HR Manager' : 'HR Manager'; ?></title>
    <link rel="stylesheet" href="<?php echo APP_URL; ?>/assets/css/style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
</head>
<body>
    <div class="app-container">
        <!-- Sidebar Navigation -->
        <aside class="sidebar">
            <div class="sidebar-brand">
                <h2>HR Manager</h2>
            </div>
            
            <nav class="sidebar-nav">
                <ul>
                    <li>
                        <a href="<?php echo APP_URL; ?>/dashboard" class="nav-link <?php echo isset($active_page) && $active_page === 'dashboard' ? 'active' : ''; ?>">
                            <span class="nav-icon">📊</span>
                            <span class="nav-text">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo APP_URL; ?>/departments" class="nav-link <?php echo isset($active_page) && $active_page === 'departments' ? 'active' : ''; ?>">
                            <span class="nav-icon">🏢</span>
                            <span class="nav-text">Departments</span>
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo APP_URL; ?>/staff" class="nav-link <?php echo isset($active_page) && $active_page === 'staff' ? 'active' : ''; ?>">
                            <span class="nav-icon">👥</span>
                            <span class="nav-text">Staff List</span>
                        </a>
                    </li>
                    <li>
                        <a href="<?php echo APP_URL; ?>/resigned" class="nav-link <?php echo isset($active_page) && $active_page === 'resigned' ? 'active' : ''; ?>">
                            <span class="nav-icon">📋</span>
                            <span class="nav-text">Resigned Staff</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div class="sidebar-footer">
                <p>&copy; 2024 HR Manager</p>
            </div>
        </aside>

        <!-- Main Content Area -->
        <div class="main-wrapper">
            <!-- Top Navigation Bar -->
            <header class="topbar">
                <div class="topbar-left">
                    <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle sidebar">
                        ☰
                    </button>
                    <div class="breadcrumb">
                        <?php if (isset($breadcrumb)): ?>
                            <?php foreach ($breadcrumb as $index => $item): ?>
                                <?php if ($index > 0): ?>
                                    <span class="breadcrumb-separator">/</span>
                                <?php endif; ?>
                                <span class="breadcrumb-item"><?php echo e($item); ?></span>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </div>
                </div>

                <div class="topbar-right">
                    <div class="search-bar">
                        <input type="text" id="globalSearch" class="search-input" placeholder="Search staff, departments..." data-ajax-url="<?php echo APP_URL; ?>/ajax/search">
                        <div id="searchResults" class="search-results-dropdown" style="display: none;"></div>
                    </div>

                    <div class="user-menu">
                        <div class="user-info">
                            <span class="user-name"><?php echo e(current_user()['username'] ?? 'User'); ?></span>
                            <img src="<?php echo !empty(current_user()['avatar']) ? e(current_user()['avatar']) : APP_URL . '/assets/images/default-avatar.png'; ?>" 
                                 alt="User Avatar" class="user-avatar">
                        </div>
                        <form method="POST" action="<?php echo APP_URL; ?>/auth/logout" style="display: inline;">
                            <button type="submit" class="logout-btn">Logout</button>
                        </form>
                    </div>
                </div>
            </header>

            <!-- Flash Messages -->
            <div class="flash-messages-container">
                <?php
                $flash = get_flash();
                if ($flash):
                    foreach ($flash as $type => $message):
                        if (!empty($message)):
                ?>
                    <div class="alert alert-<?php echo e($type); ?>" role="alert">
                        <div class="alert-content">
                            <span class="alert-icon">
                                <?php 
                                    if ($type === 'success') echo '✓';
                                    elseif ($type === 'error') echo '✕';
                                    elseif ($type === 'warning') echo '⚠';
                                    else echo 'ℹ';
                                ?>
                            </span>
                            <span class="alert-message"><?php echo e($message); ?></span>
                        </div>
                        <button class="alert-close" onclick="this.parentElement.style.display='none';">×</button>
                    </div>
                <?php
                        endif;
                    endforeach;
                endif;
                ?>
            </div>

            <!-- Page Content -->
            <main class="content-area">
                <?php echo $content; ?>
            </main>

            <!-- Footer -->
            <footer class="app-footer">
                <p>HR Manager &copy; 2024. All rights reserved.</p>
            </footer>
        </div>
    </div>

    <!-- Confirm Delete Modal -->
    <div id="confirmDeleteModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Confirm Delete</h3>
                <button class="modal-close" onclick="closeModal('confirmDeleteModal')">&times;</button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete this record? This action cannot be undone.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal('confirmDeleteModal')">Cancel</button>
                <button class="btn btn-danger" id="confirmDeleteBtn">Delete</button>
            </div>
        </div>
    </div>

    <script src="<?php echo APP_URL; ?>/assets/js/app.js"></script>
</body>
</html>

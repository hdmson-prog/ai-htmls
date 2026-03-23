<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? e($page_title) . ' - HR Manager' : 'HR Manager'; ?></title>
    <link rel="stylesheet" href="<?php echo APP_URL; ?>/assets/css/style.css">
</head>
<body class="auth-body">
    <div class="auth-container">
        <div class="auth-card">
            <div class="auth-header">
                <h1>HR Manager</h1>
                <p class="auth-subtitle">Human Resource Management System</p>
            </div>

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

            <!-- Auth Content -->
            <div class="auth-content">
                <?php echo $content; ?>
            </div>

            <div class="auth-footer">
                <p>&copy; 2024 HR Manager. All rights reserved.</p>
            </div>
        </div>
    </div>

    <script src="<?php echo APP_URL; ?>/assets/js/app.js"></script>
</body>
</html>

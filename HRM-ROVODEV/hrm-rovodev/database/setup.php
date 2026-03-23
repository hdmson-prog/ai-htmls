<?php
/**
 * HRM System Database Setup Script
 * 
 * This script should be run once during initial setup to:
 * 1. Create the database
 * 2. Run the schema to create all tables
 * 3. Create the admin user with a secure bcrypt password
 * 
 * Usage: php setup.php
 */

// Database connection details
$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbUser = getenv('DB_USER') ?: 'root';
$dbPass = getenv('DB_PASS') ?: '';
$dbName = 'hrm_system';

echo "========================================\n";
echo "HRM System - Database Setup\n";
echo "========================================\n\n";

try {
    // Step 1: Connect to MySQL without selecting a database
    echo "[1/4] Connecting to MySQL...\n";
    $pdo = new PDO(
        "mysql:host=$dbHost",
        $dbUser,
        $dbPass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
    echo "✓ Connected successfully\n\n";

    // Step 2: Create database if not exists
    echo "[2/4] Creating database '{$dbName}' if not exists...\n";
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✓ Database ready\n\n";

    // Step 3: Select database and run schema
    echo "[3/4] Running schema.sql...\n";
    $pdo->exec("USE `{$dbName}`");
    
    $schemaFile = __DIR__ . '/schema.sql';
    if (!file_exists($schemaFile)) {
        throw new Exception("Schema file not found: {$schemaFile}");
    }
    
    $sql = file_get_contents($schemaFile);
    
    // Execute schema statements
    $statements = explode(';', $sql);
    foreach ($statements as $statement) {
        $statement = trim($statement);
        if (!empty($statement)) {
            $pdo->exec($statement);
        }
    }
    echo "✓ Schema tables created\n\n";

    // Step 4: Create admin user with secure password
    echo "[4/4] Setting up admin user...\n";
    
    $adminPassword = 'Admin@1234';
    $adminHash = password_hash($adminPassword, PASSWORD_BCRYPT, ['cost' => 10]);
    
    // Check if admin user already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute(['admin']);
    
    if ($stmt->fetch()) {
        echo "⚠ Admin user already exists, updating password...\n";
        $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE username = ?");
        $stmt->execute([$adminHash, 'admin']);
    } else {
        // Note: The INSERT statement in schema.sql will create the initial record
        // We just need to update it with the proper hash
        $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE username = ?");
        $stmt->execute([$adminHash, 'admin']);
    }
    
    echo "✓ Admin user configured\n";
    echo "  Username: admin\n";
    echo "  Password: {$adminPassword}\n";
    echo "  Hash: {$adminHash}\n\n";

    echo "========================================\n";
    echo "✓ Setup completed successfully!\n";
    echo "========================================\n\n";
    echo "Next steps:\n";
    echo "1. Configure your web server to serve the hrm/ directory\n";
    echo "2. Update config/database.php with your database credentials\n";
    echo "3. Access the application at http://localhost/hrm\n";
    echo "4. Login with username 'admin' and password '{$adminPassword}'\n";
    echo "5. Change the admin password immediately after first login\n";

} catch (PDOException $e) {
    echo "✗ Database Error: " . $e->getMessage() . "\n";
    exit(1);
} catch (Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
    exit(1);
}
?>

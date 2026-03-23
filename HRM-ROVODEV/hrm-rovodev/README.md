# HRM - Human Resource Management System

A modern, lightweight PHP-based Human Resource Management (HRM) web application designed for managing employee data, departments, and staff lifecycle operations.

## Features

- **Authentication**: Secure login and registration system
- **Dashboard**: Central hub for quick access and overview
- **Staff Management**: Create, view, edit, and manage employee records
- **Department Management**: Organize staff by departments
- **Staff Resignation**: Track and manage employee resignations
- **Staff ReOnboarding**: Manage rehiring of previously resigned employees
- **Search Functionality**: AJAX-powered search for quick staff lookup
- **Responsive Design**: Clean, professional interface

## Requirements

- **PHP**: 7.4 or higher
- **MySQL**: 5.7 or higher
- **Apache**: With `mod_rewrite` enabled for clean URL routing
- **Composer**: (Optional) For dependency management

## Installation

### Step 1: Clone/Copy Project
```bash
# Copy the hrm folder to your web server's document root
cp -r hrm /var/www/html/
# or for Windows XAMPP
copy hrm C:\xampp\htdocs\
```

### Step 2: Database Setup
```bash
# Import the database schema
mysql -u root -p < hrm/database/schema.sql

# Or using phpMyAdmin:
# 1. Create a new database named 'hrm'
# 2. Import hrm/database/schema.sql
```

### Step 3: Configure Database Connection
Edit `hrm/config/database.php` and update the following variables:
```php
define('DB_HOST', 'localhost');     // Your database host
define('DB_USER', 'root');          // Your database username
define('DB_PASSWORD', '');          // Your database password
define('DB_NAME', 'hrm');           // Your database name
```

### Step 4: Configure Application URL
Edit `hrm/config/app.php` and set:
```php
define('APP_URL', 'http://localhost/hrm');  // Update with your domain
```

### Step 5: Set Permissions
Ensure the uploads directory is writable:
```bash
chmod -R 755 hrm/uploads/
chmod -R 755 hrm/storage/  # if storage directory exists
```

### Step 6: Enable Apache mod_rewrite
```bash
# For Linux/Ubuntu
sudo a2enmod rewrite
sudo systemctl restart apache2

# For Windows (XAMPP), ensure in httpd.conf:
# LoadModule rewrite_module modules/mod_rewrite.so
```

## Default Login Credentials

After importing the database, use these credentials to log in:

- **Email**: admin@hrm.local
- **Password**: admin123

**Important**: Change these credentials after your first login for security purposes.

## URL Routing Pattern

The application uses clean URLs with the pattern:
```
/hrm/module/action/id
```

### Examples
- Dashboard: `/hrm/dashboard` or `/hrm/`
- Staff List: `/hrm/staff`
- View Staff: `/hrm/staff/show/5`
- Edit Staff: `/hrm/staff/edit/5`
- Departments: `/hrm/departments`
- Login: `/hrm/auth/login`
- Logout: `/hrm/auth/logout`
- Resigned Staff: `/hrm/resigned`

## Module Overview

### Authentication Module
Handles user login, registration, and logout.
- `GET /hrm/auth/login` - Show login form
- `POST /hrm/auth/login` - Process login
- `GET /hrm/auth/register` - Show registration form
- `POST /hrm/auth/register` - Process registration
- `GET /hrm/auth/logout` - Logout user

### Dashboard Module
Main dashboard displaying overview and quick access.
- `GET /hrm/dashboard` - Display dashboard

### Staff Module
Complete staff management (CRUD operations).
- `GET /hrm/staff` - List all active staff
- `GET /hrm/staff/create` - Show staff creation form
- `POST /hrm/staff/create` - Store new staff
- `GET /hrm/staff/show/{id}` - View staff details
- `GET /hrm/staff/edit/{id}` - Show staff edit form
- `POST /hrm/staff/edit/{id}` - Update staff
- `POST /hrm/staff/resign/{id}` - Mark staff as resigned
- `POST /hrm/staff/delete/{id}` - Delete staff record

### Department Module
Department management (CRUD operations).
- `GET /hrm/departments` - List all departments
- `GET /hrm/departments/create` - Show department form
- `POST /hrm/departments/create` - Store new department
- `GET /hrm/departments/edit/{id}` - Show department edit form
- `POST /hrm/departments/edit/{id}` - Update department
- `POST /hrm/departments/delete/{id}` - Delete department

### Resigned Module
Track and manage resigned employees.
- `GET /hrm/resigned` - List all resigned staff
- `POST /hrm/resigned/reonboard/{id}` - ReOnboard resigned staff

### AJAX Module
Asynchronous operations for enhanced UX.
- `GET /hrm/ajax/search?q=query` - Search staff (returns JSON)

## Folder Structure

```
hrm/
├── index.php                 # Front controller / entry point
├── .htaccess                 # Apache rewrite rules
├── README.md                 # This file
├── config/
│   ├── app.php              # Application configuration
│   └── database.php         # Database configuration
├── controllers/
│   ├── AuthController.php
│   ├── DashboardController.php
│   ├── StaffController.php
│   ├── DepartmentController.php
│   └── ResignedController.php
├── models/
│   ├── User.php
│   ├── Staff.php
│   ├── Department.php
│   └── Database.php
├── views/
│   ├── auth/
│   │   ├── login.php
│   │   └── register.php
│   ├── dashboard/
│   │   └── index.php
│   ├── staff/
│   │   ├── index.php
│   │   ├── create.php
│   │   ├── show.php
│   │   └── edit.php
│   ├── departments/
│   │   ├── index.php
│   │   ├── create.php
│   │   └── edit.php
│   ├── resigned/
│   │   └── index.php
│   ├── layouts/
│   │   ├── header.php
│   │   ├── sidebar.php
│   │   └── footer.php
│   └── errors/
│       └── 404.php
├── ajax/
│   └── search.php           # AJAX search endpoint
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
├── uploads/                 # User uploaded files (must be writable)
├── database/
│   └── schema.sql          # Database schema
└── storage/                # Application logs and cache (if used)
```

## Security Notes

1. **Always use HTTPS** in production
2. **Change default credentials** after initial setup
3. **Keep PHP and MySQL updated** with security patches
4. **Validate and sanitize** all user inputs
5. **Use prepared statements** to prevent SQL injection
6. **Store uploads** outside the web root if possible
7. **Set proper file permissions** on sensitive directories
8. **Enable error logging** but disable error display in production

## Troubleshooting

### Clean URLs Not Working
- Ensure `mod_rewrite` is enabled: `a2enmod rewrite`
- Check that `.htaccess` is in the correct location
- Verify `.htaccess` is allowed: `AllowOverride All` in Apache config

### Database Connection Issues
- Verify MySQL server is running
- Check database credentials in `config/database.php`
- Ensure database exists and schema is imported

### Upload Issues
- Check `uploads/` directory permissions (755 or 777)
- Ensure `post_max_size` and `upload_max_filesize` in php.ini are adequate
- Verify disk space availability

### Session Issues
- Ensure session handler is configured
- Check that `/tmp` (Linux) or temp folder (Windows) is writable
- Verify `session.save_path` in php.ini

## Support & Contribution

For issues, feature requests, or contributions, please refer to the project documentation or contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**License**: Proprietary

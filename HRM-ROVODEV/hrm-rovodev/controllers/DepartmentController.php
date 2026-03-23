<?php

class DepartmentController
{
    protected $departmentModel;

    public function __construct()
    {
        require_auth();
        $this->departmentModel = new Department();
    }

    /**
     * List all departments
     */
    public function index()
    {
        $departments = $this->departmentModel->getAllWithStaffCount();
        require BASE_PATH . '/views/departments/index.php';
    }

    /**
     * Show create department form
     */
    public function create()
    {
        $csrf_token = csrf_token();
        require BASE_PATH . '/views/departments/create.php';
    }

    /**
     * Store new department
     */
    public function store()
    {
        // Verify CSRF token
        if (!verify_csrf($_POST['csrf_token'] ?? '')) {
            set_flash('error', 'Invalid request. Please try again.');
            redirect(APP_URL . '/departments');
        }

        $name = trim($_POST['name'] ?? '');
        $description = trim($_POST['description'] ?? '');

        // Validate input
        if (empty($name)) {
            set_flash('error', 'Department name is required.');
            redirect(APP_URL . '/departments/create');
        }

        $data = [
            'name' => $name,
            'description' => $description
        ];

        if ($this->departmentModel->create($data)) {
            set_flash('success', 'Department created successfully.');
            redirect(APP_URL . '/departments');
        } else {
            set_flash('error', 'Failed to create department.');
            redirect(APP_URL . '/departments/create');
        }
    }

    /**
     * Show edit department form
     */
    public function edit($id)
    {
        $department = $this->departmentModel->getById($id);

        if (!$department) {
            set_flash('error', 'Department not found.');
            redirect(APP_URL . '/departments');
        }

        $csrf_token = csrf_token();
        require BASE_PATH . '/views/departments/edit.php';
    }

    /**
     * Update department
     */
    public function update($id)
    {
        // Verify CSRF token
        if (!verify_csrf($_POST['csrf_token'] ?? '')) {
            set_flash('error', 'Invalid request. Please try again.');
            redirect(APP_URL . '/departments');
        }

        $department = $this->departmentModel->getById($id);

        if (!$department) {
            set_flash('error', 'Department not found.');
            redirect(APP_URL . '/departments');
        }

        $name = trim($_POST['name'] ?? '');
        $description = trim($_POST['description'] ?? '');

        // Validate input
        if (empty($name)) {
            set_flash('error', 'Department name is required.');
            redirect(APP_URL . '/departments/edit/' . $id);
        }

        $data = [
            'name' => $name,
            'description' => $description
        ];

        if ($this->departmentModel->update($id, $data)) {
            set_flash('success', 'Department updated successfully.');
            redirect(APP_URL . '/departments');
        } else {
            set_flash('error', 'Failed to update department.');
            redirect(APP_URL . '/departments/edit/' . $id);
        }
    }

    /**
     * Delete department
     */
    public function delete($id)
    {
        // Verify CSRF token
        if (!verify_csrf($_POST['csrf_token'] ?? '')) {
            set_flash('error', 'Invalid request. Please try again.');
            redirect(APP_URL . '/departments');
        }

        $department = $this->departmentModel->getById($id);

        if (!$department) {
            set_flash('error', 'Department not found.');
            redirect(APP_URL . '/departments');
        }

        if (!$this->departmentModel->delete($id)) {
            set_flash('error', 'Cannot delete department with active staff. Please reassign staff first.');
            redirect(APP_URL . '/departments');
        }

        set_flash('success', 'Department deleted successfully.');
        redirect(APP_URL . '/departments');
    }
}

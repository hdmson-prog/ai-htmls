<?php

class StaffController
{
    protected $staffModel;
    protected $contractModel;
    protected $departmentModel;

    public function __construct()
    {
        require_auth();
        $this->staffModel = new Staff();
        $this->contractModel = new Contract();
        $this->departmentModel = new Department();
    }

    /**
     * List all active staff
     */
    public function index()
    {
        $page = $_GET['page'] ?? 1;
        $perPage = 10;

        $filters = [
            'search' => $_GET['search'] ?? '',
            'department' => $_GET['department'] ?? '',
            'sort' => $_GET['sort'] ?? 'created_at',
            'sort_dir' => $_GET['sort_dir'] ?? 'DESC'
        ];

        $staff = $this->staffModel->getAll($filters, $page, $perPage);
        $total = $this->staffModel->getTotalCount('Active');
        $departments = $this->departmentModel->getAll();
        $pagination = paginate($total, $page, $perPage);

        require BASE_PATH . '/views/staff/index.php';
    }

    /**
     * Show create staff form
     */
    public function create()
    {
        $csrf_token = csrf_token();
        $departments = $this->departmentModel->getAll();
        require BASE_PATH . '/views/staff/create.php';
    }

    /**
     * Store new staff
     */
    public function store()
    {
        // Verify CSRF token
        if (!verify_csrf($_POST['csrf_token'] ?? '')) {
            set_flash('error', 'Invalid request. Please try again.');
            redirect(APP_URL . '/staff/create');
        }

        $first_name = trim($_POST['first_name'] ?? '');
        $last_name = trim($_POST['last_name'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $cellphone = trim($_POST['cellphone'] ?? '');
        $date_of_birth = $_POST['date_of_birth'] ?? '';
        $gender = $_POST['gender'] ?? '';
        $national_id = trim($_POST['national_id'] ?? '');
        $department_id = $_POST['department_id'] ?? '';
        $contract_start = $_POST['contract_start'] ?? '';

        // Validate required fields
        if (empty($first_name) || empty($last_name) || empty($email) || empty($cellphone) || 
            empty($date_of_birth) || empty($gender) || empty($department_id) || 
            empty($contract_start)) {
            set_flash('error', 'All fields are required.');
            redirect(APP_URL . '/staff/create');
        }

        // Handle profile picture upload
        $profile_picture = null;
        if (!empty($_FILES['profile_picture']['name'])) {
            $imgError = validate_image($_FILES['profile_picture']);
            if ($imgError !== null) {
                set_flash('error', $imgError);
                redirect(APP_URL . '/staff/create');
            }
            $profile_picture = save_image($_FILES['profile_picture'], 'staff');
        }

        // Calculate contract end date
        $contract_end = contract_end_date($contract_start);

        // Create staff
        $staffData = [
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'cellphone' => $cellphone,
            'date_of_birth' => $date_of_birth,
            'gender' => $gender,
            'national_id' => $national_id,
            'department_id' => $department_id,
            'profile_picture' => $profile_picture
        ];

        if (!$this->staffModel->create($staffData)) {
            set_flash('error', 'Failed to create staff record.');
            redirect(APP_URL . '/staff/create');
        }

        // Get the created staff ID
        $stmt = Database::getInstance()->getConnection()->prepare(
            "SELECT id FROM staff WHERE email = ? ORDER BY created_at DESC LIMIT 1"
        );
        $stmt->execute([$email]);
        $createdStaff = $stmt->fetch(PDO::FETCH_ASSOC);
        $staff_id = $createdStaff['id'] ?? null;

        if ($staff_id) {
            // Create contract
            $contractData = [
                'staff_id' => $staff_id,
                'signed_date' => $contract_start,
                'end_date' => $contract_end
            ];

            $this->contractModel->create($contractData);
        }

        set_flash('success', 'Staff created successfully with contract.');
        redirect(APP_URL . '/staff');
    }

    /**
     * Show staff profile
     */
    public function show($id)
    {
        $staff = $this->staffModel->getWithContract($id);

        if (!$staff) {
            set_flash('error', 'Staff not found.');
            redirect(APP_URL . '/staff');
        }

        $contracts = $this->contractModel->getByStaffId($id);
        require BASE_PATH . '/views/staff/show.php';
    }

    /**
     * Show edit staff form
     */
    public function edit($id)
    {
        $staff = $this->staffModel->getById($id);

        if (!$staff) {
            set_flash('error', 'Staff not found.');
            redirect(APP_URL . '/staff');
        }

        $csrf_token = csrf_token();
        $departments = $this->departmentModel->getAll();
        require BASE_PATH . '/views/staff/edit.php';
    }

    /**
     * Update staff
     */
    public function update($id)
    {
        // Verify CSRF token
        if (!verify_csrf($_POST['csrf_token'] ?? '')) {
            set_flash('error', 'Invalid request. Please try again.');
            redirect(APP_URL . '/staff');
        }

        $staff = $this->staffModel->getById($id);

        if (!$staff) {
            set_flash('error', 'Staff not found.');
            redirect(APP_URL . '/staff');
        }

        $first_name = trim($_POST['first_name'] ?? '');
        $last_name = trim($_POST['last_name'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $cellphone = trim($_POST['cellphone'] ?? '');
        $date_of_birth = $_POST['date_of_birth'] ?? '';
        $gender = $_POST['gender'] ?? '';
        $national_id = trim($_POST['national_id'] ?? '');
        $department_id = $_POST['department_id'] ?? '';

        // Validate required fields
        if (empty($first_name) || empty($last_name) || empty($email) || empty($cellphone) || 
            empty($date_of_birth) || empty($gender) || empty($department_id)) {
            set_flash('error', 'All fields are required.');
            redirect(APP_URL . '/staff/edit/' . $id);
        }

        // Handle profile picture upload
        $profile_picture = $staff['profile_picture'];
        if (!empty($_FILES['profile_picture']['name'])) {
            $imgError = validate_image($_FILES['profile_picture']);
            if ($imgError !== null) {
                set_flash('error', $imgError);
                redirect(APP_URL . '/staff/edit/' . $id);
            }
            $profile_picture = save_image($_FILES['profile_picture'], 'staff');
        }

        // Update staff
        $staffData = [
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'cellphone' => $cellphone,
            'date_of_birth' => $date_of_birth,
            'gender' => $gender,
            'national_id' => $national_id,
            'department_id' => $department_id,
            'profile_picture' => $profile_picture
        ];

        if ($this->staffModel->update($id, $staffData)) {
            set_flash('success', 'Staff updated successfully.');
            redirect(APP_URL . '/staff/show/' . $id);
        } else {
            set_flash('error', 'Failed to update staff.');
            redirect(APP_URL . '/staff/edit/' . $id);
        }
    }

    /**
     * Process staff resignation
     */
    public function resign($id)
    {
        // Verify CSRF token
        if (!verify_csrf($_POST['csrf_token'] ?? '')) {
            set_flash('error', 'Invalid request. Please try again.');
            redirect(APP_URL . '/staff');
        }

        $staff = $this->staffModel->getById($id);

        if (!$staff) {
            set_flash('error', 'Staff not found.');
            redirect(APP_URL . '/staff');
        }

        $resign_date = $_POST['resign_date'] ?? date('Y-m-d');

        // Mark staff as resigned
        if ($this->staffModel->resign($id, $resign_date)) {
            // End active contract
            $this->contractModel->endContract($id);

            set_flash('success', 'Staff marked as resigned.');
            redirect(APP_URL . '/staff/show/' . $id);
        } else {
            set_flash('error', 'Failed to process resignation.');
            redirect(APP_URL . '/staff/show/' . $id);
        }
    }

    /**
     * Delete staff (soft delete via status change)
     */
    public function delete($id)
    {
        // Verify CSRF token
        if (!verify_csrf($_POST['csrf_token'] ?? '')) {
            set_flash('error', 'Invalid request. Please try again.');
            redirect(APP_URL . '/staff');
        }

        $staff = $this->staffModel->getById($id);

        if (!$staff) {
            set_flash('error', 'Staff not found.');
            redirect(APP_URL . '/staff');
        }

        // Soft delete - mark as resigned
        if ($this->staffModel->resign($id, date('Y-m-d'))) {
            $this->contractModel->endContract($id);
            set_flash('success', 'Staff deleted successfully.');
            redirect(APP_URL . '/staff');
        } else {
            set_flash('error', 'Failed to delete staff.');
            redirect(APP_URL . '/staff');
        }
    }
}

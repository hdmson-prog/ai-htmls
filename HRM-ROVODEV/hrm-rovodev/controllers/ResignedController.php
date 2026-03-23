<?php

class ResignedController
{
    protected $staffModel;
    protected $contractModel;

    public function __construct()
    {
        require_auth();
        $this->staffModel = new Staff();
        $this->contractModel = new Contract();
    }

    /**
     * List all resigned staff
     */
    public function index()
    {
        $page = $_GET['page'] ?? 1;
        $perPage = 10;

        $filters = [
            'search' => $_GET['search'] ?? '',
            'sort' => $_GET['sort'] ?? 'created_at',
            'sort_dir' => $_GET['sort_dir'] ?? 'DESC'
        ];

        $staff = $this->staffModel->getResigned($filters, $page, $perPage);
        $total = $this->staffModel->getTotalCount('Resigned');
        $pagination = paginate($total, $page, $perPage);

        require BASE_PATH . '/views/resigned/index.php';
    }

    /**
     * Process re-onboarding of resigned staff
     */
    public function reOnboard($id)
    {
        // Verify CSRF token
        if (!verify_csrf($_POST['csrf_token'] ?? '')) {
            set_flash('error', 'Invalid request. Please try again.');
            redirect(APP_URL . '/resigned');
        }

        $staff = $this->staffModel->getById($id);

        if (!$staff) {
            set_flash('error', 'Staff not found.');
            redirect(APP_URL . '/resigned');
        }

        if ($staff['status'] !== 'Resigned') {
            set_flash('error', 'Staff is not resigned.');
            redirect(APP_URL . '/resigned');
        }

        $contract_start = $_POST['contract_start'] ?? date('Y-m-d');

        // Calculate contract end date (3 years default)
        $contract_end = contract_end_date($contract_start);

        // Re-onboard staff
        if ($this->staffModel->reOnboard($id)) {
            // Create new contract
            $contractData = [
                'staff_id' => $id,
                'signed_date' => $contract_start,
                'end_date' => $contract_end
            ];

            if ($this->contractModel->create($contractData)) {
                set_flash('success', 'Staff re-onboarded successfully with new contract.');
                redirect(APP_URL . '/staff/' . $id);
            } else {
                set_flash('error', 'Failed to create new contract.');
                redirect(APP_URL . '/resigned/' . $id);
            }
        } else {
            set_flash('error', 'Failed to re-onboard staff.');
            redirect(APP_URL . '/resigned/' . $id);
        }
    }
}

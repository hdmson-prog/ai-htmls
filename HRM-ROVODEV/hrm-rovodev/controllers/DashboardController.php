<?php

class DashboardController
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
     * Display dashboard with all key metrics
     */
    public function index()
    {
        // Total staff count
        $totalStaff = $this->staffModel->getTotalCount('Active');

        // Gender statistics
        $genderStats = $this->staffModel->getGenderStats();

        // Contracts ending soon (90 days)
        $contractsEndingSoon = $this->contractModel->getEndingSoon(90);

        // Recently signed contracts
        $recentlySigned = $this->contractModel->getRecentlySigned(5);

        // Departments with staff count
        $departments = $this->departmentModel->getAllWithStaffCount();

        require BASE_PATH . '/views/dashboard/index.php';
    }
}

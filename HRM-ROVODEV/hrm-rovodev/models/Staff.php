<?php

class Staff
{
    protected $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Get all staff with filters, pagination, and sorting
     */
    public function getAll($filters = [], $page = 1, $perPage = 10)
    {
        $query = "SELECT s.*, d.name as department_name FROM staff s 
                  LEFT JOIN departments d ON s.department_id = d.id 
                  WHERE s.status != 'Resigned'";
        $params = [];

        // Search filter
        if (!empty($filters['search'])) {
            $query .= " AND (s.first_name LIKE ? OR s.last_name LIKE ? OR s.cellphone LIKE ?)";
            $searchTerm = '%' . $filters['search'] . '%';
            $params = array_merge($params, [$searchTerm, $searchTerm, $searchTerm]);
        }

        // Department filter
        if (!empty($filters['department'])) {
            $query .= " AND s.department_id = ?";
            $params[] = $filters['department'];
        }

        // Sorting
        $sortBy = $filters['sort'] ?? 'created_at';
        $sortDir = $filters['sort_dir'] ?? 'DESC';
        $query .= " ORDER BY s.$sortBy $sortDir";

        // Pagination
        $offset = ($page - 1) * $perPage;
        $query .= " LIMIT ? OFFSET ?";
        $params[] = $perPage;
        $params[] = $offset;

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get staff by ID
     */
    public function getById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM staff WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Get staff with contract details
     */
    public function getWithContract($id)
    {
        $stmt = $this->db->prepare(
            "SELECT s.*, c.id as contract_id, c.signed_date, c.end_date, c.status 
             FROM staff s 
             LEFT JOIN contracts c ON s.id = c.staff_id 
             WHERE s.id = ? 
             ORDER BY c.created_at DESC 
             LIMIT 1"
        );
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Get resigned staff
     */
    public function getResigned($filters = [], $page = 1, $perPage = 10)
    {
        $query = "SELECT s.*, d.name as department_name FROM staff s 
                  LEFT JOIN departments d ON s.department_id = d.id 
                  WHERE s.status = 'Resigned'";
        $params = [];

        // Search filter
        if (!empty($filters['search'])) {
            $query .= " AND (s.first_name LIKE ? OR s.last_name LIKE ?)";
            $searchTerm = '%' . $filters['search'] . '%';
            $params = array_merge($params, [$searchTerm, $searchTerm]);
        }

        // Sorting
        $sortBy = $filters['sort'] ?? 'created_at';
        $sortDir = $filters['sort_dir'] ?? 'DESC';
        $query .= " ORDER BY s.$sortBy $sortDir";

        // Pagination
        $offset = ($page - 1) * $perPage;
        $query .= " LIMIT ? OFFSET ?";
        $params[] = $perPage;
        $params[] = $offset;

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Create new staff
     */
    public function create($data)
    {
        $stmt = $this->db->prepare(
            "INSERT INTO staff (first_name, last_name, email, cellphone, date_of_birth, gender, 
             national_id, department_id, profile_picture, onboarding_date, living_address,
             home_address, remark, status, created_at) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active', NOW())"
        );
        
        return $stmt->execute([
            $data['first_name'] ?? null,
            $data['last_name'] ?? null,
            $data['email'] ?? null,
            $data['cellphone'] ?? null,
            $data['date_of_birth'] ?? null,
            $data['gender'] ?? null,
            $data['national_id'] ?? null,
            $data['department_id'] ?? null,
            $data['profile_picture'] ?? null,
            $data['onboarding_date'] ?? null,
            $data['living_address'] ?? null,
            $data['home_address'] ?? null,
            $data['remark'] ?? null,
        ]);
    }

    /**
     * Update staff
     */
    public function update($id, $data)
    {
        $stmt = $this->db->prepare(
            "UPDATE staff SET first_name = ?, last_name = ?, email = ?, cellphone = ?, 
             date_of_birth = ?, gender = ?, national_id = ?, department_id = ?, 
             profile_picture = ?, onboarding_date = ?, living_address = ?,
             home_address = ?, remark = ?, updated_at = NOW() 
             WHERE id = ?"
        );
        
        return $stmt->execute([
            $data['first_name'] ?? null,
            $data['last_name'] ?? null,
            $data['email'] ?? null,
            $data['cellphone'] ?? null,
            $data['date_of_birth'] ?? null,
            $data['gender'] ?? null,
            $data['national_id'] ?? null,
            $data['department_id'] ?? null,
            $data['profile_picture'] ?? null,
            $data['onboarding_date'] ?? null,
            $data['living_address'] ?? null,
            $data['home_address'] ?? null,
            $data['remark'] ?? null,
            $id
        ]);
    }

    /**
     * Mark staff as resigned
     */
    public function resign($id, $resign_date)
    {
        $stmt = $this->db->prepare(
            "UPDATE staff SET status = 'Resigned', resign_date = ?, updated_at = NOW() 
             WHERE id = ?"
        );
        return $stmt->execute([$resign_date, $id]);
    }

    /**
     * Re-onboard resigned staff
     */
    public function reOnboard($id)
    {
        $stmt = $this->db->prepare(
            "UPDATE staff SET status = 'Active', resign_date = NULL, updated_at = NOW() 
             WHERE id = ?"
        );
        return $stmt->execute([$id]);
    }

    /**
     * Get total staff count by status
     */
    public function getTotalCount($status = 'Active')
    {
        $query = "SELECT COUNT(*) as count FROM staff";
        $params = [];

        if ($status !== 'all') {
            $query .= " WHERE status = ?";
            $params[] = $status;
        }

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['count'] ?? 0;
    }

    /**
     * Get gender statistics
     */
    public function getGenderStats()
    {
        $stmt = $this->db->prepare(
            "SELECT gender, COUNT(*) as count FROM staff 
             WHERE status != 'Resigned' 
             GROUP BY gender"
        );
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get staff by department
     */
    public function getByDepartment($dept_id)
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM staff WHERE department_id = ? AND status != 'Resigned' 
             ORDER BY first_name ASC"
        );
        $stmt->execute([$dept_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Search staff across multiple fields
     */
    public function search($query)
    {
        $searchTerm = '%' . $query . '%';
        $stmt = $this->db->prepare(
            "SELECT s.*, d.name as department_name FROM staff s 
             LEFT JOIN departments d ON s.department_id = d.id 
             WHERE s.status != 'Resigned' AND 
             (s.first_name LIKE ? OR s.last_name LIKE ? OR s.cellphone LIKE ? 
              OR s.email LIKE ? OR d.name LIKE ?) 
             ORDER BY s.first_name ASC"
        );
        $stmt->execute(array_fill(0, 5, $searchTerm));
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get contracts ending soon
     */
    public function getContractsEndingSoon($days = 90)
    {
        $stmt = $this->db->prepare(
            "SELECT s.*, c.id as contract_id, c.end_date FROM staff s 
             INNER JOIN contracts c ON s.id = c.staff_id 
             WHERE s.status != 'Resigned' AND c.status = 'Active' 
             AND c.end_date <= DATE_ADD(NOW(), INTERVAL ? DAY) 
             AND c.end_date >= NOW() 
             ORDER BY c.end_date ASC"
        );
        $stmt->execute([$days]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get recently signed contracts
     */
    public function getRecentlySigned($limit = 5)
    {
        $stmt = $this->db->prepare(
            "SELECT s.*, c.id as contract_id, c.signed_date FROM staff s 
             INNER JOIN contracts c ON s.id = c.staff_id 
             WHERE s.status != 'Resigned' 
             ORDER BY c.created_at DESC 
             LIMIT ?"
        );
        $stmt->execute([$limit]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

<?php

class Department
{
    protected $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Get all departments
     */
    public function getAll()
    {
        $stmt = $this->db->prepare("SELECT * FROM departments ORDER BY name ASC");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get department by ID
     */
    public function getById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM departments WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Get all departments with staff count
     */
    public function getAllWithStaffCount()
    {
        $stmt = $this->db->prepare(
            "SELECT d.*, COUNT(s.id) as staff_count 
             FROM departments d 
             LEFT JOIN staff s ON d.id = s.department_id AND s.status != 'Resigned'
             GROUP BY d.id 
             ORDER BY d.name ASC"
        );
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Create new department
     */
    public function create($data)
    {
        $stmt = $this->db->prepare(
            "INSERT INTO departments (name, description, created_at) 
             VALUES (?, ?, NOW())"
        );
        
        return $stmt->execute([
            $data['name'] ?? null,
            $data['description'] ?? null
        ]);
    }

    /**
     * Update department
     */
    public function update($id, $data)
    {
        $stmt = $this->db->prepare(
            "UPDATE departments SET name = ?, description = ?, updated_at = NOW() 
             WHERE id = ?"
        );
        
        return $stmt->execute([
            $data['name'] ?? null,
            $data['description'] ?? null,
            $id
        ]);
    }

    /**
     * Delete department (only if no staff assigned)
     */
    public function delete($id)
    {
        // Check if department has staff
        if ($this->getStaffCount($id) > 0) {
            return false;
        }

        $stmt = $this->db->prepare("DELETE FROM departments WHERE id = ?");
        return $stmt->execute([$id]);
    }

    /**
     * Get staff count for department
     */
    public function getStaffCount($id)
    {
        $stmt = $this->db->prepare(
            "SELECT COUNT(*) as count FROM staff 
             WHERE department_id = ? AND status != 'Resigned'"
        );
        $stmt->execute([$id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['count'] ?? 0;
    }
}

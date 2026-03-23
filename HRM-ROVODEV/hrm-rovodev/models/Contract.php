<?php

class Contract
{
    protected $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Get all contracts for a staff member
     */
    public function getByStaffId($staff_id)
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM contracts WHERE staff_id = ? ORDER BY created_at DESC"
        );
        $stmt->execute([$staff_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get active contract for a staff member
     */
    public function getActiveByStaffId($staff_id)
    {
        $stmt = $this->db->prepare(
            "SELECT * FROM contracts WHERE staff_id = ? AND status = 'Active' 
             ORDER BY created_at DESC LIMIT 1"
        );
        $stmt->execute([$staff_id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Create new contract
     */
    public function create($data)
    {
        $stmt = $this->db->prepare(
            "INSERT INTO contracts (staff_id, signed_date, end_date, status, created_at) 
             VALUES (?, ?, ?, 'Active', NOW())"
        );
        
        return $stmt->execute([
            $data['staff_id'] ?? null,
            $data['signed_date'] ?? $data['start_date'] ?? null,
            $data['end_date'] ?? null
        ]);
    }

    /**
     * End contract for a staff member
     */
    public function endContract($staff_id)
    {
        $stmt = $this->db->prepare(
            "UPDATE contracts SET status = 'Ended' WHERE staff_id = ? AND status = 'Active'"
        );
        return $stmt->execute([$staff_id]);
    }

    /**
     * Get contracts ending soon
     */
    public function getEndingSoon($days = 90)
    {
        $stmt = $this->db->prepare(
            "SELECT c.*, s.id as staff_id, s.first_name, s.last_name, s.email, 
             d.name as department_name 
             FROM contracts c 
             INNER JOIN staff s ON c.staff_id = s.id 
             LEFT JOIN departments d ON s.department_id = d.id 
             WHERE c.status = 'Active' AND s.status != 'Resigned'
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
            "SELECT c.*, s.id as staff_id, s.first_name, s.last_name, 
             d.name as department_name 
             FROM contracts c 
             INNER JOIN staff s ON c.staff_id = s.id 
             LEFT JOIN departments d ON s.department_id = d.id 
             WHERE c.status = 'Active' AND s.status != 'Resigned'
             ORDER BY c.created_at DESC 
             LIMIT ?"
        );
        $stmt->execute([$limit]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Get contract by ID
     */
    public function getById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM contracts WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Update contract
     */
    public function update($id, $data)
    {
        $stmt = $this->db->prepare(
            "UPDATE contracts SET signed_date = ?, end_date = ?, 
             updated_at = NOW() WHERE id = ?"
        );
        
        return $stmt->execute([
            $data['signed_date'] ?? $data['start_date'] ?? null,
            $data['end_date'] ?? null,
            $id
        ]);
    }
}

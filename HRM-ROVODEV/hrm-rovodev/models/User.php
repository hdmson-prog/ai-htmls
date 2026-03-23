<?php

class User
{
    protected $db;

    public function __construct()
    {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Find user by email
     */
    public function findByEmail($email)
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Find user by username
     */
    public function findByUsername($username)
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Find user by ID
     */
    public function findById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Create new user
     */
    public function create($data)
    {
        $stmt = $this->db->prepare(
            "INSERT INTO users (username, email, password, created_at) 
             VALUES (?, ?, ?, NOW())"
        );
        
        return $stmt->execute([
            $data['username'] ?? null,
            $data['email'] ?? null,
            $data['password'] ?? null
        ]);
    }

    /**
     * Verify password against hash
     */
    public function verifyPassword($plain, $hash)
    {
        return password_verify($plain, $hash);
    }

    /**
     * Store remember me token
     */
    public function storeRememberToken($user_id, $token_hash, $expires)
    {
        $stmt = $this->db->prepare(
            "INSERT INTO password_remember_tokens (user_id, token, expires_at, created_at)
             VALUES (?, ?, ?, NOW())"
        );
        
        return $stmt->execute([$user_id, $token_hash, $expires]);
    }

    /**
     * Delete remember token by hash
     */
    public function deleteRememberToken($token_hash)
    {
        $stmt = $this->db->prepare("DELETE FROM password_remember_tokens WHERE token = ?");
        return $stmt->execute([$token_hash]);
    }

    /**
     * Delete expired remember tokens
     */
    public function deleteExpiredTokens()
    {
        $stmt = $this->db->prepare("DELETE FROM password_remember_tokens WHERE expires_at < NOW()");
        return $stmt->execute();
    }
}

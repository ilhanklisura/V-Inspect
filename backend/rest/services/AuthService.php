<?php
require_once __DIR__ . '/../dao/AuthDao.php';
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../Roles.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

class AuthService {
    private $dao;

    public function __construct() {
        $this->dao = new AuthDao();
    }

    public function login($email, $password) {
        $user = $this->dao->get_user_by_email($email);

        if (!$user || !password_verify($password, $user['password'])) {
            Flight::halt(401, "Invalid email or password");
        }

        unset($user['password']);

        $payload = [
            'user_id' => $user['id'],
            'email' => $user['email'],
            'role' => $user['role'],
            'exp' => time() + (60 * 60 * 24)
        ];

        $jwt = JWT::encode($payload, Config::JWT_SECRET(), 'HS256');

        return ['token' => $jwt, 'user' => $user];
    }

    public function decode_token($token) {
        return (array) JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256'));
    }
}

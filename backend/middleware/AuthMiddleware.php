<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware {
    public static function authenticate() {
        $headers = [];

        if (function_exists('getallheaders')) {
            $headers = getallheaders();
        } else {
            foreach ($_SERVER as $name => $value) {
                if (str_starts_with($name, 'HTTP_')) {
                    $key = str_replace('_', '-', substr($name, 5));
                    $headers[$key] = $value;
                }
            }
        }

        if (!isset($headers['Authorization'])) {
            Flight::halt(401, "Missing token");
        }

        $authHeader = $headers['Authorization'];
        if (!str_starts_with($authHeader, 'Bearer ')) {
            Flight::halt(401, "Invalid token format");
        }

        $token = str_replace('Bearer ', '', $authHeader);

        try {
            $decoded = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256'));
            Flight::set('user', (array) $decoded->user); // Convert stdClass to array
        } catch (Exception $e) {
            Flight::halt(401, 'Invalid token: ' . $e->getMessage());
        }
    }

    public static function authorizeRole($role) {
        self::authenticate();
        $user = Flight::get('user');
        if ($user['role'] !== $role) {
            Flight::halt(403, 'Access denied');
        }
    }

    public static function authorizeRoles($roles) {
        self::authenticate();
        $user = Flight::get('user');
        if (!in_array($user['role'], $roles)) {
            Flight::halt(403, 'Access denied');
        }
    }
}

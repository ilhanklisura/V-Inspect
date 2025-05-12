<?php

require_once __DIR__ . '/../rest/services/AuthService.php';

class AuthMiddleware {
    public static function authenticate() {
        $headers = getallheaders();
        if (!isset($headers['Authorization'])) {
            Flight::halt(401, "Missing Authorization header");
        }

        $token = str_replace("Bearer ", "", $headers['Authorization']);
        try {
            $authService = new AuthService();
            $user = $authService->decode_token($token);
            Flight::set('user', $user);
        } catch (Exception $e) {
            Flight::halt(401, "Invalid or expired token");
        }
    }

    public static function authorizeRole($role) {
        self::authenticate();
        $user = Flight::get('user');
        if ($user['role'] !== $role) {
            Flight::halt(403, "Forbidden: Insufficient privileges");
        }
    }

    public static function authorizeRoles($roles = []) {
        self::authenticate();
        $user = Flight::get('user');
        if (!in_array($user['role'], $roles)) {
            Flight::halt(403, "Forbidden: Role not allowed");
        }
    }
}

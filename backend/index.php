<?php
require './vendor/autoload.php';

require_once 'rest/config.php';
require_once 'data/Roles.php';

require_once 'rest/services/UserService.php';
require_once 'rest/services/AuthService.php';
require_once 'rest/services/VehicleService.php';
require_once 'rest/services/StationService.php';
require_once 'rest/services/InspectionService.php';

require_once 'middleware/AuthMiddleware.php';

// Register all services
Flight::register('user_service', 'UserService');
Flight::register('vehicle_service', 'VehicleService');
Flight::register('station_service', 'StationService');
Flight::register('inspection_service', 'InspectionService');

// Routes
require_once 'rest/routes/UserRoutes.php';
require_once 'rest/routes/AuthRoutes.php';
require_once 'rest/routes/VehicleRoutes.php';
require_once 'rest/routes/StationRoutes.php';
require_once 'rest/routes/InspectionRoutes.php';

// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// GLOBALNI AUTH GUARD
Flight::route('/*', function () {
    $publicRoutes = [
        '/auth/login',
        '/auth/register'
    ];

    foreach ($publicRoutes as $route) {
        if (strpos(Flight::request()->url, $route) === 0) return true;
    }

    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        Flight::halt(401, "Authorization header missing");
    }

    $token = str_replace("Bearer ", "", $headers['Authorization']);

    try {
        $authService = new AuthService();
        $decoded = $authService->decode_token($token);
        Flight::set('user', $decoded);
    } catch (Exception $e) {
        Flight::halt(401, "Invalid or expired token: " . $e->getMessage());
    }
});

Flight::start();

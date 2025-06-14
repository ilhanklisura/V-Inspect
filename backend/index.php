<?php

if (php_sapi_name() === 'cli') {
    return;
}

require './vendor/autoload.php';

// CORS headers
header("Access-Control-Allow-Origin: https://vinspect-frontend-pepwp.ondigitalocean.app");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Middleware
require_once './middleware/AuthMiddleware.php';

// Services
require_once './rest/services/AuthService.php';
require_once './rest/services/UserService.php';
require_once './rest/services/VehicleService.php';
require_once './rest/services/StationService.php';
require_once './rest/services/InspectionService.php';

// Register services
Flight::register('auth_service', 'AuthService');
Flight::register('auth_middleware', 'AuthMiddleware');
Flight::register('user_service', 'UserService');
Flight::register('vehicle_service', 'VehicleService');
Flight::register('station_service', 'StationService');
Flight::register('inspection_service', 'InspectionService');

// Global authentication middleware (except public routes)
Flight::route('/*', function () {
    $public_routes = [
        '/auth/login',
        '/auth/register',
        '/docs',
        '/docs/',
        '/docs/index.html',
        '/docs/swagger.php',
        '/public/v1/docs',
        '/public/v1/docs/',
        '/public/v1/docs/swagger.php',
        '/public/v1/docs/index.html'
    ];


    $request_url = Flight::request()->url;
    foreach ($public_routes as $route) {
        if (strpos($request_url, $route) === 0) {
            return true;
        }
    }

    Flight::auth_middleware()->authenticate();
    return true;
});


// Route files
require_once './rest/routes/AuthRoutes.php';
require_once './rest/routes/UserRoutes.php';
require_once './rest/routes/VehicleRoutes.php';
require_once './rest/routes/StationRoutes.php';
require_once './rest/routes/InspectionRoutes.php';

// Start app
Flight::start();

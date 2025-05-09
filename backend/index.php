<?php
require './vendor/autoload.php';

// Services
require_once 'rest/services/UserService.php';

// Register Services
Flight::register('user_service', 'UserService');

// Routes
require_once 'rest/routes/UserRoutes.php';

// Start FlightPHP
Flight::start();
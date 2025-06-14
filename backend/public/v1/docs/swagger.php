<?php

require __DIR__ . '/../../../vendor/autoload.php';

define('LOCALSERVER', 'http://localhost/V-Inspect/backend/');
define('PRODSERVER', 'https://vinspect-backend-6lgv6.ondigitalocean.app/');

if($_SERVER['SERVER_NAME'] == 'localhost' || $_SERVER['SERVER_NAME'] == '127.0.0.1'){
    define('BASE_URL', 'http://localhost/V-Inspect/backend/');
} else {
    define('BASE_URL', 'https://vinspect-backend-6lgv6.ondigitalocean.app/');
}

$openapi = \OpenApi\Generator::scan([
    __DIR__ . '/doc_setup.php',
    __DIR__ . '/../../../rest/routes'
]);
header('Content-Type: application/json');
echo $openapi->toJson();
?>
<?php

function assertEquals($expected, $actual, $message = '')
{
    if ($expected !== $actual) {
        echo "❌ FAIL: $message\n";
        echo "   Expected: $expected\n";
        echo "   Actual:   $actual\n";
        exit(1);
    } else {
        echo "✅ PASS: $message\n";
    }
}

$base_url = 'https://vinspect-backend-6lgv6.ondigitalocean.app/';

// --- LOGIN TEST ---
$login_data = json_encode([
    'email' => 'admin@vinspect.com',
    'password' => 'adminpass'
]);

$ch = curl_init("$base_url/auth/login");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, $login_data);
$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

assertEquals(200, $status, 'Login as admin');
$data = json_decode($response, true);
$token = $data['data']['token'] ?? null;
if (!$token) {
    echo "❌ FAIL: Token not received\n";
    exit(1);
}

// --- USERS TEST ---
$ch = curl_init("$base_url/users");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $token"
]);
$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

assertEquals(200, $status, 'Admin can fetch users');

// --- VEHICLES TEST ---
$vehicle_data = json_encode([
    'owner_id' => 1,
    'plate_number' => 'TEST-XYZ-01',
    'manufacturer' => 'TestCar',
    'model' => 'Model S',
    'year' => 2025
]);

$ch = curl_init("$base_url/vehicles");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    "Authorization: Bearer $token"
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, $vehicle_data);
$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

assertEquals(200, $status, 'Admin can add vehicle');

echo "\n🎉 All cURL API tests passed.\n";
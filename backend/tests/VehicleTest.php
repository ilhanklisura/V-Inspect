<?php

use PHPUnit\Framework\TestCase;

class VehicleTest extends TestCase
{
    public function testOwnerCanAddVehicle()
    {
        $token = $this->loginAsOwner();

        $newVehicle = [
            'make' => 'TestCar',
            'model' => 'Model X',
            'vin' => 'VIN' . time(),
            'year' => 2024
        ];

        $ch = curl_init('http://localhost/V-Inspect/backend/vehicles');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $token
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($newVehicle));
        $response = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $data = json_decode($response, true);

        $this->assertEquals(200, $status);
        $this->assertEquals('Vehicle added.', $data['message']);
    }

    private function loginAsOwner()
    {
        $ch = curl_init('http://localhost/V-Inspect/backend/auth/login');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            'email' => 'ik@gmail.com',
            'password' => 'ik12345'
        ]));
        $response = curl_exec($ch);
        curl_close($ch);

        $data = json_decode($response, true);
        return $data['data']['token'];
    }
}
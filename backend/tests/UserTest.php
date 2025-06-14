<?php

use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    public function testAdminCanGetUserList()
    {
        $token = $this->loginAsAdmin();

        $ch = curl_init('http://localhost/V-Inspect/backend/users');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer ' . $token
        ]);
        $response = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $data = json_decode($response, true);

        $this->assertEquals(200, $status);
        $this->assertIsArray($data);
    }

    private function loginAsAdmin()
    {
        $ch = curl_init('http://localhost/V-Inspect/backend/auth/login');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            'email' => 'admin@vinspect.com',
            'password' => 'adminpass'
        ]));
        $response = curl_exec($ch);
        curl_close($ch);

        $data = json_decode($response, true);

        return $data['data']['token'];
    }
}
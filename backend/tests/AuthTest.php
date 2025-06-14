<?php

use PHPUnit\Framework\TestCase;

class AuthTest extends TestCase
{
    public function testSuccessfulRegistration()
    {
        $email = "test" . time() . "@example.com";

        $response = $this->post('/auth/register', [
            'name' => 'Test User',
            'email' => $email,
            'password' => 'test12345'
        ]);

        $this->assertEquals(200, $response['status']);
        $this->assertArrayHasKey('data', $response['body']);
    }

    public function testLoginReturnsToken()
    {
        $response = $this->post('/auth/login', [
            'email' => 'admin@vinspect.com',
            'password' => 'adminpass'
        ]);

        $this->assertEquals(200, $response['status']);
        $this->assertArrayHasKey('token', $response['body']['data']);
    }

    private function post($endpoint, $payload)
    {
        $url = 'http://localhost/V-Inspect/backend' . $endpoint;

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        $response = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return [
            'status' => $status,
            'body' => json_decode($response, true)
        ];
    }
}
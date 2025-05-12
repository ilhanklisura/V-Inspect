<?php

/**
 * @OA\Post(
 *     path="/auth/login",
 *     summary="User login",
 *     tags={"Auth"},
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             required={"email", "password"},
 *             @OA\Property(property="email", type="string"),
 *             @OA\Property(property="password", type="string")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Login successful")
 * )
 */
Flight::route('POST /auth/login', function () {
    $data = Flight::request()->data->getData();
    $service = new AuthService();
    Flight::json($service->login($data['email'], $data['password']));
});

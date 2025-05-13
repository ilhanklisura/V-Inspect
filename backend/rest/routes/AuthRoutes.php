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

/**
 * @OA\Post(
 *     path="/auth/register",
 *     summary="Public user registration (vehicle_owner only)",
 *     tags={"Auth"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name", "email", "password"},
 *             @OA\Property(property="name", type="string"),
 *             @OA\Property(property="email", type="string"),
 *             @OA\Property(property="password", type="string")
 *         )
 *     ),
 *     @OA\Response(response=200, description="User registered successfully")
 * )
 */
Flight::route('POST /auth/register', function () {
    $data = Flight::request()->data->getData();

    $data['role'] = Roles::VEHICLE_OWNER;

    $service = new UserService();
    Flight::json([
        "message" => "User registered successfully",
        "data" => $service->add($data)
    ]);
});

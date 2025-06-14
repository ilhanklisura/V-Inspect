<?php
require_once __DIR__ . '/../../middleware/AuthMiddleware.php';

/**
 * @OA\Get(
 *     path="/users",
 *     summary="Get all users (admin only)",
 *     tags={"Users"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Response(response=200, description="List of users")
 * )
 */
Flight::route('GET /users', function () {
    AuthMiddleware::authorizeRole(Roles::ADMIN);
    Flight::json(Flight::user_service()->get_all());
});

/**
 * @OA\Get(
 *     path="/users/{id}",
 *     summary="Get user by ID (admin or self)",
 *     tags={"Users"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="User found")
 * )
 */
Flight::route('GET /users/@id', function ($id) {
    AuthMiddleware::authenticate();
    $user = Flight::get('user');
    if ($user['role'] !== Roles::ADMIN && $user['id'] != $id) {
        Flight::halt(403, "You can only view your own profile.");
    }
    Flight::json(Flight::user_service()->get_by_id($id));
});

/**
 * @OA\Post(
 *     path="/users",
 *     summary="Create new user (admin only)",
 *     tags={"Users"},
 *     security={{"bearerAuth":{}}},
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             required={"name", "email", "password", "role"},
 *             @OA\Property(property="name", type="string"),
 *             @OA\Property(property="email", type="string"),
 *             @OA\Property(property="password", type="string"),
 *             @OA\Property(property="role", type="string", enum={"admin", "vehicle_owner", "inspection_staff"})
 *         )
 *     ),
 *     @OA\Response(response=200, description="User created")
 * )
 */
Flight::route('POST /users', function () {
    AuthMiddleware::authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json([
        'message' => 'User created successfully',
        'data' => Flight::user_service()->add($data)
    ]);
});

/**
 * @OA\Put(
 *     path="/users/{id}",
 *     summary="Update user (admin only)",
 *     tags={"Users"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             @OA\Property(property="name", type="string"),
 *             @OA\Property(property="email", type="string"),
 *             @OA\Property(property="password", type="string"),
 *             @OA\Property(property="role", type="string")
 *         )
 *     ),
 *     @OA\Response(response=200, description="User updated")
 * )
 */
Flight::route('PUT /users/@id', function ($id) {
    AuthMiddleware::authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json([
        'message' => 'User updated successfully',
        'data' => Flight::user_service()->update($data, $id)
    ]);
});

/**
 * @OA\Delete(
 *     path="/users/{id}",
 *     summary="Delete user (admin only)",
 *     tags={"Users"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="User deleted")
 * )
 */
Flight::route('DELETE /users/@id', function ($id) {
    AuthMiddleware::authorizeRole(Roles::ADMIN);
    Flight::user_service()->delete($id);
    Flight::json(['message' => 'User deleted successfully']);
});

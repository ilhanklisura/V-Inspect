<?php
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

/**
 * @OA\Get(
 *     path="/vehicles",
 *     summary="Get all vehicles (admin only)",
 *     tags={"Vehicles"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Response(response=200, description="List of vehicles")
 * )
 */
Flight::route('GET /vehicles', function () {
    AuthMiddleware::authorizeRole(Roles::ADMIN);
    Flight::json(Flight::vehicle_service()->get_all());
});

/**
 * @OA\Get(
 *     path="/vehicles/owner",
 *     summary="Get vehicles of current owner",
 *     tags={"Vehicles"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Response(response=200, description="List of own vehicles")
 * )
 */
Flight::route('GET /vehicles/owner', function () {
    AuthMiddleware::authorizeRoles([Roles::VEHICLE_OWNER]);
    $user = Flight::get('user');
    Flight::json(Flight::vehicle_service()->get_by_owner($user['user_id']));
});

/**
 * @OA\Get(
 *     path="/vehicles/{id}",
 *     summary="Get vehicle by ID",
 *     tags={"Vehicles"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="Vehicle found")
 * )
 */
Flight::route('GET /vehicles/@id', function ($id) {
    AuthMiddleware::authenticate();
    $user = Flight::get('user');
    $vehicle = Flight::vehicle_service()->get_by_id($id);

    if (!$vehicle) {
        Flight::halt(404, "Vehicle not found.");
    }

    if ($user['role'] !== Roles::ADMIN && $vehicle['owner_id'] != $user['user_id']) {
        Flight::halt(403, "Not allowed to view this vehicle.");
    }

    Flight::json($vehicle);
});

/**
 * @OA\Post(
 *     path="/vehicles",
 *     summary="Create new vehicle",
 *     tags={"Vehicles"},
 *     security={{"bearerAuth":{}}},
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             required={"owner_id", "make", "model", "vin", "year"},
 *             @OA\Property(property="owner_id", type="integer"),
 *             @OA\Property(property="make", type="string"),
 *             @OA\Property(property="model", type="string"),
 *             @OA\Property(property="vin", type="string"),
 *             @OA\Property(property="year", type="integer"),
 *             @OA\Property(property="document_path", type="string")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Vehicle created")
 * )
 */
Flight::route('POST /vehicles', function () {
    AuthMiddleware::authorizeRoles([Roles::ADMIN, Roles::VEHICLE_OWNER]);
    $user = Flight::get('user');
    $data = Flight::request()->data->getData();

    if ($user['role'] !== Roles::ADMIN) {
        $data['owner_id'] = $user['user_id'];
    }

    Flight::json([
        'message' => 'Vehicle created successfully',
        'data' => Flight::vehicle_service()->add($data)
    ]);
});

/**
 * @OA\Put(
 *     path="/vehicles/{id}",
 *     summary="Update vehicle",
 *     tags={"Vehicles"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             @OA\Property(property="make", type="string"),
 *             @OA\Property(property="model", type="string"),
 *             @OA\Property(property="vin", type="string"),
 *             @OA\Property(property="year", type="integer"),
 *             @OA\Property(property="document_path", type="string")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Vehicle updated")
 * )
 */
Flight::route('PUT /vehicles/@id', function ($id) {
    AuthMiddleware::authenticate();
    $user = Flight::get('user');
    $vehicle = Flight::vehicle_service()->get_by_id($id);

    if (!$vehicle) {
        Flight::halt(404, "Vehicle not found.");
    }

    if ($user['role'] !== Roles::ADMIN && $vehicle['owner_id'] != $user['user_id']) {
        Flight::halt(403, "Not allowed to edit this vehicle.");
    }

    $data = Flight::request()->data->getData();
    Flight::json([
        'message' => 'Vehicle updated successfully',
        'data' => Flight::vehicle_service()->update($data, $id)
    ]);
});

/**
 * @OA\Delete(
 *     path="/vehicles/{id}",
 *     summary="Delete vehicle",
 *     tags={"Vehicles"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="Vehicle deleted")
 * )
 */
Flight::route('DELETE /vehicles/@id', function ($id) {
    AuthMiddleware::authenticate();
    $user = Flight::get('user');
    $vehicle = Flight::vehicle_service()->get_by_id($id);

    if (!$vehicle) {
        Flight::halt(404, "Vehicle not found.");
    }

    if ($user['role'] !== Roles::ADMIN && $vehicle['owner_id'] != $user['user_id']) {
        Flight::halt(403, "Not allowed to delete this vehicle.");
    }

    Flight::vehicle_service()->delete($id);
    Flight::json(['message' => 'Vehicle deleted successfully']);
});

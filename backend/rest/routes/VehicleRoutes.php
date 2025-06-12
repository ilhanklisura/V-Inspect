<?php
require_once __DIR__ . '/../../middleware/AuthMiddleware.php';

/**
 * @OA\Get(
 *     path="/vehicles",
 *     summary="Get all vehicles (admin or staff)",
 *     tags={"Vehicles"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Response(response=200, description="List of vehicles")
 * )
 */
Flight::route('GET /vehicles', function () {
    AuthMiddleware::authorizeRoles([Roles::ADMIN, Roles::INSPECTION_STAFF]);
    Flight::json(Flight::vehicle_service()->get_all());
});

/**
 * @OA\Get(
 *     path="/vehicles/my",
 *     summary="Get my vehicles (owner)",
 *     tags={"Vehicles"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Response(response=200, description="List of user's vehicles")
 * )
 */
Flight::route('GET /vehicles/my', function () {
    AuthMiddleware::authorizeRole(Roles::VEHICLE_OWNER);
    $user = Flight::get('user');
    Flight::json(Flight::vehicle_service()->get_by_owner($user['user_id']));
});

/**
 * @OA\Post(
 *     path="/vehicles",
 *     summary="Add vehicle (admin or owner)",
 *     tags={"Vehicles"},
 *     security={{"bearerAuth":{}}},
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             required={"make", "model", "vin", "year"},
 *             @OA\Property(property="owner_id", type="integer"),
 *             @OA\Property(property="make", type="string"),
 *             @OA\Property(property="model", type="string"),
 *             @OA\Property(property="vin", type="string"),
 *             @OA\Property(property="year", type="integer")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Vehicle added")
 * )
 */
Flight::route('POST /vehicles', function () {
    AuthMiddleware::authorizeRoles([Roles::ADMIN, Roles::VEHICLE_OWNER]);
    $user = Flight::get('user');
    $data = Flight::request()->data->getData();

    if ($user['role'] === Roles::VEHICLE_OWNER) {
        $data['owner_id'] = $user['user_id'];
    } elseif (!isset($data['owner_id'])) {
        Flight::halt(400, "Admin must provide owner_id.");
    }

    Flight::json([
        "message" => "Vehicle added.",
        "data" => Flight::vehicle_service()->add($data)
    ]);
});

/**
 * @OA\Put(
 *     path="/vehicles/{id}",
 *     summary="Update vehicle (admin only)",
 *     tags={"Vehicles"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             @OA\Property(property="make", type="string"),
 *             @OA\Property(property="model", type="string"),
 *             @OA\Property(property="vin", type="string"),
 *             @OA\Property(property="year", type="integer")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Vehicle updated")
 * )
 */
Flight::route('PUT /vehicles/@id', function ($id) {
    AuthMiddleware::authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json([
        "message" => "Vehicle updated.",
        "data" => Flight::vehicle_service()->update($data, $id)
    ]);
});

/**
 * @OA\Delete(
 *     path="/vehicles/{id}",
 *     summary="Delete vehicle (admin only)",
 *     tags={"Vehicles"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="Vehicle deleted")
 * )
 */
Flight::route('DELETE /vehicles/@id', function ($id) {
    AuthMiddleware::authorizeRole(Roles::ADMIN);
    Flight::vehicle_service()->delete($id);
    Flight::json(['message' => 'Vehicle deleted']);
});

<?php
require_once __DIR__ . '/../../middleware/AuthMiddleware.php';

/**
 * @OA\Get(
 *     path="/inspections",
 *     summary="Get all inspections (admin, staff only)",
 *     tags={"Inspections"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Response(response=200, description="List of inspections")
 * )
 */
Flight::route('GET /inspections', function () {
    AuthMiddleware::authorizeRoles([Roles::ADMIN, Roles::INSPECTION_STAFF]);
    Flight::json(Flight::inspection_service()->get_all());
});

/**
 * @OA\Get(
 *     path="/inspections/my",
 *     summary="Get inspections of logged-in vehicle owner",
 *     tags={"Inspections"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Response(response=200, description="List of owner's inspections")
 * )
 */
Flight::route('GET /inspections/my', function () {
    AuthMiddleware::authorizeRole(Roles::VEHICLE_OWNER);
    $user = Flight::get('user');
    Flight::json(Flight::inspection_service()->get_by_owner($user['user_id']));
});

/**
 * @OA\Get(
 *     path="/inspections/{id}",
 *     summary="Get inspection by ID",
 *     tags={"Inspections"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="Inspection found")
 * )
 */
Flight::route('GET /inspections/@id', function ($id) {
    AuthMiddleware::authenticate();
    $user = Flight::get('user');
    $inspection = Flight::inspection_service()->get_by_id($id);

    if (!$inspection) Flight::halt(404, "Inspection not found");

    if (
        $user['role'] !== Roles::ADMIN &&
        $user['role'] !== Roles::INSPECTION_STAFF &&
        $inspection['vehicle_id'] &&
        !in_array($inspection['vehicle_id'], array_column(Flight::inspection_service()->get_by_owner($user['user_id']), 'vehicle_id'))
    ) {
        Flight::halt(403, "Not allowed to view this inspection.");
    }

    Flight::json($inspection);
});

/**
 * @OA\Post(
 *     path="/inspections",
 *     summary="Schedule inspection (vehicle owner only)",
 *     tags={"Inspections"},
 *     security={{"bearerAuth":{}}},
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             required={"vehicle_id", "station_id", "date"},
 *             @OA\Property(property="vehicle_id", type="integer"),
 *             @OA\Property(property="station_id", type="integer"),
 *             @OA\Property(property="date", type="string", format="date-time")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Inspection scheduled")
 * )
 */
Flight::route('POST /inspections', function () {
    AuthMiddleware::authorizeRole(Roles::VEHICLE_OWNER);
    $user = Flight::get('user');
    $data = Flight::request()->data->getData();

    $vehicles = Flight::vehicle_service()->get_by_owner($user['user_id']);
    $owned_vehicle_ids = array_column($vehicles, 'id');

    if (!in_array($data['vehicle_id'], $owned_vehicle_ids)) {
        Flight::halt(403, "You don't own this vehicle.");
    }

    $data['status'] = 'scheduled';
    Flight::json([
        'message' => 'Inspection scheduled.',
        'data' => Flight::inspection_service()->add($data)
    ]);
});

/**
 * @OA\Put(
 *     path="/inspections/{id}",
 *     summary="Update inspection (staff or admin only)",
 *     tags={"Inspections"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", enum={"scheduled","completed","failed"}),
 *             @OA\Property(property="result", type="string")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Inspection updated")
 * )
 */
Flight::route('PUT /inspections/@id', function ($id) {
    AuthMiddleware::authorizeRoles([Roles::INSPECTION_STAFF, Roles::ADMIN]);
    $data = Flight::request()->data->getData();
    Flight::json([
        'message' => 'Inspection updated.',
        'data' => Flight::inspection_service()->update($data, $id)
    ]);
});

/**
 * @OA\Delete(
 *     path="/inspections/{id}",
 *     summary="Delete inspection (admin only)",
 *     tags={"Inspections"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="Inspection deleted")
 * )
 */
Flight::route('DELETE /inspections/@id', function ($id) {
    AuthMiddleware::authorizeRole(Roles::ADMIN);
    Flight::inspection_service()->delete($id);
    Flight::json(['message' => 'Inspection deleted successfully']);
});

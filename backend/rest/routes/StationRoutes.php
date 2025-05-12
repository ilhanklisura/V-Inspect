<?php
require_once __DIR__ . '/../middleware/AuthMiddleware.php';

/**
 * @OA\Get(
 *     path="/stations",
 *     summary="Get all stations",
 *     tags={"Stations"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Response(response=200, description="List of stations")
 * )
 */
Flight::route('GET /stations', function () {
    AuthMiddleware::authenticate();
    Flight::json(Flight::station_service()->get_all());
});

/**
 * @OA\Get(
 *     path="/stations/{id}",
 *     summary="Get station by ID",
 *     tags={"Stations"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="Station found")
 * )
 */
Flight::route('GET /stations/@id', function ($id) {
    AuthMiddleware::authenticate();
    Flight::json(Flight::station_service()->get_by_id($id));
});

/**
 * @OA\Post(
 *     path="/stations",
 *     summary="Create new station (admin only)",
 *     tags={"Stations"},
 *     security={{"bearerAuth":{}}},
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             required={"name", "location"},
 *             @OA\Property(property="name", type="string"),
 *             @OA\Property(property="location", type="string")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Station created")
 * )
 */
Flight::route('POST /stations', function () {
    AuthMiddleware::authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json([
        'message' => 'Station created successfully',
        'data' => Flight::station_service()->add($data)
    ]);
});

/**
 * @OA\Put(
 *     path="/stations/{id}",
 *     summary="Update station (admin only)",
 *     tags={"Stations"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             @OA\Property(property="name", type="string"),
 *             @OA\Property(property="location", type="string")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Station updated")
 * )
 */
Flight::route('PUT /stations/@id', function ($id) {
    AuthMiddleware::authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    Flight::json([
        'message' => 'Station updated successfully',
        'data' => Flight::station_service()->update($data, $id)
    ]);
});

/**
 * @OA\Delete(
 *     path="/stations/{id}",
 *     summary="Delete station (admin only)",
 *     tags={"Stations"},
 *     security={{"bearerAuth":{}}},
 *     @OA\Parameter(name="id", in="path", required=true, @OA\Schema(type="integer")),
 *     @OA\Response(response=200, description="Station deleted")
 * )
 */
Flight::route('DELETE /stations/@id', function ($id) {
    AuthMiddleware::authorizeRole(Roles::ADMIN);
    Flight::station_service()->delete($id);
    Flight::json(['message' => 'Station deleted successfully']);
});

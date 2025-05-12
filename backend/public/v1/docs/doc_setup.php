<?php

/**
 * @OA\OpenApi(
 *   @OA\Info(
 *     title="V-Inspect API",
 *     version="1.0.0",
 *     description="Official API documentation for the V-Inspect web platform. This API enables full CRUD operations for managing users, inspections, stations, vehicles, and many more."
 *   ),
 *   @OA\Server(
 *     url=LOCALSERVER,
 *     description="Local API Server"
 *   ),
 *  @OA\Server(
 *    url=PRODSERVER,
 *    description="Production API Server"
 *   )
 * )
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */

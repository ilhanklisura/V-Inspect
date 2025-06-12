<?php

/**
 * @OA\OpenApi(
 *   @OA\Info(
 *     title="V-Inspect API",
 *     version="1.0.0",
 *     description="API za sistem tehničkih pregleda vozila. Omogućava registraciju korisnika, upravljanje vozilima, stanicama, tehničkim pregledima i korisnicima.",
 *     @OA\Contact(
 *       name="Ilhan Klisura",
 *       email="work@ilhanklisura.com",
 *       url="https://ilhanklisura.com"
 *     )
 *   ),
 *   @OA\Server(
 *     url=LOCALSERVER,
 *     description="Lokalni API server"
 *   ),
 *   @OA\Server(
 *     url=PRODSERVER,
 *     description="Produkcijski API server"
 *   )
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */

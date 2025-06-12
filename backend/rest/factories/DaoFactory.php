<?php
require_once __DIR__ . '/../dao/UserDao.php';
require_once __DIR__ . '/../dao/VehicleDao.php';
require_once __DIR__ . '/../dao/InspectionDao.php';
require_once __DIR__ . '/../dao/StationDao.php';

class DaoFactory {
    public static function create($type) {
        return match($type) {
            'users' => new UserDao(),
            'vehicles' => new VehicleDao(),
            'inspections' => new InspectionDao(),
            'stations' => new StationDao(),
            default => throw new Exception("Unknown DAO type: $type"),
        };
    }
}

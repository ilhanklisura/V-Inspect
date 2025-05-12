<?php
require_once 'BaseService.php';
require_once __DIR__ . '/../dao/VehicleDao.php';

class VehicleService extends BaseService {
    public function __construct() {
        parent::__construct(new VehicleDao());
    }

    public function add($entity) {
        if (!isset($entity['vin']) || strlen($entity['vin']) < 3) {
            Flight::halt(400, "VIN is required and must be at least 3 characters.");
        }

        $existing = $this->dao->get_by_vin($entity['vin']);
        if ($existing) {
            Flight::halt(409, "Vehicle with this VIN already exists.");
        }

        return parent::add($entity);
    }

    public function get_by_owner($owner_id) {
        return $this->dao->get_by_owner($owner_id);
    }
}

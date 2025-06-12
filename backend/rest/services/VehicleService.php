<?php
require_once 'BaseService.php';
require_once __DIR__ . '/../factories/DaoFactory.php';

class VehicleService extends BaseService {
    public function __construct() {
        parent::__construct(DaoFactory::create('vehicles'));
    }

    public function get_by_owner($owner_id) {
        return $this->dao->get_by_owner($owner_id);
    }

    public function get_by_vin($vin) {
        return $this->dao->get_by_vin($vin);
    }

    public function add($entity) {
        if (!isset($entity['owner_id'], $entity['make'], $entity['model'], $entity['vin'], $entity['year'])) {
            Flight::halt(400, "Missing required fields.");
        }

        if ($this->dao->get_by_vin($entity['vin'])) {
            Flight::halt(409, "Vehicle with this VIN already exists.");
        }

        return parent::add($entity);
    }
}

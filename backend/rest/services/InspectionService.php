<?php
require_once 'BaseService.php';
require_once __DIR__ . '/../factories/DaoFactory.php';

class InspectionService extends BaseService {
    public function __construct() {
        parent::__construct(DaoFactory::create('inspections'));
    }

    public function add($entity) {
        if (!isset($entity['vehicle_id']) || !isset($entity['station_id']) || !isset($entity['date'])) {
            Flight::halt(400, "Missing required fields: vehicle_id, station_id, date");
        }

        if (!isset($entity['status'])) {
            $entity['status'] = 'scheduled';
        }

        return parent::add($entity);
    }

    public function get_by_vehicle_id($vehicle_id) {
        return $this->dao->get_by_vehicle_id($vehicle_id);
    }

    public function get_by_vehicle_owner($owner_id) {
        return $this->dao->get_by_vehicle_owner($owner_id);
    }
}

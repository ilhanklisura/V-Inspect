<?php
require_once 'BaseService.php';
require_once __DIR__ . '/../dao/InspectionDao.php';

class InspectionService extends BaseService {
    public function __construct() {
        parent::__construct(new InspectionDao());
    }

    public function get_by_owner($owner_id) {
        return $this->dao->get_by_vehicle_owner($owner_id);
    }
}

<?php
require_once __DIR__ . '/BaseDao.php';

class VehicleDao extends BaseDao {
    public function __construct() {
        parent::__construct("vehicles");
    }

    public function get_all() {
        return $this->query("SELECT * FROM vehicles", []);
    }

    public function get_by_id($id) {
        return $this->query_unique("SELECT * FROM vehicles WHERE id = :id", ["id" => $id]);
    }

    public function get_by_owner($owner_id) {
        return $this->query("SELECT * FROM vehicles WHERE owner_id = :owner_id", ["owner_id" => $owner_id]);
    }

    public function get_by_vin($vin) {
        return $this->query_unique("SELECT * FROM vehicles WHERE vin = :vin", ["vin" => $vin]);
    }
}

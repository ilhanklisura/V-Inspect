<?php
require_once __DIR__ . '/BaseDao.php';

class InspectionDao extends BaseDao {
    public function __construct() {
        parent::__construct("inspections");
    }

    public function get_all() {
        return $this->query("SELECT * FROM inspections", []);
    }

    public function get_by_id($id) {
        return $this->query_unique("SELECT * FROM inspections WHERE id = :id", ["id" => $id]);
    }

    public function get_by_vehicle_owner($owner_id) {
        $query = "
            SELECT i.* FROM inspections i
            JOIN vehicles v ON i.vehicle_id = v.id
            WHERE v.owner_id = :owner_id
        ";
        return $this->query($query, ["owner_id" => $owner_id]);
    }
}

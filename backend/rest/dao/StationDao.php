<?php
require_once __DIR__ . '/BaseDao.php';

class StationDao extends BaseDao {
    public function __construct() {
        parent::__construct("stations");
    }

    public function get_all() {
        return $this->query("SELECT * FROM stations", []);
    }

    public function get_by_id($id) {
        return $this->query_unique("SELECT * FROM stations WHERE id = :id", ["id" => $id]);
    }
}

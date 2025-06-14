<?php

class BaseService {
    protected $dao;

    public function __construct($dao) {
        $this->dao = $dao;
    }

    public function get_all() {
        return $this->dao->get_all();
    }

    public function get_by_id($id) {
        return $this->dao->get_by_id($id);
    }

    public function add($entity) {
        return $this->dao->add($entity);
    }

    public function update($entity, $id, $id_column = "id") {
        return $this->dao->update($entity, $id, $id_column);
    }

    public function delete($id) {
        return $this->dao->delete($id);
    }
}

<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../../db/Database.php';

class BaseDao {
    protected $connection;
    protected $table;

    public function __construct($table) {
        $this->table = $table;
        $this->connection = Database::getInstance()->getConnection();
    }

    protected function query($query, $params) {
        $stmt = $this->connection->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    protected function query_unique($query, $params) {
        $results = $this->query($query, $params);
        return reset($results);
    }

    public function add($entity) {
        $query = "INSERT INTO " . $this->table . " (";
        foreach ($entity as $column => $value) {
            $query .= $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= ") VALUES (";
        foreach ($entity as $column => $value) {
            $query .= ":" . $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= ")";

        $stmt = $this->connection->prepare($query);
        $stmt->execute($entity);
        $entity['id'] = $this->connection->lastInsertId();
        return $entity;
    }

    public function update($entity, $id, $id_column = "id") {
        $fields = array_keys($entity);

        if (count($fields) === 0) {
            throw new Exception("No data provided for update");
        }

        $query = "UPDATE " . $this->table . " SET ";
        foreach ($fields as $column) {
            $query .= $column . "=:" . $column . ", ";
        }
        $query = rtrim($query, ", ");
        $query .= " WHERE " . $id_column . " = :id";

        $entity['id'] = $id;

        $stmt = $this->connection->prepare($query);
        $stmt->execute($entity);
        return $entity;
    }

    public function delete($id) {
        $stmt = $this->connection->prepare("DELETE FROM " . $this->table . " WHERE id = :id");
        $stmt->bindValue(":id", $id);
        $stmt->execute();
    }
}

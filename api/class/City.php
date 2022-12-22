<?php
# import Database class
require_once __DIR__ . '/Database.sql';

# class User
class City {
    private $pdo;

    public function __construct()
    {
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }

    public function getAll(){
        $query = 'select * from `city`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}
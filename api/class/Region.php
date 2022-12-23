<?php
# import Database class
require_once __DIR__ . '/Database.php';

# class User
class Region {
    private $pdo;

    public function __construct()
    {
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }

    public function getAll(){
        $query = 'select * from `region`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function getOne($id) {
        $query = 'select * 
                  from `region`
                  where _id = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $id
        ];
        $stmt->execute($data);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}
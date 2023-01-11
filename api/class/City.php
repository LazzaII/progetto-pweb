<?php
# import Database class
require_once __DIR__ . '/Database.php';

# class User
class City {
    private $pdo;

    public function __construct()
    {
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }

    public function getAll(){
        $query = 'select * from `city` order by `name`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
    
    public function getOne($id) {
        $query = 'select * 
                  from `city`
                  where _id = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $id
        ];
        $stmt->execute($data);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function getFromRegion($region) {
        $query = 'select * 
                  from `city`
                  where `region_` = :region';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'region' => $region
        ];
        $stmt->execute($data);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
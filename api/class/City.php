<?php
# import Database class
require_once __DIR__ . '/Database.php';

# class User
class City {
    private $pdo;

    /**
     * Costruttore
     */
    public function __construct()
    {
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }
    /**
     * Funzione che rende tuti i dati di una città
     * @param int $id della città
     * @return array contente tutti i dati 
     */
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
    /**
     * Funzione che rende tuti i dati delle città di una determinata regione
     * @param int $id della regione
     * @return array contente tutti i dati
     */
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
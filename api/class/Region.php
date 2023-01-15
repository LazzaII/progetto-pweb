<?php
# import Database class
require_once __DIR__ . '/Database.php';

# class User
class Region {
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
     * Funzione che rende tutte le regioni
     * @return array contenente i dati delle regioni
     */
    public function getAll(){
        $query = 'select * from `region`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * Funzione che rende i dati di una regione
     * @param int $id della regione
     * @return array con i dati della regione
     */
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
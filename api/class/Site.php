<?php
# import Database class
require_once __DIR__ . '/Database.sql';

# class User
class Site {
    private $pdo;
    private $id;
    private $addr;
    private $city;

    public function __construct()
    {
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }

    public function getAll(){
        $query = 'select * from `site`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function add($site) {
        $query = "insert into `site` 
                  values (current_date(), :donator, :site)";
        $stmt = $this->pdo->prepare($query);
        $data = [
            'donator' => $site->donator,
            'site' => $site->site,
        ];
        $stmt->execute($data);
        return 'OK';
    }

    public function remove($id) {
        $query = 'delete from `site` 
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $id
        ];
        $stmt->execute($data);
        return 'OK';
    }

    public function update($site) {
        $query = 'update `site` 
                  set `address` = :addr, `city_` = :city
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id '=> $site->id,
            'addr' => $site->addr,
            'city' => $site->city 
        ];
        $stmt->execute($data);
        return 'OK';
    }

}
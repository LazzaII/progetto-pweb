<?php
# import Database class
require_once __DIR__ . '/Database.sql';

# class User
class Hospital {
    private $pdo;
    private $id;
    private $name;
    private $email;
    private $phone;
    private $pwd;
    private $isAuth;
    private $addr;
    private $city;
    
    public function __construct(){
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }

    public function findFromEmail($email){
        $query = 'select * from `hospital` where `email` = :email';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'email' => $email
        ];
        $stmt->execute($data);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
    
    public function getAll(){
        $query = 'select * from `hospital`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function add($hospital) {
        if(empty(self::findFromEmail($hospital->email))) {
            $query = "insert into `hospital` values (:name, :email, :phone, :pwd, :addr, :city)";
            $stmt = $this->pdo->prepare($query);
            $data = [
                'name' => $hospital->name,
                'email' => $hospital->email,
                'phone' => $hospital->phone,
                'pwd' => $hospital->pwd,
                'addr' => $hospital->addr,
                'city' => $hospital->city,
            ];
            $stmt->execute($data);
            return 'OK';
        }
        return 'ERR';
    }

    public function remove($id) {
        $query = 'delete from `hospital` 
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $id
        ];
        $stmt->execute($data);
        return 'ERR';
    }

    public function update($hospital) {
        if (empty(self::findFromEmail($hospital->email))) {
            $query = 'update `hospital` 
                      set `name` = :name, `email` = :email, `phone` = :phone, `hash_pwd` = :pwd, `address` = :addr, city_` = :city 
                      where `_id` = :id';
            $stmt = $this->pdo->prepare($query);
            $data = [
                'id' => $hospital->id,
                'name' => $hospital->name,
                'email' => $hospital->email,
                'phone' => $hospital->phone,
                'pwd' => $hospital->pwd,
                'addr' => $hospital->addr,
                'city' => $hospital->city,
            ];
            $stmt->execute($data);
            return 'OK';
        }
        return 'ERR';
    }

    public function authetication() {
        $query = 'update `hospital` set `isAuth` = 1 where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return 'OK';
    }
}


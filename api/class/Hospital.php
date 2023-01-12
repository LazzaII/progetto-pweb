<?php
# import Database class
require_once __DIR__ . '/Database.php';

# class User
class Hospital {
    private $pdo;
    public $id;
    public $name;
    public $email;
    public $phone;
    public $pwd;
    public $isAuth;
    public $addr;
    public $city;
    
    public function __construct(){
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }

    public function findFromEmail($email, $id = null){
        if($id == null){
            $query = 'select * 
                      from `hospital` 
                      where `email` = :email';
            $stmt = $this->pdo->prepare($query);
            $data = [
                'email' => $email
            ];
        } else {
            $query = 'select * 
                      from `hospital` 
                      where `email` = :email
                        and `_id` <> :id';
            $stmt = $this->pdo->prepare($query);
            $data = [
                'email' => $email,
                'id' => $id
            ];
        }
        $stmt->execute($data);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
    
    public function getAll(){
        $query = 'select * from `hospital`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function add($hospital) {
        if(empty(self::findFromEmail($hospital->email))) {
            $query = "insert into `hospital` (`name`, `email`, `phone`, `hash_pwd`, `address`, `city_`)
                      values (:name, :email, :phone, :pwd, :addr, :city)";
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

    public function delete($id) {
        $query = 'delete from `hospital` 
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $id
        ];
        $stmt->execute($data);
        return 'ERR';
    }

    public function update($hospital, $isPassword = true) {
        if (empty(self::findFromEmail($hospital->email, $hospital->id))) {
            if($isPassword) {
                $query = 'update `hospital` 
                          set `name` = :name, `email` = :email, `phone` = :phone, `hash_pwd` = :pwd, `address` = :addr, `city_` = :city
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
            } 
            else {
                $query = 'update `hospital` 
                          set `name` = :name, `email` = :email, `phone` = :phone, `address` = :addr, `city_` = :city
                          where `_id` = :id';
                $stmt = $this->pdo->prepare($query);
                $data = [
                    'id' => $hospital->id,
                    'name' => $hospital->name,
                    'email' => $hospital->email,
                    'phone' => $hospital->phone,
                    'addr' => $hospital->addr,
                    'city' => $hospital->city,
                ];
            }
            $stmt->execute($data);
            return 'OK';
        }
        return 'ERR';
    }

    public function authetication() {
        $query = 'update `hospital`
                  set `isAuth` = 1
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return 'OK';
    }
}


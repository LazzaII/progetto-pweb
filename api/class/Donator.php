<?php
# import Database class
require_once __DIR__ . '/Database.php';

# class User
class Donator {
    private $pdo;
    public $id;
    public $fn;
    public $sn;
    public $email;
    public $phone;
    public $pwd;
    public $blood;

    public $isAuth;
    
    public function __construct(){
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }

    public function findFromEmail($email, $id = null){
        if($id == null){
            $query = 'select * 
                      from `donator` 
                      where `email` = :email';
            $stmt = $this->pdo->prepare($query);
            $data = [
                'email' => $email
            ];
        } else {
            $query = 'select * 
                      from `donator` 
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
        $query = 'select * from `donator`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function add($donator) {
        if(empty(self::findFromEmail($donator->email))) {
            $query = "insert into `donator` (`first_name`, `second_name`, `email`, `phone`, `hash_pwd`, `blood_group`)
                      values (:fn, :sn, :email, :phone, :pwd, :blood)";
            $stmt = $this->pdo->prepare($query);
            $data = [
                'fn' => $donator->fn,
                'sn' => $donator->sn,
                'email' => $donator->email,
                'phone' => $donator->phone,
                'pwd' => $donator->pwd,
                'blood' => $donator->blood,
            ];
            $stmt->execute($data);
            return 'OK';
        }
        return 'ERR';
    }

    public function delete($id) {
        $query = 'delete from `donator`
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $id
        ];
        $stmt->execute($data);
        return 'OK';
    }

    public function update($donator, $isPassword = true) {
        if (empty(self::findFromEmail($donator->email, $donator->id))) {
            if($isPassword) {
                $query = 'update `donator` 
                          set `first_name` = :fn, `second_name` = :sn, `email` = :email, `phone` = :phone, 
                              `hash_pwd` = :pwd
                          where `_id` = :id';
                $stmt = $this->pdo->prepare($query);
                $data = [
                    'id' => $donator->id,
                    'fn' => $donator->fn,
                    'sn' => $donator->sn,
                    'email' => $donator->email,
                    'phone' => $donator->phone,
                    'pwd' => $donator->pwd,
                ];
            } else {
                $query = 'update `donator` 
                          set `first_name` = :fn, `second_name` = :sn, `email` = :email, `phone` = :phone
                          where `_id` = :id';
                $stmt = $this->pdo->prepare($query);
                $data = [
                    'id' => $donator->id,
                    'fn' => $donator->fn,
                    'sn' => $donator->sn,
                    'email' => $donator->email,
                    'phone' => $donator->phone
                ];
            }   
            
            $stmt->execute($data);
            return 'OK';
        }
        return 'ERR';
    }

    public function authetication($id) {
        $query = 'update `donator` 
                  set `isAuth` = 1
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $id
        ];
        $stmt->execute($data);
        return 'OK';
    }
}


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
    
    /**
     * Costruttire
     */
    public function __construct(){
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }
/**
     * Funzione che cerca una struttura ospedalieradata una mail
     * @param string $email della struttura ospedaliera
     * @param int $id da utilizzare in caso si modifichino i dati dell'utente per controllare tutte la mail tranne la sua
     * @return array contenente i dati della struttura ospedaliera
     */
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
    
    /**
     * Funzione che rende tutte le strutture ospedaliere
     * @return array
     */
    public function getAll(){
        $query = 'select H.*, C.`name` as cName, R.`name` as rName 
                  from `hospital` H
                  join `city` C on C.`_id` = H.`city_`
                  join `region` R on R.`_id` = C.`region_`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * Funzione che rende il numero di strutture ospedaliere
     * @return array contente il numero
     */
    public function getTot(){
        $query = 'select count(0) as QTA 
                  from `hospital`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * Funzione per aggiungere una nuova struttura ospedaliera
     * @param Hospital $hospital con tutti i dati 
     * @return string esito dell'operazione
     */
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

    /**
     * Funzione per aggiornare i dai di una struttura ospedaliera
     * @param Hospital $hospital con i nuovi dati
     * @param boolean $isPassword in caso vada modificata anche la password
     * @return string con l'esito
     */
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

    /**
     * Funzione per autenticare la struttura
     * @param int $id della struttura
     */
    public function authetication($id) {
        $query = 'update `hospital`
                  set `isAuth` = 1
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $id,
        ];
        $stmt->execute($data);
    }
}


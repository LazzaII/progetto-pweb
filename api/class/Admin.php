<?php
# import Database class
require_once __DIR__ . '/Database.php';

# class User
class Admin {
    private $pdo;
    public $id;
    public $fn;
    public $sn;
    public $type;
    public $email;
    public $pwd;
    /**
     * Costruttore
     */
    public function __construct(){
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }

    /**
     * Funzione per trovare un utente dalla mail
     * @param string $email
     * @param int $id in caso si vuole modificare i dati si controlla che l'utente sia lo stesso tramite l'id
     * @return array contente i dati dell'utente
     */
    public function findFromEmail($email, $id = null){
        if($id == null){
            $query = 'select * 
                      from `admin` 
                        where `email` = :email';
            $stmt = $this->pdo->prepare($query);
            $data = [
                'email' => $email
            ];
        } else {
            $query = 'select * 
                      from `admin` 
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
     * Funzione per prendere tutti gli amministratori
     * @return array contenente tutti i dati
     */
    public function getAll(){
        $query = 'select * 
                  from `admin`
                  where `type` <> 0';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * Funzione per aggiungere un amministratore
     * @param Admin $admin contenente tutti i dati
     * @return string contenente il risultato dell'operazione (ERR email già usata - OK inserito correttamente)
     */
    public function add($admin) {
        if(empty(self::findFromEmail($admin->email))) {
            $query = 'insert into `admin` (`first_name`, `second_name`, `email`, `hash_pwd`)
                      values (:fn, :sn, :email, :pwd)';
            $stmt = $this->pdo->prepare($query);
            $data = [
                'fn' => $admin->fn,
                'sn' => $admin->sn,
                'email' => $admin->email,
                'pwd' => $admin->pwd
            ];
            $stmt->execute($data);
            return 'OK';
        }
        return 'ERR';
    }

    /**
     * Funzione per eliminare un amministratore
     * @param int $id dell'admin da eliminare
     * @return string
     */
    public function delete($id) {
        $query = 'delete from `admin` 
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $id
        ];
        $stmt->execute($data);
        return 'OK';
    }
    /**
     * Funzione per aggiornare i dati dell'amministratore
     * @param Admin $admin contenente i dati
     * @param boolean $isPassword true se deve modificare anche la password, false altrimenti
     * @return string contenente il risultato dell'operazione (ERR email già in uso)
     */
    public function update($admin, $isPassword = false) {
        if (empty(self::findFromEmail($admin->email, $admin->id))) {
            if($isPassword){
                $query = 'update `admin` 
                          set `first_name` = :fn, `second_name` = :sn, `email` = :email, `hash_pwd` = :pwd
                          where `_id` = :id';
                $stmt = $this->pdo->prepare($query);
                $data = [
                    'id' => $admin->id,
                    'fn' => $admin->fn,
                    'sn' => $admin->sn,
                    'email' => $admin->email,
                    'pwd' => $admin->pwd
                ];
            }
            else {
                $query = 'update `admin` 
                          set `first_name` = :fn, `second_name` = :sn, `email` = :email
                          where `_id` = :id';
                $stmt = $this->pdo->prepare($query);
                $data = [
                    'id' => $admin->id,
                    'fn' => $admin->fn,
                    'sn' => $admin->sn,
                    'email' => $admin->email
                ];
            }
            $stmt->execute($data);
            return 'OK';
        }
        return 'ERR';
    }
}


<?php
# import Database class
require_once __DIR__ . '/Database.php';

# class User
class Message {
    private $pdo;
    public $id;
    public $obj;
    public $body;
    public $fn;
    public $sn;
    public $email;
    
    public function __construct(){
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }

    public function getAll(){
        $query = 'select * from `message`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function add($message) {
        $query = 'insert into `message` (`object`, `body`, `first_name`, `second_name`, `email`)
                  values (:obj, :body, :fn, :sn, :email)';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'obj' => $message->obj,
            'body' => $message->body,
            'fn' => $message->fn,
            'sn' => $message->sn,
            'email' => $message->email,
        ];
        $stmt->execute($data);
    }

    public function delete($id) {
        $query = 'delete from `message` 
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $id
        ];
        $stmt->execute($data);
    }
}


<?php
# import Database class
require_once __DIR__ . '/Database.php';

# class User
class Request {
    private $pdo;
    public $id;
    public $date;
    public $blood_type;
    public $quantity;
    public $hospital;
    public $site;
    public $isPending;
    
    public function __construct(){
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }

    public function getAll(){
        $query = 'select * from `blood_request`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function add($request) {
        $query = "insert into `blood_request` 
                  values (current_date(), :bt, :qta, :hospital, :site)";
        $stmt = $this->pdo->prepare($query);
        $data = [
            'bt' => $request->bt,
            'qta' => $request->qta,
            'hospital' => $request->hospital,
            'site' => $request->site,
        ];
        $stmt->execute($data);
        return 'OK';
    }

    public function remove($id) {
        $query = 'delete from `blood_request` 
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $id
        ];
        $stmt->execute($data);
        return 'OK';
    }

    // vedere se implementarla perchè c`è da fare check su disponibità
    public function update($request) { 
        $query = 'update `blood_request` 
                  set `blood_type` = :bt, `quantity` = :qta, `site_` = :site
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            `id` => $request->id,
            'bt' => $request->bt,
            'qta' => $request->qta,
            'site' => $request->site
        ];
        $stmt->execute($data);
        return 'OK';
    }

    public function accept($id, $value) { //val = 1 accepted, 2 not accepted by admin
        $query = 'update `blood_request`
                  set `isPending` = :val 
                  where `_id` = :id ';
        $stmt = $this->pdo->prepare($query);
        $data = [
            `id` => $id,
            `val` => $value
        ];
        $stmt->execute($data);
        return 'OK';
    }


}


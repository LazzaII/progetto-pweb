<?php
# import del database
require_once __DIR__ . '/Database.php';

class Request {
    private $pdo;
    public $id;
    public $date;
    public $blood_type;
    public $quantity;
    public $hospital;
    public $site;
    public $time;
    public $cost;
    public $isPending;
    
    //costruttore
    public function __construct(){
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }

    // funzione per prendere tutte le richieste
    public function getAll(){
        $query = 'select * from `blood_request`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function getOne($id) {
        $query = 'select * 
                  from `blood_request`
                  where _id = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $id
        ];
        $stmt->execute($data);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    //funzione per prendere le richieste di una sola SO
    public function getFromHospital($hospital){
        $query = 'select B.*, C.`name`
                  from `blood_request` B
                  join `site` S on S.`_id` = B.`site_`
                  join `city` C ON C.`_id` = S.`city_`
                  where `hospital_` = :hospital';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'hospital' => $hospital
        ];
        $stmt->execute($data);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    // funzione per aggiungere una richiesta di sangue
    public function add($request) {
        $query = "insert into `blood_request` (`date`, `blood_type`, `quantity`, `hospital_`, `site_`, `deliveryTime`, `cost`)
                  values (current_date(), :bt, :qta, :hospital, :site, :dt, :cost)";
        $stmt = $this->pdo->prepare($query);
        $data = [
            'bt' => $request->blood_type,
            'qta' => $request->quantity,
            'hospital' => $request->hospital,
            'site' => $request->site,
            'dt' => $request->time,
            'cost' => $request->cost,
        ];
        $stmt->execute($data);
        return 'OK';
    }

    // funzione per eliminare una richiesta di sangeu
    public function delete($id) {
        $query = 'delete from `blood_request` 
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $id
        ];
        $stmt->execute($data);
        return 'OK';
    }

    // funzione lato admin che accetta la richiesta di sangue
    public function accept($id, $value) { //val = 1 accepted, 2 not accepted by admin
        $query = 'update `blood_request`
                  set `isPending` = :val 
                  where `_id` = :id ';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $id,
            'val' => $value
        ];
        $stmt->execute($data);
        
        if($value == 2) { //liberare le sacche se viene annullato l'ordine
            require_once __DIR__ . '/class/Donation.php';
            $donation = new Donation();
            
            $req = self::getOne($id);
            for ($i = 0; $i < $req['quantity']; $i++) 
                $donation->deUse($req['site_'], $req['blood_type']);
        }
    }
}


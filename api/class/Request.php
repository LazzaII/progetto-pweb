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
    
    /**
     * Costruttore
     */
    public function __construct(){
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }

    /**
     * Funzione per prendere tutte le richieste
     * @return array contenente i dati di tutte le richieste
     */
    public function getAll() {
        $query = 'select B.*, C.`name` as cName, H.`name` as hName
                  from `blood_request` B
                  join `site` S on S.`_id` = B.`site_`
                  join `city` C on C.`_id` = S.`city_`
                  join `hospital` H on H.`_id` = B.`hospital_`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * Funzione per prendere una richiesta specifica
     * @param int $id della richiesta
     * @return array contenente i dati della richiesta
     */
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

    /**
     * Funzione per prendere le richieste di una struttura ospedaliera
     * @param int $hospital id della struttura ospedaliera
     * @return array contente le richieste
     */
    public function getFromHospital($hospital) {
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

    /**
     * Funzione per sapere il numero di richieste urgenti
     * @return array contenente il numero di richieste
     */
    public function getUrgent() {
        $query = 'select count(0) as QTA
                  from `blood_request` B
                  where `cost` = 0'; 
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * Funzione per sapere il numero di richieste non urgenti
     * @return array contenente il numero di richieste
     */
    public function getNotUrgent() {
        $query = 'select count(0) as QTA
                  from `blood_request` B
                  where `cost` <> 0'; 
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * Funzione per aggiungere una richiesta
     * @param Request $request con i dati della richiesta
     */
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
    }

    /**
     * Funzione per eliminare una richiesta
     * @param int $id della richiesta
     * @return string
     */
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

    /**
     * Funzione per accettare (o non accettare) una richiesta
     * @param int $id della richiesta
     * @param mixed $value 1 se accetta, 2 se rigetta
     */
    public function accept($id, $value) { //val = 1 accetta, 2 rigettata
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
            require_once __DIR__ . '/Donation.php';
            $donation = new Donation();
            
            $req = self::getOne($id);
            for ($i = 0; $i < $req['quantity']; $i++) 
                $donation->deUse($req['site_'], $req['blood_type']);
        }
    }
}


<?php
require_once __DIR__ . '/Database.php';

class Donation {
    private $pdo;
    public $id;
    public $date;
    public $donator;
    public $site;
    public $isUsed;

    /**
     * costruttore 
     */
    public function __construct() {
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }

    /**
     * Funzione che rende  i magazzini che non hanno un certo tipo di sague
     * @param string $type stringa contenente il tipo di sangue da ricercare
     * @return array array contenente l'id dei magazzini
     */
    public function empyByType($type) {
        $query = 'select S.`_id` as site
                  from `site` S 
                  where S.`_id` not in ( select D1.`site_` 
                                         from `donation` D1 
                                         join `donator` D2 on D2.`_id` = D1.`donator_` 
                                         join `site` S2 on S2.`_id` = D1.`site_` 
                                         join `city` C on C.`_id` = S2.`city_` 
                                         join `region` R on R.`_id` = C.`region_` 
                                         where D2.`blood_group` = :type 
                                            and D1.`isUsed` = 0 
                                         group by D1.`site_`);';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'type' => $type
        ];
        $stmt->execute($data);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * Funzione per controllare la disponibilità di un determinato sangue
     * @param string $type stringa contenente il tipo di sangue
     * @return array contenente i magazzini ordinati in ordine crescente
     */
    public function availabilityType($type) { 
        $query = 'select D1.`site_` as site, count(0) as QTA, C.`_id` as cId, C.`name` as cName, C.`lat`, C.`lng`, R.`_id` as rId, R.`name` as rName
                  from `donation` D1
                  join `donator` D2 on D2.`_id` = D1.`donator_` 
                  join `site` S on S.`_id` = D1.`site_`
                  join `city` C on C.`_id` = S.`city_`
                  join `region` R on R.`_id` = C.`region_`
                  where D2.`blood_group` = :type
                    and D1.`isUsed` = 0
                  group by D1.`site_`
                  order by QTA asc';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'type' => $type
        ];
        $stmt->execute($data);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * Funzione per controllare se il donatore può donare
     * @param int $donator id del donatore
     * @return array contente un result set con 0, serve solo per sapere se la query da risultato o no
     */
    public function canDonate($donator){
        $query = 'select 0 
                  from `donation` 
                  where donator_ = :donator 
                    and date > current_date() - interval 3 month';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'donator' => $donator
        ];
        $stmt->execute($data);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * Funzione per prendere tutte le donazioni date un donatore
     * @param int $id del donatore
     * @return array contenente tutte le donazioni effettuate
     */
    public function getAll($id){
        $query = 'select D.`date`, D.`isUsed`, C.`name` as city, S.`_id` as id
                  from `donation` D
                  join `site` S on S.`_id` = D.`site_` 
                  join `city` C on C.`_id` = S.`city_`
                  where D.`donator_` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $id
        ];
        $stmt->execute($data);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * Funzione per sapere quante sacche sono state utilizzate
     * @return int contente il numero di sacche
     */
    public function getTotUsed(){
        $query = 'select count(0) as QTA 
                  from `donation`
                  where `isUsed` = 1';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * Funzione per sapere quante non sacche sono state utilizzate
     * @return int contente il numero di sacche
     */
    public function getTotNotUsed(){
        $query = 'select count(0) as QTA 
                  from `donation`
                  where `isUsed` = 0';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * Funzione per aggiungere una nuova donazione
     * @param Donation $donation da aggiungere
     * @return string contente il risultato dell'operazione (ERR non può donare - OK donazione andata a buon fine)
     */
    public function add($donation) {
        if(empty(self::canDonate($donation->donator))) {   
            $query = "insert into `donation` (`date`, `donator_`, `site_`)
                      values (current_date(), :donator, :site)";
            $stmt = $this->pdo->prepare($query);
            $data = [
                'donator' => $donation->donator,
                'site' => $donation->site,
            ];
            $stmt->execute($data);
            return 'OK';
        }
        return 'ERR';
    }

    /**
     * Funzione per sapere qual'è la prima donazione libera da utilzzare in una richiesta
     * @param int $site id del magazzino
     * @param string $type tipo di sangue
     * @return array contenente l'id del risultato
     */
    public function getFirstFree($site, $type) {
        $query = 'select D1.`_id`
                  from `donation` D1
                  join `donator` D2 on D2.`_id` = D1.`donator_`
                  where `isUsed` = 0
                    and `site_` = :site
                    and `blood_group` = :type
                  order by `date` asc
                  limit 1';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'site' => $site,
            'type' => $type
        ];
        $stmt->execute($data);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * Funzione per "usare" una sacca di sangue
     * @param int $site sito in cui vedere la prima sacca libera
     * @param string $type tipo di sangue da utilizzare
     */
    public function use($site, $type) {
        $query = 'update `donation`
                  set `isUsed` = 1
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => self::getFirstFree($site, $type)['_id'] // prende la prima donazione non usata
        ];
        $stmt->execute($data);
    }

    /**
     * Funzione per sapere qual'è la prima donazione occupata da rimuovere nella richiesta
     * @param int $site id del magazzino
     * @param string $type tipo di sangue
     * @return array contenente l'id del risultato
     */
    public function getFirstUsed($site, $type) {
        $query = 'select D1.`_id`
                  from `donation` D1
                  join `donator` D2 on D2.`_id` = D1.`donator_`
                  where `isUsed` = 1
                    and `site_` = :site
                    and `blood_group` = :type
                  order by `date` asc
                  limit 1';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'site' => $site,
            'type' => $type
        ];
        $stmt->execute($data);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    /**
     * Funzione per non utilizzare più una sacca
     * @param mixed $site da quale sito ricercare
     * @param mixed $type tipo di sangue da ricercare
     */
    public function deUse($site, $type) {
        $query = 'update `donation`
                  set `isUsed` = 0
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => self::getFirstUsed($site, $type)['_id'] // prende la prima donazione usata
        ];
        $stmt->execute($data);
    }

    
}


<?php
# import Database class
require_once __DIR__ . '/Database.php';

# class User
class Donation {
    private $pdo;
    public $id;
    public $date;
    public $donator;
    public $site;
    public $isUsed;
    
    public function __construct(){
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }

    public function availabilityTypeSite($site, $bt) { // to check stock availability of specific blood type in a specific site
        $query = 'select count(0) as QTA
                  from `donation` D1
                  join `donator` D2 on D2.`_id` = D1.`donator_` 
                  where D1.`_site_` = :site 
                    and D2.`blood_group` = :bt 
                    and D1.`isUsed` = 0';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'site' => $site,
            'bt' => $bt
        ];
        $stmt->execute($data);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function availabilitySite($site) { // to check stock availability of a specific site
        $query = 'select `blood_type`, count(0) as QTA
                  from `donation` 
                  join `donator` D2 on D2.`_id` = D1.`donator_` 
                  where D1.`_site_` = :site
                    and D1.`isUsed` = 0
                  group by D2.`blood_type`';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'site' => $site
        ];
        $stmt->execute($data);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function availabilityType($type) { // to check stock availability of specific blood type
        $query = 'select `blood_type`, count(0) as QTA
                  from `donation` 
                  join `donator` D2 on D2.`_id` = D1.`donator_` 
                  where D2.`blood_type` = :type
                    and D1.`isUsed` = 0
                  group by D1.`_site_`';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'type' => $type
        ];
        $stmt->execute($data);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function canDonate($donator){
        $query = 'select 0 
                  from `donation` 
                  where _donator_ = :donator 
                    and _date > current_date() - interval 3 month';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'donator' => $donator
        ];
        $stmt->execute($data);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function getAll(){
        $query = 'select * 
                  from `donation`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function add($donation) {
        if(empty(self::canDonate($donation->donator))) {   
            $query = "insert into `donation` (`_date`, `_donator_`, `_city_`)
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

    public function getFirstFree($site) {
        $query = 'select `_id`
                  from `donation` 
                  where `isUsed` = 0
                    and `site_` = :site
                  order by `date` asc';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'site' => $site
        ];
        $stmt->execute($data);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function use($site) {
        $query = 'update `donation`
                  set `isUsed` = 1
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => self::getFirstFree($site) // use the first available to donate
        ];
        $stmt->execute($data);
    }

    
}


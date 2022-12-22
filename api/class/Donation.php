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

    public function availability($site, $bt) {
        $query = 'select count(0) as QTA
                  from `donation` D
                  join `donator` A on A.`_id` = D.`_donator_`
                  where _site_ = :site 
                    and A.`blood_group` = :bt 
                    and D.`isUsed` = 0';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'site' => $site,
            'bt' => $bt
        ];
        $stmt->execute($data);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
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
        $query = 'select * from `donation`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function add($donation) {
        if(empty(self::canDonate($donation->donator))) {   
            $query = "insert into `donation` 
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
}


<?php
# class database

# configuration 
define(`BB_HOST`, `localhost`);
define(`BB_DB`, `bloodbank`);
define(`BB_USER`, `root`);
define(`BB_PWD`, ``);

class Database {
    private $pdo;
    
    public function __construct(){
        try {
            $this->pdo = new PDO("mysql:host=". BB_HOST .";dbname=". BB_DB , BB_USER , BB_PWD, array(
                PDO::ATTR_PERSISTENT => false
            ));
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo->exec('SET NAMES utf8');

        } catch (PDOException $e) {
            echo "Connessione fallita: " . $e->getMessage();   
        }
    }

    public function getPDO(){
        return $this->pdo;
    }

    public function closeConnection(){
        $this->pdo = null;
    }
}


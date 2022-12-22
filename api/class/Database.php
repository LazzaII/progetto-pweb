<?php

/*
$body = file_get_contents("php://input"); //get the body
$decodeBody = json_decode($body);

potrebbe servire per prendere i dati nella post invece di usare $_POST['...']
*/

require_once __DIR__.'/../include/config.inc.php';

# class database
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


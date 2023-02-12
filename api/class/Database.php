<?php
require_once __DIR__.'/../include/config.inc.php';

# class database
class Database {
    private $pdo;
    
    /**
     * Costruttore per il collegamento al db
     */
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

    /**
     * Funzione che rende il collegamento al db
     * @return PDO collegamento al database
     */
    public function getPDO(){
        return $this->pdo;
    }
}


<?php
# MANCA GESTIONE DELL'IMMAGINE

# database class
require_once "class/Database/php";

# check for correct method - accepted only post request
$method = $_SERVER["REQUEST_METHOD"];
$con = new Database();

switch($method) {
    case 'GET': # get all the news 
        $query = "select * from `news`";
        $stmt = $con->getPDO()->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        
        break;
    case 'POST': # write of new news
        $query = "insert into  `news` values (:title, ;text, ;img, :author)";
        $stmt = $con->getPDO()->prepare($query);
        $data = [
            'title' => $_POST["title"],
            `text` => $_POST["text"],
            `img` => $_POST["img"],
            `author` => $_POST["author"]
        ];
        $stmt->execute($data);

        break;
    case 'DELETE': # delete of a message
        $substringedURI = explode('/', $_SERVER["REQUEST_URI"]); # to get the id
        $query = "delete from `news` N where N._id = :id";
        $stmt = $con->getPDO()->prepare($query);
        $data = [
            `id` => $substringedURI[count($substringedURI)-1]
        ];
        $stmt->execute($data);

        break;
    case 'PUT': # update news
        $substringedURI = explode('/', $_SERVER["REQUEST_URI"]); # to get the id
        $query = "update `news` set title = :title, body = :text where _id = :id";
        $stmt = $con->getPDO()->prepare($query);
        $data = [
            'title' => $_POST["title"],
            `text` => $_POST["text"],
            `id` => $substringedURI[count($substringedURI)-1]
        ];
        $stmt->execute($data);

        break;
    default:
        $response = 'incorrect method';
        echo($response);
        break;
}
$con->closeConnection();


<?php
# database class
require_once "class/Database/php";

# check for correct method - accepted only post request
$method = $_SERVER["REQUEST_METHOD"];
$con = new Database();

switch($method) {
    case 'GET': # get all the message sent
        $query = "select * from `message`";
        $stmt = $con->getPDO()->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        break;
    case 'POST': # write of new message
        $query = "insert into  `message` values (:obj, ;text, ;fs, :sn, :email)";
        $stmt = $con->getPDO()->prepare($query);
        $data = [
            'obj' => $_POST["obj"],
            `text` => $_POST["text"],
            `fs` => $_POST["fs"],
            `sn` => $_POST["sn"],
            `email` => $_POST["email"]
        ];
        $stmt->execute($data);
        break;
    case 'DELETE': # delete of a message
        $substringedURI = explode('/', $_SERVER["REQUEST_URI"]); # to get the id
        $query = "delete from `message` M where M._id = :id";
        $stmt = $con->getPDO()->prepare($query);
        $data = [
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


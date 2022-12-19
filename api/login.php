<?php

# DA FINIRE MANCA COME METTERE I COOKIE PER IL LOGIN O SE USARE LA SESSIONE DI PHP ANCHE SE NON HA SENSO

# database class
require_once "class/Database/php";

# check for correct method - accepted only post request
$method = $_SERVER["REQUEST_METHOD"];

if($method == `POST`) {
    $con = new Database;
    # choose account
    $type = $_POST["acc_type"];
    switch($type){
        case `A`:
            $query = "select A.`pwd `into from `admin` A where A.`email` = :email";
            $stmt = $con->getPDO()->prepare($query);
            $data = [
                `email` => $_POST["email"],
            ];
            $stmt->execute($data);
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            if(empty($result)) {
                $response = "account doesn't exist";
            } else {
                if(password_verify($_POST["pwd"], $response["hash_pwd"])) {
                    # DA FINIRE LOGIN
                }
                else $response = "inccorect password";
            }
            
            break;
        case `D`:
            $query = "select D.`pwd `into from `donator` D where D.`email` = :email";
            $stmt = $con->getPDO()->prepare($query);
            $data = [
                `email` => $_POST["email"],
            ];
            $stmt->execute($data);
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            if(empty($result)) {
                $response = "account doesn't exist";
            } else {
                if(password_verify($_POST["pwd"], $response["hash_pwd"])) {
                    # DA FINIRE LOGIN
                }
                else $response = "inccorect password";
            }

            break;
        case `H`;
            $query = "select H.`pwd `into from `hospital` H where H.`email` = :email";
            $stmt = $con->getPDO()->prepare($query);
            $data = [
                `email` => $_POST["email"],
            ];
            $stmt->execute($data);
            $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            if(empty($result)) {
                $response = "account doesn't exist";
            } else {
                if(password_verify($_POST["pwd"], $response["hash_pwd"])) {
                    # DA FINIRE LOGIN
                }
                else $response = "inccorect password";
            }

            break;
        default:
            $response = 'inccorect account type';
    }
    $con->closeConnection();
} else {
    $response = 'inccorect method';
}

#response
echo($response);
?>
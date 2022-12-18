<?php
# database class
require_once "include/Database/php";

# check for correct method - accepted only post request
$method = $_SERVER["REQUEST_METHOD"];

if($method == `POST`) {
    $con = new Database;
    # choose account
    $type = $_POST["acc_type"];
    switch($type){
        case `A`:
            $query = "insert into `admin` values (:fs, :sn, :type, :email, :pwd)";
            $stmt = $con->getPDO()->prepare($query);
            $data = [
                `fs` => $_POST["fs"],
                `sn` => $_POST["sn"],
                `type` => $_POST["admin_type"],
                `email` => $_POST["email"],
                `pwd` => password_hash($_POST["pwd"], PASSWORD_DEFAULT)
            ];
            $stmt->execute($data);
            $response = 'admin insert correctly';

            break;
        case `D`:
            $query = "insert into `donator` values (:fs, :sn, :email, :phone, :pwd, :blood, :addr, :city)";
            $stmt = $con->getPDO()->prepare($query);
            $data = [
                `fs` => $_POST["fs"],
                `sn` => $_POST["sn"],
                `email` => $_POST["email"],
                `phone` => $_POST["phone"],
                `pwd` => password_hash($_POST["pwd"], PASSWORD_DEFAULT),
                `blood` => $_POST["blood"],
                `addr` => $_POST["address"],
                `city` => $_POST["city"],
            ];
            $stmt->execute($data);
            $response = 'donator insert correctly';

            break;
        case `H`;
            $query = "insert into `hospital` values (:name, :email, :phone, :pwd, :addr, :city)";
            $stmt = $con->getPDO()->prepare($query);
            $data = [
                `name` => $_POST["name"],
                `email` => $_POST["email"],
                `phone` => $_POST["phone"],
                `pwd` => password_hash($_POST["pwd"], PASSWORD_DEFAULT),
                `addr` => $_POST["address"],
                `city` => $_POST["city"],
            ];
            $stmt->execute($data);
            $response = 'hospital insert correctly';

            break;
        default:
            $response = `inccorect account type`;
    }
} else {
    $response = 'inccorect method';
}

#response
echo($response);


?>

<?php
# database class
require_once "include/Database/php";

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
            $response = 'admin insert correctly';

            break;
        case `D`:
            $query = "insert into `donator` values (:fs, :sn, :email, :phone, :pwd, :blood, :addr, :city)";
            $stmt = $con->getPDO()->prepare($query);
            $data = [
                `fs` => $_POST["fs"],
                `sn` => $_POST["sn"],
                `email` => $_POST["email"],
                `phone` => $_POST["phone"],
                `pwd` => password_hash($_POST["pwd"], PASSWORD_DEFAULT),
                `blood` => $_POST["blood"],
                `addr` => $_POST["address"],
                `city` => $_POST["city"],
            ];
            $stmt->execute($data);
            $response = 'donator insert correctly';

            break;
        case `H`;
            $query = "insert into `hospital` values (:name, :email, :phone, :pwd, :addr, :city)";
            $stmt = $con->getPDO()->prepare($query);
            $data = [
                `name` => $_POST["name"],
                `email` => $_POST["email"],
                `phone` => $_POST["phone"],
                `pwd` => password_hash($_POST["pwd"], PASSWORD_DEFAULT),
                `addr` => $_POST["address"],
                `city` => $_POST["city"],
            ];
            $stmt->execute($data);
            $response = 'hospital insert correctly';

            break;
        default:
            $response = 'inccorect account type';
    }
} else {
    $response = 'inccorect method';
}

#response
echo($response);
?>
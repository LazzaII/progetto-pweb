<?php

require_once __DIR__ . '/class/City.php';
$city = new City();

$method = $_SERVER['REQUEST_METHOD'];


switch($method) {
    case 'GET':
        header("Content-Type: application/json");
        if(isset($_GET['id'])) {
            $js_encode = json_encode($city->getOne($_GET['id']), true);
        } else {
            $allCity = $city->getFromRegion($_GET['region']);
            $js_encode = json_encode($allCity, true);
        }
        echo($js_encode);
            
        break;
    default:
        http_response_code(405); // metodo non riconosciuto
}
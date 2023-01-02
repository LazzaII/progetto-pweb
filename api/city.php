<?php

require_once __DIR__ . '/class/City.php';
$city = new City();

$method = $_SERVER['REQUEST_METHOD'];


switch($method) {
    case 'GET':
        $allCity = $city->getAll();
        $js_encode = json_encode($allCity, true);
        header("Content-Type: application/json");
        echo($js_encode);
            
        break;
    default:
        http_response_code(405); // method error
}
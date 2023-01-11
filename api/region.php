<?php

require_once __DIR__ . '/class/Region.php';
$region = new Region();

$method = $_SERVER['REQUEST_METHOD'];


switch($method) {
    case 'GET':
        $allRegion = $region->getAll();
        $js_encode = json_encode($allRegion, true);
        header("Content-Type: application/json");
        echo($js_encode);
            
        break;
    default:
        http_response_code(405); // method error
}
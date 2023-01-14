<?php

$method = $_SERVER['REQUEST_METHOD'];

if($_COOKIE['login'] == 'logged-a'){ // solo gli admin possno accedere a queste API 
    switch($method) {
        case 'GET':
            switch ($_GET['type']) {
                case 'D':
                    require_once __DIR__ . '/class/Donator.php';
                    $donator = new Donator();
                    $allD = $donator->getAll();
                    $js_encode = json_encode($allD, true);
                    header("Content-Type: application/json");
                    echo($js_encode);
                    
                    break;
                case 'H':
                    require_once __DIR__ . '/class/Hospital.php';
                    $hospital = new Hospital();
                    $allD = $hospital->getAll();
                    $js_encode = json_encode($allD, true);
                    header("Content-Type: application/json");
                    echo($js_encode);
                    
                    break;    
                    
                default:
                    require_once __DIR__ . '/class/Admin.php';
                    $admin = new Admin();
                    $allD = $admin->getAll();
                    $js_encode = json_encode($allD, true);
                    header("Content-Type: application/json");
                    echo($js_encode);
                
                    break;
            }

            break;
        case 'PUT':
            $body = file_get_contents("php://input"); // prende il body
            $decodeBody = json_decode($body);
            
            switch ($decodeBody->type) {
                case 'D':
                    require_once __DIR__ . '/class/Donator.php';
                    $donator = new Donator();
                    $donator->authetication($decodeBody->id);
                                
                    break;
                case 'H':
                    require_once __DIR__ . '/class/Hospital.php';
                    $hospital = new Hospital();
                    $hospital->authetication($decodeBody->id);
                    
                    break;    
            }

            break;
        case 'DELETE':
            $body = file_get_contents("php://input"); // prende il body
            $decodeBody = json_decode($body);
            
            switch ($decodeBody->type) {
                case 'D':
                    require_once __DIR__ . '/class/Donator.php';
                    $donator = new Donator();
                    $donator->delete($decodeBody->id);
                    
                    break;
                case 'H':
                    require_once __DIR__ . '/class/Hospital.php';
                    $hospital = new Hospital();
                    $hospital->delete($decodeBody->id);
                    echo($js_encode);
                    
                    break;    
                default:
                    require_once __DIR__ . '/class/Admin.php';
                    $admin = new Admin();
                    $admin->delete($decodeBody->id);
                    
                    break;
            }   
            break;
        
        default:
            http_response_code(405); // metodo non riconosciuto per questa api
    }
} 
else
    http_response_code(401); // non autorizzato
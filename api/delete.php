<?php

$method = $_SERVER['REQUEST_METHOD'];

if($_COOKIE['login'] == 'logged') {// only logged account can delete account
    switch($method) {
        case 'DELETE':
            $body = file_get_contents("php://input"); //get the body
            $decodeBody = json_decode($body);
            $type = $decodeBody->type;
            
            switch($type){
                case 'D':
                    require_once __DIR__ . '/class/Donator.php';
                    $donator = new Donator();
                    $donator->delete($_COOKIE['id']);
                    
                    break;
                case 'H':
                    require_once __DIR__ . '/class/Hospital.php';
                    $hospital = new Hospital();
                    $hospital->delete($_COOKIE['id']);
                    
                    break;
                default:
                    require_once __DIR__ . '/class/Admin.php';
                    $admin = new Admin();
                    $admin->delete($_COOKIE['id']);
                }
                    
            break;
        default:
            http_response_code(405); // method error
    }
}
else 
    http_response_code(401); // Unauthorized

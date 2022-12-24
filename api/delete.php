<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'DELETE':
        $body = file_get_contents("php://input"); //get the body
        $decodeBody = json_decode($body);
        $type = $decodeBody->type;

        switch($type){
            case 'D':
                require_once __DIR__ . '/class/Donator.php';
                $donator = new Donator();
                $donator->remove($decodeBody->id);

                break;
            case 'H':
                require_once __DIR__ . '/class/Hospital.php';
                $hospital = new Hospital();
                $hospital->remove($decodeBody->id);

                break;
            default:
                require_once __DIR__ . '/class/Admin.php';
                $admin = new Admin();
                $admin->remove($decodeBody->id);
        }

        break;
    default:
        http_response_code(405); # method error
}
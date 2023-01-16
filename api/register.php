<?php

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'POST':
        $body = file_get_contents("php://input"); // prende il contenuto del body
        $decodeBody = json_decode($body);
        $type = $decodeBody->type;

        switch($type){
            case 'D':
                require_once __DIR__ . '/class/Donator.php';
                $donator = new Donator();

                $donator->fn = $decodeBody->fn;
                $donator->sn = $decodeBody->sn;
                $donator->email = $decodeBody->email;
                $donator->phone = $decodeBody->phone;
                $donator->pwd = password_hash($decodeBody->pwd, PASSWORD_DEFAULT);
                $donator->blood = $decodeBody->blood;

                if($donator->add($donator) == 'ERR') 
                    http_response_code(409); # conflitto (email già in uso)

                break;
            case 'H':
                require_once __DIR__ . '/class/Hospital.php';
                $hospital = new Hospital();

                $hospital->name = $decodeBody->name;
                $hospital->email = $decodeBody->email;
                $hospital->phone = $decodeBody->phone;
                $hospital->pwd = password_hash($decodeBody->pwd, PASSWORD_DEFAULT);
                $hospital->addr = $decodeBody->addr;
                $hospital->city = $decodeBody->city;

                if($hospital->add($hospital) == 'ERR')
                    http_response_code(409); # conflitto (email già in uso)

                break;
            default: # se non è un donatore o una struttura ospedaliera è un admin
                require_once __DIR__ . '/class/Admin.php';
                $admin = new Admin();

                $admin->fn = $decodeBody->fn;
                $admin->sn = $decodeBody->sn;
                $admin->email = $decodeBody->email;
                $admin->pwd = password_hash($decodeBody->pwd, PASSWORD_DEFAULT);

                if($admin->add($admin) == 'ERR')
                    http_response_code(409); # conflitto (email già in uso)
                
                break;
        }

        break;
    default:
        http_response_code(405); # metodo non riconosciuto
}
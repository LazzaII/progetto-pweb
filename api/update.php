<?php

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'PUT':
        $body = file_get_contents("php://input"); //get the body
        $decodeBody = json_decode($body);
        $type = $decodeBody->type;

        switch($type){
            case 'D':
                require_once __DIR__ . '/class/Donator.php';
                $donator = new Donator();

                $donator->id = $decodeBody->id;
                $donator->fn = $decodeBody->fn;
                $donator->sn = $decodeBody->sn;
                $donator->email = $decodeBody->email;
                $donator->phone = $decodeBody->phone;
                $donator->pwd = password_hash($decodeBody->pwd, PASSWORD_DEFAULT);
                $donator->city = $decodeBody->city;
                if($donator->update($donator) == 'ERR')
                    http_response_code(409); # conflict (email already used)

                break;
            case 'H':
                require_once __DIR__ . '/class/Hospital.php';
                $hospital = new Hospital();

                $hospital->id = $decodeBody->id;
                $hospital->name = $decodeBody->name;
                $hospital->email = $decodeBody->email;
                $hospital->phone = $decodeBody->phone;
                $hospital->pwd = password_hash($decodeBody->pwd, PASSWORD_DEFAULT);
                $hospital->addr = $decodeBody->addr;
                $hospital->city = $decodeBody->city;
                if($hospital->update($hospital) == 'ERR')
                    http_response_code(409); # conflict (email already used)

                break;
            default:
                require_once __DIR__ . '/class/Admin.php';
                $admin = new Admin();

                $admin->id = $decodeBody->id;
                $admin->fn = $decodeBody->fn;
                $admin->sn = $decodeBody->sn;
                $admin->email = $decodeBody->email;
                $admin->pwd = password_hash($decodeBody->pwd, PASSWORD_DEFAULT);
                if($admin->update($admin) == 'ERR')
                    http_response_code(409); # conflict (email already used)
        }

        break;
    default:
        http_response_code(405); # method error
}
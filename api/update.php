<?php

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'PUT':
        $body = file_get_contents("php://input"); // prende il contenuto del body
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
                if($decodeBody->pwd == ''){
                    if($donator->update($donator, false) == 'ERR')
                        http_response_code(409); # conflitto (email già in uso)
                    else { # aggiorna il valore dei cookie
                        setcookie('first', $decodeBody->fn, time() + 3600, '/');
                        setcookie('second', $decodeBody->sn, time() + 3600, '/');
                        setcookie('email', $decodeBody->email, time() + 3600, '/');
                        setcookie('phone', $decodeBody->phone, time() + 3600, '/');
                    } 
                } else {
                    $donator->pwd = password_hash($decodeBody->pwd, PASSWORD_DEFAULT);
                    if($donator->update($donator) == 'ERR')
                        http_response_code(409); # conflitto (email già in uso)
                    else { # aggiorna il valore dei cookie
                        setcookie('first', $decodeBody->fn, time() + 3600, '/');
                        setcookie('second', $decodeBody->sn, time() + 3600, '/');
                        setcookie('email', $decodeBody->email, time() + 3600, '/');
                        setcookie('phone', $decodeBody->phone, time() + 3600, '/');
                    }
                }

                break;
            case 'H':
                require_once __DIR__ . '/class/Hospital.php';
                require_once __DIR__ . '/class/City.php';
                require_once __DIR__ . '/class/Region.php';
                $hospital = new Hospital();

                $hospital->id = $decodeBody->id;
                $hospital->name = $decodeBody->name;
                $hospital->email = $decodeBody->email;
                $hospital->phone = $decodeBody->phone;
                $hospital->addr = $decodeBody->address;
                $hospital->city = $decodeBody->city;
                if($decodeBody->pwd == ''){
                    if($hospital->update($hospital, false) == 'ERR')
                        http_response_code(409); # conflitto (email già in uso)
                    else { # aggiorna il valore dei cookie
                        setcookie('name', $decodeBody->name, time() + 3600, '/');
                        setcookie('city', (new City())->getOne($decodeBody->city)['name'], time() + 3600, '/'); # nome della città
                        setcookie('email', $decodeBody->email, time() + 3600, '/');
                        setcookie('phone', $decodeBody->phone, time() + 3600, '/');
                        setcookie('cityId', $decodeBody->city, time() + 3600, '/');
                        setcookie('address', $decodeBody->address, time() + 3600, '/');
                        setcookie('regionId', (new City())->getOne($decodeBody->city)['region_'], time() + 3600, '/');
                        setcookie('region',  (new Region())->getOne((new City())->getOne($decodeBody->city)['region_'])['name'], time() + 3600, '/');
                    } 
                } else {
                    $hospital->pwd = password_hash($decodeBody->pwd, PASSWORD_DEFAULT);
                    if($hospital->update($hospital) == 'ERR')
                        http_response_code(409); # conflitto (email già in uso)
                    else { # aggiorna il valore dei cookie
                        setcookie('name', $decodeBody->name, time() + 3600, '/');
                        setcookie('city', (new City())->getOne($decodeBody->city)['name'], time() + 3600, '/'); # nome della città
                        setcookie('email', $decodeBody->email, time() + 3600, '/');
                        setcookie('phone', $decodeBody->phone, time() + 3600, '/');
                        setcookie('cityId', $decodeBody->city, time() + 3600, '/');
                        setcookie('address', $decodeBody->address, time() + 3600, '/');
                        setcookie('regionId', (new City())->getOne($decodeBody->city)['region_'], time() + 3600, '/');
                        setcookie('region',  (new Region())->getOne((new City())->getOne($decodeBody->city)['region_'])['name'], time() + 3600, '/');
                    }
                }    

                break;
            default:
                require_once __DIR__ . '/class/Admin.php';
                $admin = new Admin();

                $admin->id = $decodeBody->id;
                $admin->fn = $decodeBody->fn;
                $admin->sn = $decodeBody->sn;
                $admin->email = $decodeBody->email;
                if ($decodeBody->pwd == '') {
                    if($admin->update($admin, false) == 'ERR')
                        http_response_code(409); # conflitto (email già in uso)
                    else { #aggiorna il valore dei cookie
                        setcookie('first', $decodeBody->fn, time() + 3600, '/');
                        setcookie('second', $decodeBody->sn, time() + 3600, '/');
                        setcookie('email', $decodeBody->email, time() + 3600, '/'); 
                    }
                } else {
                    $admin->pwd = password_hash($decodeBody->pwd, PASSWORD_DEFAULT);
                    if($admin->update($admin) == 'ERR')
                        http_response_code(409); # conflitto (email già in uso)
                    else { #aggiorna il valore dei cookie
                        setcookie('first', $decodeBody->fn, time() + 3600, '/');
                        setcookie('second', $decodeBody->sn, time() + 3600, '/');
                        setcookie('email', $decodeBody->email, time() + 3600, '/'); 
                    }    
                }
        }

        break;
    default:
        http_response_code(405); # metodo errato
}
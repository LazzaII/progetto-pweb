<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$method = $_SERVER['REQUEST_METHOD'];

foreach ($_COOKIE as $key => $value) { # to clear cookie both side
    unset($value);
    setcookie($key, '', time() - 3600);
}

switch($method) {
    case 'POST':
        $body = file_get_contents("php://input"); # get the body
        $decodeBody = json_decode($body);
        $type = $decodeBody->type;

        switch($type){
            case 'D':
                require_once __DIR__ . '/class/Donator.php';
                $donator = new Donator();

                $check = $donator->findFromEmail($decodeBody->email);
                if(!empty($check)){
                    if(password_verify($decodeBody->pwd, $check['hash_pwd'])) {
                        require_once __DIR__ . '/class/City.php';

                        setcookie('login', 'logged');
                        setcookie('id', $check['_id']);
                        setcookie('first', $check['first_name']);
                        setcookie('second', $check['second_name']);
                        setcookie('email', $check['email']);
                        setcookie('pwd', $check['hash_pwd']); # da vedere se serve
                        setcookie('blood_group', $check['blood_group']);
                        setcookie('city', (new City())->getOne($check['city_'])['name']); # city name
                        setcookie('cityId', $check['city_']);
                        setcookie('auth', $check['isAuth']);
                    } 
                    else http_response_code(403); # forbidden (password error)
                }    
                else http_response_code(403); # forbidden (email error)            

                break;
            case 'H':
                require_once __DIR__ . '/class/Hospital.php';
                $hospital = new Hospital();

                $check = $hospital->findFromEmail($decodeBody->email);
                if(!empty($check)){
                    if(password_verify($decodeBody->pwd, $check['hash_pwd'])) {
                        require_once __DIR__ . '/class/City.php';

                        setcookie('login', 'logged');
                        setcookie('id', $check['_id']);
                        setcookie('name', $check['name']);
                        setcookie('email', $check['email']);
                        setcookie('phone', $check['phone']);
                        setcookie('pwd', $check['hash_pwd']); # da vedere se serve    
                        setcookie('auth', $check['isAuth']);
                        setcookie('address', $check['address']);
                        setcookie('city', (new City())->getOne($check['city_'])['name']); # city name
                        setcookie('cityId', $check['city_']);
                    } 
                    else http_response_code(403); # forbidden (password error)
                }    
                else http_response_code(403); # forbidden (email error)

                break;
            default: # if is not a donator or hospital is an admin
                require_once __DIR__ . '/class/Admin.php';
                $admin = new Admin();

                $check = $admin->findFromEmail($decodeBody->email);
                if(!empty($check)){
                    if(password_verify($decodeBody->pwd, $check['hash_pwd'])) {
                        require_once __DIR__ . '/class/City.php';

                        setcookie('login', 'logged');
                        setcookie('id', $check['_id']);
                        setcookie('first', $check['first_name']);
                        setcookie('second', $check['second_name']);
                        setcookie('type', $check['type']);
                        setcookie('email', $check['email']); # da vedere se serve
                    } 
                    else http_response_code(403); # forbidden (password error)
                }    
                else http_response_code(403); # forbidden (email error)
        }

        break;
    default:
        http_response_code(405); # method error
}
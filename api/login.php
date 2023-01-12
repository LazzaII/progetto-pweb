<?php

$method = $_SERVER['REQUEST_METHOD'];

foreach ($_COOKIE as $key => $value) { # to clear cookie both side
    unset($value);
    setcookie($key, '', time() - 3600, '/');
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

                        setcookie('login', 'logged', time() + 3600, '/');
                        setcookie('id', $check['_id'], time() + 3600, '/');
                        setcookie('first', $check['first_name'], time() + 3600, '/');
                        setcookie('second', $check['second_name'], time() + 3600, '/');
                        setcookie('email', $check['email'], time() + 3600, '/');
                        setcookie('phone', $check['phone'], time() + 3600, '/');
                        setcookie('blood_group', $check['blood_group'], time() + 3600, '/');
                        setcookie('cityId', $check['city_'], time() + 3600, '/');
                        setcookie('auth', $check['isAuth'], time() + 3600, '/');
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
                        require_once __DIR__ . '/class/Region.php';

                        setcookie('login', 'logged', time() + 3600, '/');
                        setcookie('id', $check['_id'], time() + 3600, '/');
                        setcookie('name', $check['name'], time() + 3600, '/');
                        setcookie('email', $check['email'], time() + 3600, '/');
                        setcookie('phone', $check['phone'], time() + 3600, '/'); 
                        setcookie('auth', $check['isAuth'], time() + 3600, '/');
                        setcookie('address', $check['address'], time() + 3600, '/');
                        setcookie('city', (new City())->getOne($check['city_'])['name'], time() + 3600, '/'); # city name
                        setcookie('cityId', $check['city_'], time() + 3600, '/');
                        setcookie('regionId', (new City())->getOne($check['city_'])['region_'], time() + 3600, '/');
                        setcookie('region', (new Region())->getOne((new City())->getOne($check['city_'])['region_'])['name'], time() + 3600, '/');
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

                        setcookie('login', 'logged', time() + 3600, '/');
                        setcookie('id', $check['_id'], time() + 3600, '/');
                        setcookie('first', $check['first_name'], time() + 3600, '/');
                        setcookie('second', $check['second_name'], time() + 3600, '/');
                        setcookie('type', $check['type'], time() + 3600, '/');
                        setcookie('email', $check['email'], time() + 3600, '/'); # da vedere se serve
                    } 
                    else http_response_code(403); # forbidden (password error)
                }    
                else http_response_code(403); # forbidden (email error)
        }

        break;
    default:
        http_response_code(405); # method error
}
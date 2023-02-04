<?php
$method = $_SERVER['REQUEST_METHOD'];

foreach ($_COOKIE as $key => $value) { # per pulire i cookie da entrambi i lati
    unset($value);
    setcookie($key, '', time() - 3600, '/');
}

switch($method) {
    case 'POST':
        $body = file_get_contents("php://input"); # prende il body
        $decodeBody = json_decode($body);
        $type = $decodeBody->type;

        switch($type){
            case 'D':
                require_once __DIR__ . '/class/Donator.php';
                $donator = new Donator();

                $check = $donator->findFromEmail($decodeBody->email);
                if(!empty($check)){
                    if(password_verify($decodeBody->pwd, $check['hash_pwd'])) {
                        setcookie('login', 'logged', time() + 3600, '/');
                        setcookie('id', $check['_id'], time() + 3600, '/');
                        setcookie('first', $check['first_name'], time() + 3600, '/');
                        setcookie('second', $check['second_name'], time() + 3600, '/');
                        setcookie('email', $check['email'], time() + 3600, '/');
                        setcookie('phone', $check['phone'], time() + 3600, '/');
                        setcookie('blood_group', $check['blood_group'], time() + 3600, '/');
                        setcookie('cityId', $check['city_'], time() + 3600, '/');
                        setcookie('auth', $check['isAuth'], time() + 3600, '/');
                        setcookie('type', 'D', time() + 3600, '/');
                    } 
                    else http_response_code(403); # vietato (password sbagliata)
                }    
                else http_response_code(403); # vietato (email sbagliata)            

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
                        setcookie('city', (new City())->getOne($check['city_'])['name'], time() + 3600, '/'); # nome della città
                        setcookie('cityId', $check['city_'], time() + 3600, '/');
                        setcookie('regionId', (new City())->getOne($check['city_'])['region_'], time() + 3600, '/');
                        setcookie('region', (new Region())->getOne((new City())->getOne($check['city_'])['region_'])['name'], time() + 3600, '/');
                        setcookie('type', 'H', time() + 3600, '/');
                    } 
                    else http_response_code(403); # vietato (password sbagliata)
                }    
                else http_response_code(403); # vietato (email sbagliata) 

                break;
            default: # se non è un donatore o una struttura ospedaliera è un admin
                require_once __DIR__ . '/class/Admin.php';
                $admin = new Admin();

                $check = $admin->findFromEmail($decodeBody->email);
                if(!empty($check)){
                    if(password_verify($decodeBody->pwd, $check['hash_pwd'])) {
                        setcookie('login', 'logged-a', time() + 3600, '/');
                        setcookie('id', $check['_id'], time() + 3600, '/');
                        setcookie('first', $check['first_name'], time() + 3600, '/');
                        setcookie('second', $check['second_name'], time() + 3600, '/');
                        setcookie('type', $check['type'], time() + 3600, '/');
                        setcookie('email', $check['email'], time() + 3600, '/');
                        setcookie('type', 'A', time() + 3600, '/'); 
                        setcookie('type-admin', $check['type'], time() + 3600, '/'); 
                    } 
                    else http_response_code(403); # vietato (password sbagliata)
                }    
                else http_response_code(403); # vietato (email sbagliata) 
        }

        break;
    default:
        http_response_code(405); # metodo non riconosciuto
}
<?php

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'POST':
        $body = file_get_contents("php://input"); //get the body
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
                    http_response_code(409); # conflict (email already used)

                setcookie('login', 'logged');
                setcookie('id', $donator->findFromEmail($donator->email)[`_id`]);
                setcookie('first', $donator->fn);
                setcookie('second', $donator->sn);
                setcookie('email', $donator->email);
                setcookie('pwd', $donator->pwd); # da vedere se serve
                setcookie('blood_group', $donator->blood);
                setcookie('auth', 0);

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
                    http_response_code(409); # conflict (email already used)

                setcookie('login', 'logged');
                setcookie('id', $hospital->findFromEmail($hospital->email)[`_id`]);
                setcookie('name', $hospital->name);
                setcookie('email', $hospital->email);
                setcookie('pwd', $hospital->pwd); # da vedere se serve
                setcookie('phone', $hospital->phone);
                setcookie('cityId', $hospital->city);
                setcookie('address', $hospital->addr);
                setcookie('auth', 0);

                break;
            default: # if is not a donator or hospital is an admin
                require_once __DIR__ . '/class/Admin.php';
                $admin = new Admin();

                $admin->fn = $decodeBody->fn;
                $admin->sn = $decodeBody->sn;
                $admin->email = $decodeBody->email;
                $admin->pwd = password_hash($decodeBody->pwd, PASSWORD_DEFAULT);

                if($admin->add($admin) == 'ERR')
                    http_response_code(409); # conflict (email already used)
                
                # no cookie output because only super admin can create admin so is incorrect to set cookie
                break;
        }

        break;
    default:
        http_response_code(405); # method error
}
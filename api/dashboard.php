<?php
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // a seconda dell'id corrisponde una chiamata sul database
        switch ($_GET['id']){
            case 1:
                require_once __DIR__ . '/class/Donator.php';
                $donator = new Donator();
                $js_encode = json_encode($donator->getTot(), true);
                echo ($js_encode);

                break;
            case 2:
                require_once __DIR__ . '/class/Hospital.php';
                $hospital = new Donator();
                $js_encode = json_encode($hospital->getTot(), true);
                echo ($js_encode);

                break;
            case 3;
                require_once __DIR__ . '/class/Donation.php';
                $donation = new Donation();
                $js_encode = json_encode($donation->getTotUsed(), true);
                echo ($js_encode);
                
                break;
            case 4:
                require_once __DIR__ . '/class/Donation.php';
                $donation = new Donation();
                $js_encode = json_encode($donation->getTotNotUsed(), true);
                echo ($js_encode);

                break;
            case 5:
                require_once __DIR__ . '/class/Request.php';
                $request = new Request();
                $js_encode = json_encode($request->getUrgent(), true);
                echo ($js_encode);

                break;
            default:
                require_once __DIR__ . '/class/Request.php';
                $request = new Request();
                $js_encode = json_encode($request->getNotUrgent(), true);
                echo ($js_encode);

                break;
        }
            
        break;
    default:
        http_response_code(405); // method error
}
<?php

require_once __DIR__ . '/class/Donation.php';
$donation = new Donation();

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $allDonation = $donation->getAll($_COOKIE['id']);
        $js_encode = json_encode($allDonation, true);
        header("Content-Type: application/json");
        echo ($js_encode);

        break;
    case 'POST':
        $body = file_get_contents("php://input"); // prende il body
        $decodeBody = json_decode($body);
        
        if (isset($decodeBody->type)) {
            $allDonation = $donation->availabilityType($decodeBody->type);
            $js_encode = json_encode($allDonation, true);
            header("Content-Type: application/json");
            echo ($js_encode);
        }
        else {
            $donation->site = $donation->availabilityType($_COOKIE['blood_group'])[0]['site'];
            $donation->donator = $_COOKIE['id'];
            if($donation->add($donation) == 'ERR')
                http_response_code(409); # conflict (cant donate)
        }

            
        break;
    default:
        http_response_code(405); // method error
}


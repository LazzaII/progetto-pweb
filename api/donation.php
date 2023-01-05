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
    case 'POST':
        // cercare sito con meno di quel sangue usare questa funzione availabilityType(type)
        // prendere il primo perchè è ordinata per il più piccolo e metterlo come dato nella donazione
            
        break;
    default:
        http_response_code(405); // method error
}
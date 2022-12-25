<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/class/Request.php';
$request = new Request();
$method = $_SERVER['REQUEST_METHOD'];


if($_COOKIE['login'] == 'logged') { 
    switch($method){
        case 'GET':
            $allRequest = $request->getAll();
            $js_encode = json_encode($allRequest, true);
            header("Content-Type: application/json");
            echo($js_encode);
            
            break;
        case 'POST':
            $body = file_get_contents("php://input"); //get the body
            $decodeBody = json_decode($body);

            $request->blood_type = $decodeBody->type;
            $request->quantity =  $decodeBody->qta;
            $request->hospital = $decodeBody->hospital;
            $request->site = $decodeBody->site;
            $request->add($request);

            require_once __DIR__ . '/class/Donation.php';
            $donation = new Donation();

            for ($i = 0; $i < $decodeBody->qta; $i++) // lock qta of blood
                $donation->use($decodeBody->site);

            break;
        case 'PUT':
            $body = file_get_contents("php://input"); //get the body
            $decodeBody = json_decode($body);
    
            $request->id = $decodeBody->id;
            $request->blood_type = $decodeBody->type;
            $request->quantity =  $decodeBody->qta;
            $request->update($request);

            //manca la parte per il controllo della quantità, se la quantità precedente
            // era maggiore vanno liberate delle sacchè, sennò vanno lockate altre
            
            break;
        case 'DELETE':
            $substringedURI = explode('/', $_SERVER["REQUEST_URI"]); // to get the id of the request  
            $request->delete($substringedURI[count($substringedURI)-1]);
            
            break;
        default:
            http_response_code(405); // method error
    }
} else
    http_response_code(401);  // Unauthorized
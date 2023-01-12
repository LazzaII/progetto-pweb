<?php

require_once __DIR__ . '/class/Request.php';
$request = new Request();
$method = $_SERVER['REQUEST_METHOD'];


switch($method){
    case 'GET':
        if(isset($_GET['id'])) // se viene mandato un id si prende solo le richieste di una SO
            $allRequest = $request->getFromHospital($_GET['id']);
        else 
            $allRequest = $request->getAll();

        $js_encode = json_encode($allRequest, true);
        header("Content-Type: application/json");
        echo($js_encode);
        
        break;
    case 'POST':
        $body = file_get_contents("php://input"); // prende il body
        $decodeBody = json_decode($body);

        $request->blood_type = $decodeBody->type;
        $request->quantity =  $decodeBody->qta;
        $request->hospital = $decodeBody->hospital;
        $request->site = $decodeBody->site;
        $request->add($request);

        require_once __DIR__ . '/class/Donation.php';
        $donation = new Donation();

        // "blocca" la quantità di sacche di sangue richiesta (modifica in usato le donazioni)
        for ($i = 0; $i < $decodeBody->qta; $i++) 
            $donation->use($decodeBody->site);

        break;
    case 'PUT':
        $body = file_get_contents("php://input"); // prende il body
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
        print_r($substringedURI[count($substringedURI) - 1]);
        $request->delete($substringedURI[count($substringedURI)-1]);
        
        break;
    default:
        http_response_code(405); // method error
}

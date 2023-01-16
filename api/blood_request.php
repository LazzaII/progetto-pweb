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
        require_once __DIR__ . '/class/Donation.php';
        $donation = new Donation();

        $body = file_get_contents("php://input"); // prende il body
        $decodeBody = json_decode($body);

        $request->blood_type = $decodeBody->type;
        $request->quantity =  $decodeBody->qta;
        $request->hospital = $decodeBody->hospital;
        $request->site = $decodeBody->site;
        $request->time = $decodeBody->time;
        $request->cost = $decodeBody->cost;
        $request->add($request);

        // "blocca" la quantità di sacche di sangue richiesta (modifica in usato le donazioni)
        for ($i = 0; $i < $decodeBody->qta; $i++) 
            $donation->use($decodeBody->site, $decodeBody->type);
        

        break;

    case 'PUT':
        $body = file_get_contents("php://input"); // prende il body
        $decodeBody = json_decode($body);

        //admin che accetta, o no, una richiesta
        $request->accept($decodeBody->id, $decodeBody->value);

        print_r($decodeBody);

        break;
    case 'DELETE':
        require_once __DIR__ . '/class/Donation.php';
        $donation = new Donation();

        $substringedURI = explode('/', $_SERVER["REQUEST_URI"]); // per prendere l'id della richiesta  
        $req = $request->getOne($substringedURI[count($substringedURI) - 1]); // prende i dati della richiesta da eliminare così da 'sbloccare' le sache
        // "sblocca" la quantità di sacche di sangue richiesta (modifica in usato le donazioni)
        for ($i = 0; $i < $req['quantity']; $i++) 
            $donation->deUse($req['site_'], $req['blood_type']);
        
        $request->delete($substringedURI[count($substringedURI)-1]);
        
        break;
    default:
        http_response_code(405); // metodo non riconosciuto
}

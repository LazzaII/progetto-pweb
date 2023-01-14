<?php

require_once __DIR__ . '/class/Message.php';
$mex = new Message();
$method = $_SERVER['REQUEST_METHOD'];

switch($method){

    case 'GET':
        $mexs = $mex->getAll();
        $js_encode = json_encode($mexs,true);
        header("Content-Type: application/json");
        echo($js_encode);
        
        break;
    case 'POST':
        $body = file_get_contents("php://input"); // prende contenuto del body
        $decodeBody = json_decode($body);
  
        $mex->obj = $decodeBody->obj;
        $mex->body = $decodeBody->body;
        $mex->fn = $decodeBody->fn;
        $mex->sn = $decodeBody->sn;
        $mex->email = $decodeBody->email;
        $mex->add($mex);
        break;

    case 'DELETE':
        if($_COOKIE['login'] == 'logged-a'){ // solo gli admin possono eliminare i messaggi
            // per perendere l'id del messagio 
            $substringedURI = explode('/', $_SERVER["REQUEST_URI"]);
            $mex->delete($substringedURI[count($substringedURI)-1]);
        } else
            http_response_code(401); // non autorizzato
        
        break;
    default:
        http_response_code(405); // metodo non riconosciuto per questa API
}
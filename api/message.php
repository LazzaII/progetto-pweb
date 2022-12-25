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
        $body = file_get_contents("php://input"); //get the body
        $decodeBody = json_decode($body);
  
        $mex->obj = $decodeBody->obj;
        $mex->body = $decodeBody->body;
        $mex->fn = $decodeBody->fn;
        $mex->sn = $decodeBody->sn;
        $mex->email = $decodeBody->email;
        $mex->add($mex);
        break;

    case 'DELETE':
        if($_COOKIE['login'] == 'logged'){ // only admin can delete message
            $substringedURI = explode('/', $_SERVER["REQUEST_URI"]); //To get the id of the mex  
            $mex->delete($substringedURI[count($substringedURI)-1]);
        } else
            http_response_code(401); // Unauthorized
        
        break;
    default:
        http_response_code(405); // method error
}
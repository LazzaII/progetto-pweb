<?php

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        foreach ($_COOKIE as $key => $value) { # pulisce i cookie da entrambi i "lati"
            unset($value);
            setcookie($key, '', time() - 3600, '/');
        }
        break;
    default:
        http_response_code(405); # metodo non riconosciuto
}
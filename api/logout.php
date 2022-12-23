<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        foreach ($_COOKIE as $key => $value) { # to clear cookie both side
            unset($value);
            setcookie($key, '', time() - 3600);
        }
        break;
    default:
        http_response_code(405); # method error
}
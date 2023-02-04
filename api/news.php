<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once __DIR__ . '/class/News.php';
$news = new News();
$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case 'GET':
        $allNews = $news->getAll();
        $js_encode = json_encode($allNews, true);
        header("Content-Type: application/json");
        echo($js_encode);
        
        break;
    case 'POST':
        if($_COOKIE['login'] == 'logged-a'){ // solo gli admin possono scrivere news
            $body = file_get_contents("php://input"); //prende il contenuto del boody
            $decodeBody = json_decode($body);

            // $image = $_FILES['image']; // si prende l'immagine
            // move_uploaded_file($image['tmp_name'], __DIR__ . '../images/' . $image['name']);
    
            $news->title = $decodeBody->title;
            $news->body = $decodeBody->body;
            $news->author = $decodeBody->author;
            $news->add($news);
        } else
            http_response_code(401); // Non autorizzato
        

        break;
    case 'DELETE':
        if($_COOKIE['login'] == 'logged-a'){ // solo gli admin possono eliminare le news
            $substringedURI = explode('/', $_SERVER["REQUEST_URI"]); // per prendere l'id della news
            $news->delete($substringedURI[count($substringedURI)-1]);
        } else
            http_response_code(401); // non autorizzato
        
        break;
    default:
        http_response_code(405); // metodo non riconosciuto
}
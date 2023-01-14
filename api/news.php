<?php

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
        if($_COOKIE['login'] == 'logged-a'){ // only admin can create message
            $body = file_get_contents("php://input"); //get the body
            $decodeBody = json_decode($body);
    
            $news->title = $decodeBody->title;
            $news->body = $decodeBody->body;
            $news->author = $decodeBody->author;
            $news->add($news);
        } else
            http_response_code(401); // Unauthorized 
        

        break;
    case 'DELETE':
        if($_COOKIE['login'] == 'logged-a'){ // only admin can delete message
            $substringedURI = explode('/', $_SERVER["REQUEST_URI"]); //To get the id of the news  
            $news->delete($substringedURI[count($substringedURI)-1]);
        } else
            http_response_code(401); // Unauthorized
        
        break;
    default:
        http_response_code(405); // method error
}
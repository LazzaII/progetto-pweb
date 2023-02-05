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

            $imageName = $_FILES['image']['name'];
            $location = '../images/' . $imageName;
            $ext = strtolower(pathinfo($location, PATHINFO_EXTENSION));
            $valid_ext = array("jpg","png","jpeg");
            if(in_array($ext, $valid_ext))
                echo(move_uploaded_file($_FILES['image']['tmp_name'],$location));

            $news->title = $_POST['title'];
            $news->body = $_POST['body'];
            $news->author = $_POST['author'];
            $news->img = 'images/' . $imageName;
            $news->add($news);
        } else
            http_response_code(401); // Non autorizzato
        

        break;
    case 'DELETE':
        if($_COOKIE['login'] == 'logged-a'){ // solo gli admin possono eliminare le news
            $substringedURI = explode('/', $_SERVER["REQUEST_URI"]); // per prendere l'id della news
            unlink('../' . $news->getUri($substringedURI[count($substringedURI) - 1])['img_uri']); // per rimuovere il file
            $news->delete($substringedURI[count($substringedURI)-1]);
        } else
            http_response_code(401); // non autorizzato
        
        break;
    default:
        http_response_code(405); // metodo non riconosciuto
}
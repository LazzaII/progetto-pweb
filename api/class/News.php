<?php
# import Database class
require_once __DIR__ . '/Database.php';

# class User
class News {
    private $pdo;
    public $id;
    public $title;
    public $body;
    public $img;
    public $author;
    
    public function __construct(){
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }

    public function getAll(){
        $query = 'select * from `news`';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }

    public function add($news) {
        $query = "insert into `news` 
                  values (:title, :body, :img, :author)";
        $stmt = $this->pdo->prepare($query);
        $data = [
            'title' => $news->obj,
            'body' => $news->body,
            'img' => $news->fn,
            'author' => $news->email
        ];
        $stmt->execute($data);
        return 'OK';
    }

    public function remove($id) {
        $query = 'delete from `news`
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            `id` => $id
        ];
        $stmt->execute($data);
        return 'OK';
    }

    public function update($news) {
        $query = 'update `news` set `title` = :title, `body` = :body, `img` = :img where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $news->id,
            'title' => $news->title,
            'body' => $news->body,
            'img' => $news->img
        ];
        $stmt->execute($data);
        return 'OK';
    }
}


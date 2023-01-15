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
    
    /**
     * Costruttore
     */
    public function __construct(){
        $this->pdo = new Database();
        $this->pdo = $this->pdo->getPDO();
    }
    /**
     * Funzione per prendere tutte le news
     * @return array contente i dati di tutte le news
     */
    public function getAll(){
        $query = 'select N.*, A.`first_name`, A.`second_name`
                  from `news` N
                  join `admin` A on A.`_id` = N.`author_`
                  order by N.`_id` desc';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    /**
     * Funzione per aggiungere una nuova news
     * @param News $news contenente tutte le informazioni
     */
    public function add($news) {
        $query = "insert into `news` (`title`, `body`, `author_`)
                  values (:title, :body, :author)";
        $stmt = $this->pdo->prepare($query);
        $data = [
            'title' => $news->title,
            'body' => $news->body,
            'author' => $news->author
        ];
        $stmt->execute($data);
    }

    /**
     * Funzione per eliminare una news
     * @param mixed $id
     */
    public function delete($id) {
        $query = 'delete from `news`
                  where `_id` = :id';
        $stmt = $this->pdo->prepare($query);
        $data = [
            'id' => $id
        ];
        $stmt->execute($data);
    }
}


/* API NEWS PAGINA ADMIN */
const newsInfo = ['title-news', 'body-news', 'image'];
    
/**
 * Funzione per l'inserimento della nuova news
 * @returns solo per uscire in caso di errore
 */
async function sendNews() {
  if(!checkInput(newsInfo)) {
    showMessage('message', 'Compila tutti i campi', 'errore');
    return;
  }
  const data = new FormData();
  data.append('title', document.getElementById('title-news').value);
  data.append('body', document.getElementById('body-news').value);
  data.append('author', getCookie('id'));
  data.append('image', document.getElementById('image').files[0]);
  clearValue(newsInfo);
  // chiamata a http://localhost/progetto-pweb/api/news.php per inviare la news
  const response = await fetch(url + 'news.php', {
    method: 'POST',
    body: data
  });
  if(response.ok) {
    showMessage('message', 'News inserita correttamente', 'corretto')
    getNews();
  }
}

/**
 * Funzione per prendere tutte le news e scriverle nella tabella
 */
async function getNews() {
  clearTBody('tbody-news')
  // chiamata a http://localhost/progetto-pweb/api/news.php per caricare tutti i donatori
  const response = await fetch(url + 'news.php', {
    method: 'GET'
  });
  if(response.ok) {
    response.json().then((news) => {
      for (const n of news) {
        let tr = document.createElement('tr');
        let title = document.createElement('td');
        let body = document.createElement('td');
        let author = document.createElement('td');
        let azioni = document.createElement('td');
        let btnE = document.createElement('button');
        
        title.innerText = n.title
        body.innerText = n.body;
        author.innerText = n.first_name + ' ' + n.second_name ;
        btnE.innerText = 'E';
        btnE.addEventListener('click', () => { deleteNews(n._id) })
        azioni.append(btnE);
        tr.append(title);
        tr.append(body);
        tr.append(author);
        tr.append(azioni);
        document.getElementById('tbody-news').append(tr);
      }
    });
  }
}

/**
 * Funzione per eliminare una news
 * @param {Intero} id intero che rappresenta la news da eliminare
 */
async function deleteNews(id) {
  // chiamata a http://localhost/progetto-pweb/api/news.php per eliminare o autenticare l'utente
  const response = await fetch(url + 'news.php/' + id, {
    method: 'DELETE'
  });
  if(response.ok) {
    alert("News eliminata con successo");
    getNews();
  }
}
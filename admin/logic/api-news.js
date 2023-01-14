// invia la nuoa news 
// controlla la validità degli input
function checkNews() {
    if(document.getElementById('title-news').value === '')return 0;
    if(document.getElementById('body-news').value === '') return 0;
    return 1;
}
    
  // invia messaggio
function sendNews() {
    if(checkNews() === 0) {
      document.getElementById('message').classList.add('errore');
      document.getElementById('message').style.display = 'block';
      document.querySelectorAll('#message p')[0].innerText = 'Compila tutti i campi';
      interval = setInterval(() =>  {
        document.getElementById('message').style.display = 'none';
        document.getElementById('message').classList.remove('errore');
        clearInterval(interval);
      }, 4000);
      return;
    }
  
    let data = JSON.stringify({
      title : document.getElementById('title-news').value,
      body : document.getElementById('body-news').value,
      author : getCookie('id')
    });
  
    // pulisce gli input
    document.getElementById('title-news').value = "";
    document.getElementById('body-news').value = "";
  
    // chiamata a http://localhost/progetto-pweb/api/news.php per inviare la news
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'news.php', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
      if(xhr.status === 200){
        document.getElementById('message').classList.add('corretto');
        document.getElementById('message').style.display = 'block';
        document.querySelectorAll('#message p')[0].innerText = 'News inserita correttamente';
        interval = setInterval(() =>  {
          document.getElementById('message').style.display = 'none';
          document.getElementById('message').classList.remove('corretto');
          clearInterval(interval);
        }, 4000);
        getNews();
      }
    }
    xhr.send(data);
  }

// tutte le news
function getNews() {
    let tbody = document.getElementById('tbody-news');

    // pulisce il contenuto della tabella per poi ripopolarla sotto
    let prevTr = document.querySelectorAll('#tbody-news tr');
    for (let i = 1; i < prevTr.length; i++) // il primo viene saltato perchè è l'header della tabella
        prevTr[i].remove();

    // chiamata a http://localhost/progetto-pweb/api/news.php per caricare tutti i donatori
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + 'news.php', true);
    xhr.onload = function () {
        if(xhr.status === 200 ){
            let news =  JSON.parse(xhr.response);
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
                tbody.append(tr);
            }
        }
    }
    xhr.send();
}

function deleteNews(id) {
    // chiamata a http://localhost/progetto-pweb/api/news.php per eliminare o autenticare l'utente
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', url + 'news.php/' + id, true);
    xhr.onload = function () {
        if(xhr.status === 200) {
            alert("News eliminata con successo");
            getNews();
        }
    }
    xhr.send();
}
/*
CHIAMATE API
*/

// url
var url = '../api/';

function findSite() {
    // find site from blood tyep
    console.log(document.getElementById('btype').value)
}

// NEWS
function getNews() {
    // clear the div
    document.getElementById('news-container').textContent = '';
  
    // call to http://localhost/progetto-pweb/api/news.php to get all news
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + 'news.php', true);
    xhr.onload = function () {
      let news = JSON.parse(xhr.response);
      let sect = document.getElementById('news-container');
      for (const n of news) {
        // creation of all element
        let article = document.createElement('article');
        article.setAttribute('class', 'box-news')
        let h4 = document.createElement('h4');
        h4.innerText = n.title;
        h4.setAttribute('class', 'news-title')
        let body = document.createElement('p');
        body.innerText = n.body;
        body.setAttribute('class', 'news-body');
        let author = document.createElement('span');
        author.innerText = n.second_name + ' ' + n.first_name; 
        author.setAttribute('class', 'news-author')
        //mettere immagine solo se c'è tempo [probabilmente non ci sarà]
        // merge the element in the article and append at div
        article.append(h4);
        article.append(body);
        article.append(author);
        sect.append(article);
      } 
    }
    xhr.send(null);
}

// MESSAGE
// check input value 
function checkContact() {
    if(document.getElementById('fname').value === '') return 0;
    if(document.getElementById('sname').value === '') return 0;
    if(document.getElementById('email').value === '') return 0;
    if(document.getElementById('body').value === '') return 0;
    if(document.getElementById('obj').value === '') return 0;
    return 1;
  }
  
  // send message
  function sendMessage() {
    if(checkContact() === 0) {
      document.getElementById('message').classList.add('errore');
      document.querySelectorAll('#message p')[0].innerText = 'Compila tutti i campi correttamente';
      setInterval( () =>  document.getElementById('message').style.display = 'none' , 3000);
      return;
    }
  
    let data = JSON.stringify({
      fn: document.getElementById('fname').value,
      sn: document.getElementById('sname').value,
      email: document.getElementById('c-email').value,
      body: document.getElementById('body').value,
      obj: document.getElementById('obj').value,
    });
  
    //clear input type
    document.getElementById('fname').value = "";
    document.getElementById('sname').value = "";
    document.getElementById('c-email').value = "";
    document.getElementById('body').value = "";
    document.getElementById('obj').value = "";
  
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'message.php', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
      if(xhr.status === 200){
        document.getElementById('message').classList.add('corretto');
        document.querySelectorAll('#message p')[0].innerText = 'Messaggio inviato correttamente';
        setInterval( () =>  document.getElementById('message').style.display = 'none' , 3000);
      }
    }
    xhr.send(data);
}

//DELETE ACCOUNT

function deleteAccount() {
    if(confirm("Sei sicuro di voler eliminare l'account? Clicca su cancel per annullare")){
        let data = JSON.stringify({
            type : 'H'
        });

        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', url + 'delete.php', true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {
            if(xhr.status === 200 ){
                alert('Account eliminato');
                for (const cookie of cookiesName) // delete al cookie
                    deleteCookie(cookie);
                document.location.href = indexUrl; // back to index
            }
        }
        xhr.send(data);
    }
}

//UPDATE INFO 

function checkAccount() {
    if(document.getElementById('name').value === '') return 0;
    if(document.getElementById('email').value === '') return 0;
    if(document.getElementById('phone').value === '') return 0;
    if(document.getElementById('address').value === '') return 0;
}
  
function updateInfo() {
    if(checkAccount() === 0) {
      document.getElementById('message-acc').classList.add('errore');
      document.querySelectorAll('#message-acc p')[0].innerText = 'Compila tutti i campi';
      setInterval( () =>  document.getElementById('message-acc').style.display = 'none' , 3000);
      return;
    }
    else {
        let data = JSON.stringify({
            id : getCookie('id'),
            name : document.getElementById('name').value,
            email : document.getElementById('email').value,
            phone : document.getElementById('phone').value,
            pwd : document.getElementById('pwd').value,
            address : document.getElementById('address').value,
            city : document.getElementById('city').value,
            type : 'H'
        })

        // MANCA DA MODIFICARE IL FILE PHP Hospital.PHP manca il controllo della password vuota in update(...)

        let xhr = new XMLHttpRequest();
        xhr.open('PUT', url + 'update.php', true)
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {
            if(xhr.status === 200 ){
                document.getElementById('message-acc').classList.add('corretto');
                document.querySelectorAll('#message-acc p')[0].innerText = 'Informazioni aggiornate';
                setInterval( () =>  document.getElementById('message-acc').style.display = 'none' , 3000);
            } else {
                document.getElementById('message-acc').classList.add('errore');
                document.querySelectorAll('#message-acc p')[0].innerText = 'Email inserita già in uso';
                setInterval( () =>  document.getElementById('message-acc').style.display = 'none' , 3000);
            }
        }
        xhr.send(data);

    }
    resetInfo();
}
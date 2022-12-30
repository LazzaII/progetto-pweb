/*
CHIAMATE API
*/

var url = 'http://localhost/progetto-pweb/api/';

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
    return;
  }

  let data = JSON.stringify({
    fn: document.getElementById('fname').value,
    sn: document.getElementById('sname').value,
    email: document.getElementById('email').value,
    body: document.getElementById('body').value,
    obj: document.getElementById('obj').value,
  });

  //clear input type
  document.getElementById('fname').value = "";
  document.getElementById('sname').value = "";
  document.getElementById('email').value = "";
  document.getElementById('body').value = "";
  document.getElementById('obj').value = "";

  let xhr = new XMLHttpRequest();
  xhr.open('POST', url + 'message.php', true);
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function () {
    if(xhr.status = '200'){
      document.getElementById('message').classList.add('corretto');
      document.querySelectorAll('#message p')[0].innerText = 'Messaggio inviato correttamente';
    }
  }
  xhr.send(data);
}

// NEWS

function getNews() {
  // clear the div
  document.getElementById('news').textContent = '';

  // call to http://localhost/progetto-pweb/api/news.php to get all news
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url + 'news.php', true);
  xhr.onload = function () {
    if(xhr.status === '200'){
      let news = JSON.parse(xhr.responseText);
      let div = document.getElementById('news');
      for (const n of news) {
        // creation of all element
        let article = document.createElement('article');
        article.setAttribute('id', 'news-art')
        let h4 = document.createElement('h4');
        h4.innerText = n.title;
        h4.setAttribute('id', 'news-title')
        let body = document.createElement('p');
        body.innerText = n.body;
        body.setAttribute('id', 'news-body');
        let author = document.createElement('span');
        author.innerText = n.second_name + ' ' + n.first_name; 
        h4.setAttribute('id', 'news-author')
        //mettere immagine solo se c'è tempo [probabilmente non ci sarà]
        // merge the element in the article and append at div
        article.append(h4);
        article.append(body);
        article.append(author);
        div.append(article);
      }
    }
  }
  xhr.send(null);
}

// LOGIN
function checkLogin() {
  if(document.getElementById('email-l').value === '') return 0;
  if(document.getElementById('password-l').value === '') return 0;
  return 1;
}

function login() {
  if(checkLogin() === 0) {
    document.getElementById('message-l').classList.add('errore');
    document.querySelectorAll('#message-l p')[0].innerText = 'Compila tutti i campi correttamente';
    return; 
  }

  let data = JSON.stringify({
    email: document.getElementById('email-l').value,
    pwd: document.getElementById('password-l').value,
    type: document.querySelector('input[name="type"]:checked').value
  });

  let xhr = new XMLHttpRequest();
  if(data.type === 'H') {
    xhr.open('POST', url + 'login.php', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
      console.log(xhr.status);
      console.log(data);
      if(xhr.status == '200'){
        document.getElementById('message').classList.add('corretto');
        document.querySelectorAll('#message p')[0].innerText = 'Loggato';
      } else {
        document.getElementById('message').classList.add('errore');
        document.querySelectorAll('#message p')[0].innerText = 'Password Errata';
      }
    }
  } else {
    xhr.open('POST', url + 'login.php', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
      if(xhr.status == '200'){
        // da modificare con le nuove pagine da visualizzare
        document.getElementById('message-l').classList.add('corretto');
        document.querySelectorAll('#message-l p')[0].innerText = 'Loggato';
      } else {
        document.getElementById('message-l').classList.add('errore');
        document.querySelectorAll('#message-l p')[0].innerText = 'Password Errata';
      }
    }
    xhr.send(data);
  }
}
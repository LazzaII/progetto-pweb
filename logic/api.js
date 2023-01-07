/*
CHIAMATE API
*/

// url
var url = './api/';

// UTILITIES
function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); 
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach(val => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res
}

// CITY
function getCity() {
  let xhr = new XMLHttpRequest;
  // call to http://localhost/progetto-pweb/api/city.php to get all news
  xhr.open('GET', url + 'city.php', true);
  xhr.onload = function () {
    let cities = JSON.parse(xhr.response);
    select = document.getElementById('city-input');
    for (const city of cities) {
      opt = document.createElement('option');
      opt.innerText = city.name;
      opt.setAttribute('value', city._id)
      select.append(opt);
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
    if(xhr.status === 200){
      document.getElementById('message').classList.add('corretto');
      document.querySelectorAll('#message p')[0].innerText = 'Messaggio inviato correttamente';
      setInterval( () =>  document.getElementById('message').style.display = 'none' , 3000);
    }
  }
  xhr.send(data);
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
    setInterval( () =>  document.getElementById('message-l').style.display = 'none' , 4000);
    return; 
  }

  let data = JSON.stringify({
    email: document.getElementById('email-l').value,
    pwd: document.getElementById('password-l').value,
    type: document.querySelector('input[name="type"]:checked').value
  });

  let xhr = new XMLHttpRequest();
  xhr.open('POST', url + 'login.php', true);
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function () {
    if(xhr.status === 200){

      if(getCookie('auth') === '0'){ // if is not authenticated get div message
        document.getElementById('message-l').classList.add('not-auth');
        document.querySelectorAll('#message-l p')[0].innerText = 'Account accora non attivo';
        setInterval( () =>  document.getElementById('message-l').style.display = 'none' , 4000);
      } 
      else if(document.querySelector('input[name="type"]:checked').value === 'H')
        document.location.href = 'hospital'; // redirect to hospital section
      else 
        document.location.href = 'donator';
    } 
    else {
      document.getElementById('message').classList.add('errore');
      document.querySelectorAll('#message p')[0].innerText = 'Password Errata';
      setInterval( () =>  document.getElementById('message-l').style.display = 'none' , 4000);
    }
  }
  xhr.send(data);
}

// REGISTRATION
function checkRegisterD(){
  if(document.getElementById('fname-r-d').value === '') return 0;
  if(document.getElementById('sname-r-d').value === '') return 0;
  if(document.getElementById('email-r-d').value === '') return 0;
  if(document.getElementById('phone-r-d').value === '') return 0;
  if(document.getElementById('password-r-d').value === '') return 0;
}

function checkRegisterH(){
  if(document.getElementById('name-r-so').value === '') return 0;
  if(document.getElementById('email-r-so').value === '') return 0;
  if(document.getElementById('phone-r-so').value === '') return 0;
  if(document.getElementById('address-r-so').value === '') return 0;
  if(document.getElementById('password-r-so').value === '') return 0;
}
  

// donator
function registerDonator() {
  if(checkRegisterD() === 0) {
    document.getElementById('message-r').classList.add('errore');
    document.querySelectorAll('#message-r p')[0].innerText = 'Compila tutti i campi correttamente';
    setInterval( () =>  document.getElementById('message-r').style.display = 'none' , 4000);
    return;
  }

  let data = JSON.stringify({
    fn : document.getElementById('fname-r-d').value,
    sn : document.getElementById('sname-r-d').value,
    email : document.getElementById('email-r-d').value,
    phone : document.getElementById('phone-r-d').value,
    pwd : document.getElementById('password-r-d').value,
    blood : document.getElementById('btype').value,
    type : 'D'
  });

  //clear input type
  document.getElementById('fname-r-d').value = "";
  document.getElementById('sname-r-d').value = "";
  document.getElementById('email-r-d').value = "";
  document.getElementById('phone-r-d').value = "";
  document.getElementById('password-r-d').value = "";

  // call to http://localhost/progetto-pweb/api/register.php to add new donator
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url + 'register.php', true);
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function () {
    if(xhr.status === 200){
      document.getElementById('message-r').classList.add('corretto');
      document.querySelectorAll('#message-r p')[0].innerText = 'Account creato, in attesa di conferma';
      setInterval( () =>  document.getElementById('message-r').style.display = 'none' , 4000);
    } 
    else {
      document.getElementById('message-r').classList.add('errore');
      document.querySelectorAll('#message-r p')[0].innerText = 'Email già in uso';
      setInterval( () =>  document.getElementById('message-r').style.display = 'none' , 4000);
    }
  }
  xhr.send(data);
}

// hospital
function registerSo() {
  if(checkRegisterH() === 0) {
    document.getElementById('message-r').classList.add('errore');
    document.querySelectorAll('#message-r p')[0].innerText = 'Compila tutti i campi correttamente';
    setInterval( () =>  document.getElementById('message-r').style.display = 'none' , 4000);
    return;
  }

  let data = JSON.stringify({
    name : document.getElementById('name-r-so').value,
    email : document.getElementById('email-r-so').value,
    phone : document.getElementById('phone-r-so').value,
    addr : document.getElementById('address-r-so').value,
    pwd : document.getElementById('password-r-so').value,
    city : document.getElementById('city-input').value,
    type : 'H'
  });

  //clear input type
  document.getElementById('name-r-so').value = "";
  document.getElementById('email-r-so').value = "";
  document.getElementById('phone-r-so').value = "";
  document.getElementById('address-r-so').value = "";
  document.getElementById('password-r-so').value = "";

  // call to http://localhost/progetto-pweb/api/register.php to add new hospital
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url + 'register.php', true);
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function () {
    if(xhr.status === 200){
      document.getElementById('message-r').classList.add('corretto');
      document.querySelectorAll('#message-r p')[0].innerText = 'Account creato, in attesa di conferma';
      setInterval( () =>  document.getElementById('message-r').style.display = 'none' , 4000);
    } 
    else {
      document.getElementById('message-r').classList.add('errore');
      document.querySelectorAll('#message-r p')[0].innerText = 'Email già in uso';
      setInterval( () =>  document.getElementById('message-r').style.display = 'none' , 4000);
    }
  }
  xhr.send(data);
}
/*
CHIAMATE API
*/

// url
var url = './api/';

// LOGIN
function checkLogin() {
  if(document.getElementById('email-l').value === '') return 0;
  if(document.getElementById('password-l').value === '') return 0;
  return 1;
}

function login() {
  if(checkLogin() === 0) {
    document.getElementById('message-l').classList.add('errore');
    document.getElementById('message-l').style.display = 'block';
    document.querySelectorAll('#message-l p')[0].innerText = 'Compila tutti i campi correttamente';
    interval = setInterval(() =>  {
      document.getElementById('message-l').style.display = 'none';
      document.getElementById('message-l').classList.remove('errore');
      clearInterval(interval);
    }, 4000);
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
        document.getElementById('message-l').style.display = 'block';
        document.querySelectorAll('#message-l p')[0].innerText = 'Account accora non attivo';
        interval = setInterval(() => {
          document.getElementById('message-l').style.display = 'none';
          document.getElementById('message-l').classList.remove('not-auth');
          clearInterval(interval); 
        }, 4000);
      } 
      else if(document.querySelector('input[name="type"]:checked').value === 'H')
        document.location.href = 'hospital'; // redirect to hospital section
      else 
        document.location.href = 'donator';
    } 
    else {
      document.getElementById('message-l').classList.add('errore');
      document.getElementById('message-l').style.display = 'block';
      document.querySelectorAll('#message-l p')[0].innerText = 'Password e/o email errati';
      interval = setInterval(() =>  {
        document.getElementById('message-l').style.display = 'none';
        document.getElementById('message-l').classList.remove('errore');
        clearInterval(interval);
      }, 4000);
    }
  }
  xhr.send(data);
}

/*
  Registrazione donatore e so
*/
// controlli input
function checkRegisterD(){
  if(document.getElementById('fname-r-d').value === '') return 0;
  if(document.getElementById('sname-r-d').value === '') return 0;
  if(document.getElementById('email-r-d').value === '') return 0;
  if(document.getElementById('phone-r-d').value === '') return 0;
  if(document.getElementById('password-r-d').value === '') return 0;
  if(!validateEmail(document.getElementById('email-r-d').value)) return 0;
  if(!validateNumber(document.getElementById('phone-r-d').value)) return 0;
  return 1;
}

function checkRegisterH(){
  if(document.getElementById('name-r-so').value === '') return 0;
  if(document.getElementById('email-r-so').value === '') return 0;
  if(document.getElementById('phone-r-so').value === '') return 0;
  if(document.getElementById('address-r-so').value === '') return 0;
  if(document.getElementById('password-r-so').value === '') return 0;
  if(!validateEmail(document.getElementById('email-r-so').value)) return 0;
  if(!validateNumber(document.getElementById('phone-r-so').value)) return 0;
  return 1;
}

// registrazione donatore
function registerDonator() {
  if(checkRegisterD() === 0) {
    document.getElementById('message-r').classList.add('errore');
    document.getElementById('message-r').style.display = 'block';
    document.querySelectorAll('#message-r p')[0].innerText = 'Compila tutti i campi correttamente';
    interval = setInterval(() =>  {
      document.getElementById('message-r').style.display = 'none';
      document.getElementById('message-r').classList.remove('errore');
      clearInterval(interval);
    }, 4000);
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

  // pullisce i campi
  document.getElementById('fname-r-d').value = "";
  document.getElementById('sname-r-d').value = "";
  document.getElementById('email-r-d').value = "";
  document.getElementById('phone-r-d').value = "";
  document.getElementById('password-r-d').value = "";

  // chiamata a http://localhost/progetto-pweb/api/register.php per aggiungere il nuovo donatore
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url + 'register.php', true);
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function () {
    if(xhr.status === 200){
      document.getElementById('message-r').classList.add('corretto');
      document.getElementById('message-r').style.display = 'block';
      document.querySelectorAll('#message-r p')[0].innerText = 'Account creato, in attesa di conferma';
      interval = setInterval(() =>  {
        document.getElementById('message-r').style.display = 'none';
        document.getElementById('message-r').classList.remove('corretto');
        clearInterval(interval);
      }, 4000);
    } 
    else { // possibili errori di ritorno: 409 (conflitto -> email già in uso)
      document.getElementById('message-r').classList.add('errore');
      document.getElementById('message-r').style.display = 'block';
      document.querySelectorAll('#message-r p')[0].innerText = 'Email già in uso';
      interval = setInterval(() =>  {
        document.getElementById('message-r').style.display = 'none';
        document.getElementById('message-r').classList.remove('errore');
        clearInterval(interval);
      }, 4000);
    }
  }
  xhr.send(data);
}

// struttura ospedaliera
function registerSo() {
  if(checkRegisterH() === 0) {
    document.getElementById('message-r').classList.add('errore');
    document.getElementById('message-r').style.display = 'block';
    document.querySelectorAll('#message-r p')[0].innerText = 'Compila tutti i campi correttamente';
    interval = setInterval(() =>  {
      document.getElementById('message-r').style.display = 'none';
      document.getElementById('message-r').classList.remove('errore');
      clearInterval(interval);
    }, 4000);
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

  // pullisce i campi
  document.getElementById('name-r-so').value = "";
  document.getElementById('email-r-so').value = "";
  document.getElementById('phone-r-so').value = "";
  document.getElementById('address-r-so').value = "";
  document.getElementById('password-r-so').value = "";

  // chiamata a http://localhost/progetto-pweb/api/register.php per aggiungere una nuova so
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url + 'register.php', true);
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function () {
    if(xhr.status === 200){
      document.getElementById('message-r').classList.add('corretto');
      document.getElementById('message-r').style.display = 'block';
      document.querySelectorAll('#message-r p')[0].innerText = 'Account creato, in attesa di conferma';
      interval = setInterval(() =>  {
        document.getElementById('message-r').style.display = 'none';
        document.getElementById('message-r').classList.remove('corretto');
        clearInterval(interval);
      }, 4000);
    } 
    else { // possibili errori di ritorno: 409 (conflitto -> email già in uso)
      document.getElementById('message-r').classList.add('errore');
      document.getElementById('message-r').style.display = 'block';
      document.querySelectorAll('#message-r p')[0].innerText = 'Email già in uso';
      interval = setInterval(() =>  {
        document.getElementById('message-r').style.display = 'none';
        document.getElementById('message-r').classList.remove('errore');
        clearInterval(interval);
      }, 4000);
    }
  }
  xhr.send(data);
}
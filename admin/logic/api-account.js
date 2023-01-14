/*
  API  LOGIN
*/

// controllo validità degli input
function checkLogin() {
    if(document.getElementById('email-l').value === '') return 0;
    if(document.getElementById('password-l').value === '') return 0;
    return 1;
}
  
// funzione di login
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
      type: 'A'
    });
  
    // chiamata a
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'login.php', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
      if(xhr.status === 200){
        document.getElementById('sec-login').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
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

//AGGIORNA INFO 
// controlla la validità degli input
function checkAccount() {
  if(document.getElementById('first').value === '') return 0;
  if(document.getElementById('second').value === '') return 0;
  if(document.getElementById('email').value === '') return 0;
  if(!validateEmail(document.getElementById('email').value)) return 0;
  return 1;
}

function updateInfo() {
  if(checkAccount() === 0) {
    document.getElementById('message-acc').classList.add('errore');
    document.getElementById('message-acc').style.display = 'block';
    document.querySelectorAll('#message-acc p')[0].innerText = 'Compila tutti i campi correttamente';
    interval = setInterval(() =>  {
      document.getElementById('message-acc').style.display = 'none';
      document.getElementById('message-acc').classList.remove('errore');
      clearInterval(interval);
    }, 4000);
    resetInfo();
    return;
  }

  let data = JSON.stringify({
      id : getCookie('id'),
      fn : document.getElementById('first').value,
      sn : document.getElementById('second').value,
      email : document.getElementById('email').value,
      pwd : document.getElementById('pwd').value,
      type : 'A'
  })

  // chiamata a http://localhost/progetto-pweb/api/update.php per aggiornare l'account
  let xhr = new XMLHttpRequest();
  xhr.open('PUT', url + 'update.php', true)
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function () {
      if(xhr.status === 200 ){
          document.getElementById('message-acc').classList.add('corretto');
          document.getElementById('message-acc').style.display = 'block';
          document.querySelectorAll('#message-acc p')[0].innerText = 'Informazioni aggiornate';
          interval = setInterval(() =>  {
              document.getElementById('message-acc').style.display = 'none';
              document.getElementById('message-acc').classList.remove('corretto');
              clearInterval(interval);
          }, 4000);
          resetInfo();
      } else { 
          document.getElementById('message-acc').classList.add('errore');
          document.getElementById('message-acc').style.display = 'block';
          document.querySelectorAll('#message-acc p')[0].innerText = 'Email inserita già in uso';
          interval = setInterval(() =>  {
              document.getElementById('message-acc').style.display = 'none';
              document.getElementById('message-acc').classList.remove('errore');
              clearInterval(interval);
          }, 4000);
          resetInfo();
      }
  }
  xhr.send(data);
}

// controllo validità degli input
function checkFormAdmin() {
  if(document.getElementById('fname').value === '') return 0;
  if(document.getElementById('sname').value === '') return 0;
  if(document.getElementById('n-email').value === '') return 0;
  if(document.getElementById('n-password').value === '') return 0;
  if(!validateEmail(document.getElementById('n-email').value)) return 0;
  return 1;
}

// registrazione nuovo utente admin
function registerAdmin() {
  if(checkFormAdmin() === 0){
    document.getElementById('message-new').classList.add('errore');
    document.getElementById('message-new').style.display = 'block';
    document.querySelectorAll('#message-new p')[0].innerText = 'Compila tutti i campi correttamente';
    interval = setInterval(() =>  {
      document.getElementById('message-new').style.display = 'none';
      document.getElementById('message-new').classList.remove('errore');
      clearInterval(interval);
    }, 4000);
    resetInfo();
    return;
  }

  let data = JSON.stringify({
    id : getCookie('id'),
    fn : document.getElementById('fname').value,
    sn : document.getElementById('sname').value,
    email : document.getElementById('n-email').value,
    pwd : document.getElementById('n-password').value,
    type : 'A'
  })

  // chiamata a http://localhost/progetto-pweb/api/register.php per aggiornare l'account
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url + 'register.php', true)
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function () {
      if(xhr.status === 200 ){
          document.getElementById('message-new').classList.add('corretto');
          document.getElementById('message-new').style.display = 'block';
          document.querySelectorAll('#message-new p')[0].innerText = 'Informazioni aggiornate';
          interval = setInterval(() =>  {
              document.getElementById('message-new').style.display = 'none';
              document.getElementById('message-new').classList.remove('corretto');
              clearInterval(interval);
          }, 4000);
          resetInfo();
      } else { 
          document.getElementById('message-new').classList.add('errore');
          document.getElementById('message-new').style.display = 'block';
          document.querySelectorAll('#message-new p')[0].innerText = 'Email inserita già in uso';
          interval = setInterval(() =>  {
              document.getElementById('message-new').style.display = 'none';
              document.getElementById('message-new').classList.remove('errore');
              clearInterval(interval);
          }, 4000);
          resetInfo();
      }
  }
  xhr.send(data);
}




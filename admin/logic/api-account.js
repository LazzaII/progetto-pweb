/* API LOGIN PAGINA ADMIN*/

const loginInfo = ['email-l', 'password-l'];
/**
 * Funzione per il controllo del login
 * @returns solo per uscire in caso di errore
 */
function login() {
    if(!checkInput(loginInfo)) {
      showMessage('message-l', 'Compila tutti i campi correttamente', 'errore');
      return; 
    }
  
    let data = JSON.stringify({
      email: document.getElementById('email-l').value,
      pwd: document.getElementById('password-l').value,
      type: 'A'
    });
  
    // chiamata a http://localhost/progetto-pweb/api/login.php per fare il login 
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'login.php', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
      if(xhr.status === 200){
        document.getElementById('sec-login').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
        info();
        dashboard();
        if(getCookie('type') === '0') document.getElementById('btn-elimina').disabled = true;
        // il super admin non può eliminare il proprio account
        showForm();
      } 
      else
        showMessage('message-l', 'Password e/o email errati', 'errore');
    }
    xhr.send(data);
}

const adminInfo = ['first', 'second', 'email'];
/**
 * Funzione per aggiornare le informazioni dell'account
 * @returns solo per uscire in caso di errore
 */
function updateInfo() {
  if(!checkInput(adminInfo, 2)) {
    showMessage('message-acc', 'Compila tutti i campi correttamente', 'errore');
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
      showMessage('message-acc', 'Informazioni aggiornate', 'corretto');
      resetInfo();
    } else { 
      showMessage('message-acc', 'Email inserita già in uso', 'errore');
      resetInfo();
    }
  }
  xhr.send(data);
}

const adminNew = ['fname', 'sname', 'n-email', 'n-password'];
/**
 * Funzione per registrare il nuovo utente admin
 * @returns solo per uscire in caso di errore
 */
function registerAdmin() {
  if(!checkInput(adminNew, 2, false, 3)){
    showMessage('message-new', 'Compila tutti i campi correttamente', 'errore');
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

  clearValue(adminNew);
  // chiamata a http://localhost/progetto-pweb/api/register.php per agggiungere il nuovo account
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url + 'register.php', true)
  xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
  xhr.onload = function () {
    if(xhr.status === 200 )
      showMessage('message-new', 'Account inserito', 'corretto'); 
    else
      showMessage('message-new', 'Email inserita già in uso', 'errore');
  }
  xhr.send(data);
}

/**
 * Funzione per eliminare l'account, non disponibile per il super admin
 */
function deleteAccount() {
  // chiamata a http://localhost/progetto-pweb/api/delete.php per eliminare
  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', url + 'delete.php', true);
  xhr.onload = function () {
    if(xhr.status === 200) {
      alert("Account eliminato con successo");
      exitAdmin();
    }
  }
  xhr.send();
}



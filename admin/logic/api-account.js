/* API LOGIN PAGINA ADMIN*/

const loginInfoA = ['email-l', 'password-l'];
/**
 * Funzione per il controllo del login
 * @returns solo per uscire in caso di errore
 */
async function login() {
    if(!checkInput(loginInfoA)) {
      showMessage('message-l', 'Compila tutti i campi correttamente', 'errore');
      return; 
    }
    let data = JSON.stringify({
      email: document.getElementById('email-l').value.toLowerCase(),
      pwd: document.getElementById('password-l').value,
      type: 'A'
    });
    //chiamata a http://localhost/progetto-pweb/api/login.php per fare il login 
    const response = await fetch(url + 'login.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: data
    });
    if(response.ok) {
      document.getElementById('sec-login').style.display = 'none';
      document.getElementById('admin-section').style.display = 'block';
      info();
      dashboard();
      if(getCookie('type-admin') === '0') document.getElementById('btn-elimina').disabled = true;
      // il super admin non può eliminare il proprio account
      showForm();
    } 
    else if(response.status === 403)
      showMessage('message-l', 'Password e/o email errati', 'errore');
}

const adminInfo = ['first', 'second', 'email'];
/**
 * Funzione per aggiornare le informazioni dell'account
 * @returns solo per uscire in caso di errore
 */
async function updateInfo() {
  if(!checkInput(adminInfo, 2) || (document.getElementById('pwd').value !== '' && !validatePwd(document.getElementById('pwd').value))) {
    showMessage('message-acc', 'Compila tutti i campi correttamente', 'errore');
    resetInfo();
    return;
  }
  let data = JSON.stringify({
    id : getCookie('id'),
    fn : document.getElementById('first').value,
    sn : document.getElementById('second').value,
    email : document.getElementById('email').value.toLowerCase(),
    pwd : document.getElementById('pwd').value,
    type : 'A'
  })
  // chiamata a http://localhost/progetto-pweb/api/update.php per aggiornare l'account
  const response = await fetch(url + 'update.php', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: data
  });
  if(response.ok) {
    showMessage('message-acc', 'Informazioni aggiornate', 'corretto');
    resetInfo();
  } else if(response.status === 403) {
    showMessage('message-acc', 'Email inserita già in uso', 'errore');
    resetInfo();
  }
}

const adminNew = ['fname', 'sname', 'n-email', 'n-password'];
/**
 * Funzione per registrare il nuovo utente admin
 * @returns solo per uscire in caso di errore
 */
async function registerAdmin() {
  if(!checkInput(adminNew, 2, false, 3)){
    showMessage('message-new', 'Compila tutti i campi correttamente', 'errore');
    return;
  }
  let data = JSON.stringify({
    id : getCookie('id'),
    fn : document.getElementById('fname').value,
    sn : document.getElementById('sname').value,
    email : document.getElementById('n-email').value.toLowerCase(),
    pwd : document.getElementById('n-password').value,
    type : 'A'
  })
  clearValue(adminNew);
  // chiamata a http://localhost/progetto-pweb/api/register.php per agggiungere il nuovo account
  const response = await fetch(url + 'register.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: data
  });
  if(response.ok)
      showMessage('message-new', 'Account inserito', 'corretto'); 
  else if(response.status === 409)
      showMessage('message-new', 'Email inserita già in uso', 'errore');
}

/**
 * Funzione per eliminare l'account, non disponibile per il super admin
 */
async function deleteAccount() {
  // chiamata a http://localhost/progetto-pweb/api/delete.php per eliminare
  const response = await fetch(url + 'delete.php', {
    method: 'DELETE',
  });
  if(response.ok) {
    alert("Account eliminato con successo");
    exitAdmin();
  }

}



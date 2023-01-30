/* CHIAMATE API PAGINA VISITATORE*/

// url
const url = './api/';

const loginInfo = ['email-l', 'password-l']
/**
 * Funzione per il controllo del login
 * @returns solo per uscire in caso di errore negli input
 */
async function login() {
  if(!checkInput(loginInfo)) {
    showMessage('message-l', 'Compila tutti i campi correttamente', 'errore');
    return; 
  }
  let data = JSON.stringify({
    email: document.getElementById('email-l').value.toLowerCase(),
    pwd: document.getElementById('password-l').value,
    type: document.querySelector('input[name="type"]:checked').value
  });
  clearValue(loginInfo);
  // chiamata a http://localhost/progetto-pweb/api/login.php per eseguire il login
  const response = await fetch(url + 'login.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: data
  });
  if(response.ok) {
    if(getCookie('auth') === '0') // se ancora non è stato autenticato
        showMessage('message-l', 'Account accora non attivo', 'not-auth');
      else if(document.querySelector('input[name="type"]:checked').value === 'H')
        document.location.href = 'hospital'; // redirect all'index della struttura ospedaliera
      else 
        document.location.href = 'donator'; // redirect all'index dell donatore
  } 
  else 
    showMessage('message-l', 'Password e/o email errati', 'errore'); 
}

const registerDonator = ['fname-r-d', 'sname-r-d', 'email-r-d', 'phone-r-d', 'password-r-d'];
const registerSo = ['name-r-so', 'email-r-so', 'phone-r-so', 'address-r-so', 'password-r-so'];
/**
 * Funzione per la registrazione dell'utente
 * @returns solo per uscire in caso di errore negli input
 */
async function register(type) {
  let data;
  if(type === 'D'){
    if(!checkInput(registerDonator, 2, 3, 4)){
      showMessage('message-r', 'Compila tutti i campi correttamente', 'errore');
      return;
    }
    data = JSON.stringify({
      fn : document.getElementById('fname-r-d').value,
      sn : document.getElementById('sname-r-d').value,
      email : document.getElementById('email-r-d').value.toLowerCase(),
      phone : document.getElementById('phone-r-d').value,
      pwd : document.getElementById('password-r-d').value,
      blood : document.getElementById('btype').value,
      type : 'D'
    });
    clearValue(registerDonator);
  } else {
    if(!checkInput(registerSo, 1, 2, 4)){
      showMessage('message-r', 'Compila tutti i campi correttamente', 'errore');
      return;
    }
    data = JSON.stringify({
      name : document.getElementById('name-r-so').value,
      email : document.getElementById('email-r-so').value.toLowerCase(),
      phone : document.getElementById('phone-r-so').value,
      addr : document.getElementById('address-r-so').value,
      pwd : document.getElementById('password-r-so').value,
      city : document.getElementById('city-input').value,
      type : 'H'
    });
    clearValue(registerSo);
  }
  // chiamata a http://localhost/progetto-pweb/api/register.php per aggiungere il nuovo utente
  const response = await fetch(url + 'register.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: data
  });
  if(response.ok) 
    showMessage('message-r', 'Account creato, in attesa di conferma', 'corretto');
  else // possibili errori di ritorno: 409 (conflitto -> email già in uso)
    showMessage('message-r', 'Email già in uso', 'errore');
}
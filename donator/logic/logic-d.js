// index url
const indexUrl = '../';

//useful arrays
const divs = ['donation', 'account',  'news', 'contacts'];
const cookiesName = ['login', 'auth', 'blood_group', 'email', 'first', 'id', 'second', 'phone'];

/**
 * Funzione per attivare modifiche account
 */
function activateModify() {
  // attiva gli input
  for (const cookie of cookiesName) {
    if(document.getElementById(cookie) !== null)
      document.getElementById(cookie).disabled = false;
  }
  document.getElementById('pwd').disabled = false;
  document.getElementById('blood_group').disabled = true;

  // mostra bottone di conferma e annulla e nasconde bottone di modifica e eliminazione
  document.getElementById('btn-modify').style.display = 'none';
  document.getElementById('btn-elimina').style.display = 'none';
  document.getElementById('btn-confirm').style.display = 'block';
  document.getElementById('btn-reset').style.display = 'block';
}

/**
 * Funzione per resettare le informazioni
 */
function resetInfo() {
  for (const cookie of cookiesName) {
    if(document.getElementById(cookie) !== null)
    document.getElementById(cookie).disabled = true;
  }
  document.getElementById('pwd').value = '';
  document.getElementById('pwd').disabled = true;
  document.getElementById('btn-modify').style.display = 'block';
  document.getElementById('btn-elimina').style.display = 'block';  
  document.getElementById('btn-confirm').style.display = 'none';
  document.getElementById('btn-reset').style.display = 'none';
  info();
}

/**
 * Funzione per controllare se accendendo alla pagine si è loggati 
 */
function checkLogin() {
  if(!getCookie('login') && getCookie('type') === 'D') document.location.href = indexUrl;
  getDonation();
  info();
}
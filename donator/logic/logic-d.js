// index url
var indexUrl = '../';

//useful arrays
var divs = ['donation', 'account',  'news', 'contacts'];
var cookiesName = ['login', 'auth', 'blood_group', 'email', 'first', 'id', 'second', 'phone'];

// ACCOUNT

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

function resetInfo() {
  for (const cookie of cookiesName) {
    if(document.getElementById(cookie) !== null)
    document.getElementById(cookie).disabled = true;
  }
  document.getElementById('pwd').value = '';
  document.getElementById('pwd').disabled = true;
  
  info();

  document.getElementById('btn-modify').style.display = 'block';
  document.getElementById('btn-elimina').style.display = 'block';  
  document.getElementById('btn-confirm').style.display = 'none';
  document.getElementById('btn-reset').style.display = 'none';
}

// login - logout

function checkLogin() {
  if(!getCookie('login')) document.location.href = indexUrl;

  getDonation();
  info();
}
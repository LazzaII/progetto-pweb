// index url
var indexUrl = '../';

// Array utili
var divs = ['request', 'history', 'account',  'news', 'contacts'];
var cookiesName = ['login', 'auth', 'address', 'email', 'name', 'id', 'city', 'cityId', 'phone', 'region', 'regionId'];

// ACCOUNT

function activateModify() {
  // attiva input 
  for (const cookie of cookiesName) {
    if(document.getElementById(cookie) !== null)
      document.getElementById(cookie).disabled = false;
  }
  document.getElementById('pwd').disabled = false;
  document.getElementById('city-input').disabled = false;
  document.getElementById('region-input').disabled = false;

  document.getElementById('region-input').innerText = '' // svuoto la regione attuale
  getRegions();
  document.getElementById('region-input').value = getCookie('regionId');

  document.getElementById('city-input').innerText = '' // svuoto la citt attuale
  getCity();
  document.getElementById('city-input').value = getCookie('cityId');

  // mostra bottoni di conerma e annulla - nascone bottoni di modifica e eliminazione account
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
  document.getElementById('city-input').disabled = true;
  document.getElementById('region-input').disabled = true;

  
  info();
  infoCityRegion();

  document.getElementById('btn-modify').style.display = 'block';
  document.getElementById('btn-elimina').style.display = 'block';  
  document.getElementById('btn-confirm').style.display = 'none';
  document.getElementById('btn-reset').style.display = 'none';
}

// login - logout

function checkLogin() {
  if(!getCookie('login')) document.location.href = indexUrl;

  info();
  infoCityRegion();
}

// visto che la funzione info è standard non popola i select
function infoCityRegion() {
  opCity = document.createElement('option');
  opCity.value = getCookie('cityId');
  opCity.innerText = getCookie('city');
  document.getElementById('city-input').append(opCity);
  opRegion = document.createElement('option');
  opRegion.value = getCookie('regionId');
  opRegion.innerText = getCookie('region');
  document.getElementById('region-input').append(opRegion);
}
  

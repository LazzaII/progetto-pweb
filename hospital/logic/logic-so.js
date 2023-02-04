// index url
const indexUrl = '../';

// Array utili
const divs = ['request', 'history', 'account',  'news', 'contacts'];
const cookiesName = ['login', 'auth', 'address', 'email', 'name', 'id', 'city', 'cityId', 'phone', 'region', 'regionId'];

// velocità medie 
const vm1 = 45; // entro in 30 km {si presume non venga presa l'autostrada}
const vm2 = 90; // entro i 150 km {si presume strade extraurbane secondarie}
const vm3 = 120; // sopra i 150 km {si presume l'utilizzo principalmente di autostrade}
// è una stima per cui le isole non vengono considerate come tali ma come terra tutta unità
// tempo standard stessa citta
const timeS = 40;
// raggio della terra
const R = 6373;

/**
 * Funzione per attivare le modifiche nell'account
 */
function activateModify() {
  for (const cookie of cookiesName) { // attiva gli input
    if(document.getElementById(cookie) !== null)
      document.getElementById(cookie).disabled = false;
  }
  document.getElementById('pwd').disabled = false;
  document.getElementById('city-input').disabled = false;
  document.getElementById('region-input').disabled = false;

  // setta l'option predefinita del select
  document.getElementById('region-input').innerText = '' // svuoto la regione attuale
  getRegions(getCookie('regionId'));

  // mostra bottoni di conerma e annulla - nascone bottoni di modifica e eliminazione account
  document.getElementById('btn-modify').style.display = 'none';
  document.getElementById('btn-elimina').style.display = 'none';
  document.getElementById('btn-confirm').style.display = 'block';
  document.getElementById('btn-reset').style.display = 'block';
}

/**
 * Funzione per resettare le informazioni dai cookie
 */
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
  getCityInfo();

  document.getElementById('btn-modify').style.display = 'block';
  document.getElementById('btn-elimina').style.display = 'block';  
  document.getElementById('btn-confirm').style.display = 'none';
  document.getElementById('btn-reset').style.display = 'none';
}

/**
 * Funzione per controllare se chi sta accendendo alla pagine è loggato
 */
function checkLogin() {
  if(getCookie('type') !== 'H') document.location.href = indexUrl;
  history();
  info();
  infoCityRegion();
  getCityInfo();
}

/**
 * Funzione per popolare i select quando si prova a modificare l'account
 */
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
  

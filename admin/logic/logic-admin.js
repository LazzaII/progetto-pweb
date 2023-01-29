// Array utili
const divs = ['dashboard', 'users',  'request', 'news', 'mex', 'account'];
const cookiesName = ['email', 'first', 'second', 'login', 'id', 'type']

//url
const url = '../api/';

/**
 * Funzione per uscire dall'account
 */
function exitAdmin() {
    for (const cookie of cookiesName) // cancella tutti i cookie
        deleteCookie(cookie);
    checkLogged(); // richiama la funzione per mostrare il form di login
}

/**
 * Funzione per controllare se è già loggato, sennò mostra login
 */
function checkLogged() {
    if(getCookie('login') && getCookie('type') === 'A') {
        document.getElementById('sec-login').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
        info();
        dashboard();
        if(getCookie('type') === '0') document.getElementById('btn-elimina').disabled = true;
        // il super admin non può eliminare il proprio account
        showForm();
    }
    else {
        document.getElementById('sec-login').style.display = 'block';
        document.getElementById('admin-section').style.display = 'none';
    }
}

/**
 * Funzione per attivare modifiche dell'account
 */
function activateModify() {
    for (const cookie of cookiesName) {
        if(document.getElementById(cookie) !== null)
          document.getElementById(cookie).disabled = false;
      }
      document.getElementById('pwd').disabled = false;
    
      // active confirm btn e disabled modify and delete
      document.getElementById('btn-modify').style.display = 'none';
      document.getElementById('btn-elimina').style.display = 'none';
      document.getElementById('btn-confirm').style.display = 'block';
      document.getElementById('btn-reset').style.display = 'block';
    
}

/**
 * Funzione per resettare le informazioni degli account
 */
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


/**
 * Funzione che mostra il form solo se è super admin
 */
function showForm() {
    if(getCookie('type') === '0') document.getElementById('form-new-admin').style.display = 'block';
}


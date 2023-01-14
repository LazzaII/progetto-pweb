// Array utili
var divs = ['dashboard', 'users',  'request', 'news', 'mex', 'account'];
var cookiesName = ['email', 'first', 'second', 'login', 'id', 'type']

//url
var url = '../api/';

// esce dall'account
function exitAdmin() {
    for (const cookie of cookiesName) // cancella tutti i cookie
        deleteCookie(cookie);
    checkLogged(); // richiama la funzione per mostrare il form di login
}

// controlla se già loggato 
function checkLogged() {
    if(getCookie('login')) {
        document.getElementById('sec-login').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
        info();
        dashboard();
        if(getCookie('type') === '0') document.getElementById('btn-elimina').disabled = true;
        // il super admin non può eliminare il proprio account
    }
    else {
        document.getElementById('sec-login').style.display = 'block';
        document.getElementById('admin-section').style.display = 'none';
    }
}

// attiva le modifiche delle info dell'account
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

// resetta le informazione dai cookie
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


// funzione che mostra il form se l'admin è un super admin
function showForm() {
    if(getCookie('type') === '0') document.getElementById('form-new-admin').style.display = 'block';
}


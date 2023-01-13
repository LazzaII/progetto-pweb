// Array utili
var divs = ['dashboard', 'users',  'request', 'news', 'mex', 'account'];
var cookiesName = ['email', 'first', 'second', 'login', 'id', 'type', 'request']


// esce dall'account
function exitAdmin() {
    for (const cookie of cookiesName) // cancella tutti i cookie
        deleteCookie(cookie);
    checkLogged();
}

// controlla se già loggato 
function checkLogged() {
    if(getCookie('login')) {
        document.getElementById('sec-login').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
        dashboard();
    }
    else {
        document.getElementById('sec-login').style.display = 'block';
        document.getElementById('admin-section').style.display = 'none';
    }
}
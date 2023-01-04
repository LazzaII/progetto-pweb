// FARE GLI SHOW CORRETTI

var indexUrl = '../';

//fare array con nome dei cookie e array con i div
var cookiesName = ['login', 'auth', 'blood_group', 'email', 'first', 'id', 'pwd', 'second']

// UTILITIES FUNCTION

function getCookie(name){
    return document.cookie.split(';').some(c => {
        return c.trim().startsWith(name + '=');
    });
}

function deleteCookie(name) {
    if(getCookie(name) ) {
      document.cookie = name + '=;path=/;domain=localhost ;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
  }

// LOGIN - LOGOUT

function checkLogin() {
    // manca controllo su account verificato
    if(!getCookie('login')) document.location.href = indexUrl;
}

function exit() {
    for (const cookie of cookiesName) // delete al cookie
        deleteCookie(cookie);
    document.location.href = indexUrl; // back to index
}
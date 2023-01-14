// interval usato in tutte le pagine per far apparire e sparire i messaggi di errore o conferma
var interval;

// get cookie [mettere da chi è preso il codice]
function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); 
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
}

// delete cookie
function deleteCookie(name) {
    if(getCookie(name) ) {
        document.cookie = name + '=;path=/;domain=localhost ;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
}

// show div
function showDiv(divName) {
    if (document.getElementById(divName).style.display === 'none' || document.getElementById(divName).style.display === ''){
        document.getElementById(divName).style.display = 'block'; 
        for (let i = 0; i < divs.length; i++) {
            if(divs[i] !== divName)
                document.getElementById(divs[i]).style.display = 'none';
        }
    }
}

// account
function info() {
    for (const cookie of cookiesName) {
        if(document.getElementById(cookie) !== null)
            document.getElementById(cookie).value = getCookie(cookie);
    }
}

function exit() {
    for (const cookie of cookiesName) // delete al cookie
        deleteCookie(cookie);
    document.location.href = indexUrl; // back to index
}

// validazione email
const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')  
// qualsiasi carattere fino alla chiocciola stessa cosa per la parte dopo la chioccola tranne per i caratteri speciali

function validateEmail(email) {
    return emailRegex.test(email);
}

// validazione numero di telefono
const numberRegex = new RegExp('^[0-9]+$');

function validateNumber(number) {
    return numberRegex.test(number)
}

// funzione per calolcare la distanza tra due città
// formula di Haversine per il calcolo della distanza terrestre
function distance(lat1, lon1, lat2, lon2) {
    lat1 = Math.PI * lat1/180;
    lon1 = Math.PI * lon1/180;
    lat2 = Math.PI * lat2/180;
    lon2 = Math.PI * lon2/180;
    return R * Math.acos((Math.sin(lat1) * Math.sin(lat2)) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2-lon1));
}

// TROVARE LE FUNZIONI CHE LO UTILIZZANO E METTERCELO
// funzione per pulire le tablle
function clearTBody(id) {
    let prevTr = document.querySelectorAll('#' + id +' tr');
    for (let i = 1; i < prevTr.length; i++) // il primo viene saltato perchè è l'header della tabella
        prevTr[i].remove();
}

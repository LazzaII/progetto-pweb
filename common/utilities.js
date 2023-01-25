/* FUNZIONE DI UTILITÀ COMUNI A TUTTE LE PAGINE */

/**
 * Funzione per prendere il valore di un singolo cookie
 * CODICE PRESO DA https://www.tabnine.com/academy/javascript/how-to-get-cookies/
 * @param {String} cName nome del cookie di cui si vuole sapere il valore
 * @returns valore del cookie
 */
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
// FINE CODICE PRESO DA https://www.tabnine.com/academy/javascript/how-to-get-cookies/


/**
 * Funzione per eliminare un cookie, setta ad un tempo passato il cookie
 * @param {String} name nome del cookie da eliminare
 */
function deleteCookie(name) {
    if(getCookie(name) ) {
        document.cookie = name + '=;path=/;domain=localhost ;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
}

/**
 * Funzione per mostrare la sezione corretta
 * @param {String} divName nome della sezione o div da mostrare 
 */
function showDiv(divName) {
    if (document.getElementById(divName).style.display === 'none' || document.getElementById(divName).style.display === ''){
        document.getElementById(divName).style.display = 'block'; 
        for (let i = 0; i < divs.length; i++) {
            if(divs[i] !== divName)
                document.getElementById(divs[i]).style.display = 'none';
        }
    }
}

/**
 * Funzione per valorizzare i dati dell'account partendo dal valore dei cookie
 */
function info() {
    for (const cookie of cookiesName) {
        if(document.getElementById(cookie) !== null)
            document.getElementById(cookie).value = getCookie(cookie);
    }
}

/**
 * Funzione per uscire dall'account, viene eliminato il valore dei cookie e riportati alla pagina principale
 */
function exit() {
    for (const cookie of cookiesName) // elimina tutti i cookie
        deleteCookie(cookie);
    document.location.href = indexUrl; // torna alla pagina principale
}

// qualsiasi carattere fino alla chiocciola stessa cosa per la parte dopo la chioccola
const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)  
/**
 * Funzione per il controllo della validità della mail
 * @param {String} email email da validare
 * @returns {Boolean} true se correttà, false altrimenti
 */
function validateEmail(email) {
    return emailRegex.test(email);
}

// 8 caratteri, almeno una lettera maiuscola, una minuscola, un numero e un carattere speciale
const pwdRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
/**
 * 
 * @param {String} pwd password da validare
 * @returns {Boolean} true se correttà, false altrimenti
 */
function validatePwd(pwd) {
    return pwdRegex.test(pwd);
}

// solo numeri
const numberRegex = new RegExp(/^[0-9]+$/);
/**
 * Funzione per il controllo della validità del numero
 * @param {String} number numero da validare
 * @returns true se correttà, false altrimenti
 */
function validateNumber(number) {
    return numberRegex.test(number)
}

/**
 * Funzione per calolcare la distanza tra due città in linea d'aria.
 * Basato sulla formula di Haversine per il calcolo della distanza terrestre
 * @param {Intero} lat1 latitudine punto 1
 * @param {Intero} lon1 longitudine punto 1
 * @param {Intero} lat2 latitudine punto 2
 * @param {Intero} lon2 longitudnie punto 2
 * @returns {Intero} Km di distanza tra le due città
 */
function distance(lat1, lon1, lat2, lon2) {
    lat1 = Math.PI * lat1/180;
    lon1 = Math.PI * lon1/180;
    lat2 = Math.PI * lat2/180;
    lon2 = Math.PI * lon2/180;
    return R * Math.acos((Math.sin(lat1) * Math.sin(lat2)) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2-lon1));
}

/**
 * Funzione per la pulizia delle tabelle, tranne l'header, per poi ripopolarle 
 * @param {String} id id della tbody da ripulire
 */
function clearTBody(id) {
    document.getElementById(id).innerText = '';
    // let prevTr = document.querySelectorAll('#' + id +' tr');
    // for (let i = 1; i < prevTr.length; i++) // il primo viene saltato perchè è l'header della tabella
    //     prevTr[i].remove();
}

/**
 * Funzione per il controllo degli input
 * @param {Array} whatCheck array di stringhe che contiene il valode dell'id dell'input da controllare
 * @param {Intero} email posizione nell'array contenente l'email da controllare, non essendo necessario in tutti i form default a false
 * @param {Intero} phone posizione nell'array contenente il numero da controllare, non essendo necessario in tutti i form default a false
 * @param {Intero} pwd posizione nell'array contenente la password da controllare, non essendo necessario in tutti i form default a false
 * @returns {Boolean} true se vanno tutti bene, false altrimenti
 */
function checkInput(whatCheck, email = false, phone = false, pwd = false) {
    for (let i = 0; i < whatCheck.length; i++) 
        if(document.getElementById(whatCheck[i]).value === '' ) return false;
    if(email) 
        if(!validateEmail(document.getElementById(whatCheck[email]).value)) return false;
    if(phone) 
        if(!validateNumber(document.getElementById(whatCheck[phone]).value)) return false;
    if(pwd) 
        if(!validatePwd(document.getElementById(whatCheck[pwd]).value)) return false;

    return true;
}

/**
 * Funzione per la pulizia dei campi
 * @param {Array} whatClear array di stringhe che contiene il valode dell'id dell'input da pulire
 */
function clearValue(whatClear) {
    for (let i = 0; i < whatClear.length; i++) 
        document.getElementById(whatClear[i]).value = '';
}

/**
 * Funzione per mostrare per 4 secondi messaggio di errore o conferma
 * @param {String} id del div
 * @param {String} testo testo del messagio
 * @param {String} classe  classe da aggiungere
 */
function showMessage(id, text, classe) {
    document.getElementById(id).classList.add(classe);
    document.getElementById(id).style.display = 'block';
    document.querySelectorAll('#' + id + ' p')[0].innerText = text;
    setTimeout(() => {
        document.getElementById(id).style.display = 'none';
        document.getElementById(id).classList.remove(classe);
    }, 4000);
}
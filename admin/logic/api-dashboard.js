/* API DASHBOARD PAGINA ADMIN */
// variabile di appoggio
let num = 0;
// array utili
const div_name = ['donators', 'hospitals', 'used-d', 'not-used', 'req-urg', 'not-urg'];
const div_total = ['tot-users', 'donations', 'tot-req']

/**
 * Funzione per inizio processo di caricamento dashboard
 */
function dashboard() {
    //pulizia vecchi valori
    let h3s = document.getElementsByClassName('numero')
    for (let i = 0; i < h3s.length; i++) 
        h3s[i].innerText = '';    
    
    getVal(0); // e poi chiamate a catena
}

/**
 * Funzione per scrivere il totale degli utenti, donazioni, richieste senza fare una chiamata api specificia
 * @param {String} div stringa contente il nome del div su cui scrivere il totale
 */
function writeTotal(div) {
    let h3 = document.getElementById(div_total[div]).getElementsByClassName('numero')[0];
    h3.innerText = ((h3.innerText === '') ? 0 : parseInt(h3.innerText)) + parseInt(num);
}

/**
 * Funzione ricorsiva per fare le 6 chiamata api per il calcolo delle statistiche
 * @param {Number} id interno che rappresenta il numero di chiamata 
 * @returns solo per uscire
 */
function getVal(id) {
    if(id === 6) return; // alla sesta chiamata deve finire
    // chiamata a http://localhost/progetto-pweb/api/dashboard.php per il numero di donatori
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + 'dashboard.php?id=' + parseInt(id+1), true);
    xhr.onload = function () {
        if(xhr.status === 200 ){
            num = JSON.parse(xhr.response).QTA
            let h3 = document.createElement('h3');
            h3.classList.add('numero') // solo per eliminazione
            h3.innerText = num;
            document.getElementById(div_name[id]).append(h3);
            writeTotal(Math.floor(id/2));
            getVal(id+1); //ricorsione per 6 volte
        }
    }
    xhr.send();
}
/*Funzioni di utilità per la struttura Ospedaliera*/

/**
 * Funzione che controlla che non siano presenti dei magazzini in città
 * @param {Intero} costo iniziale di trasporto
 * @returns 0 se non ci sono o se è richiesto dal magazzino più vicino, -1 se sceglie di ripensarci, il costo finale della tratta
 */
function checkCity(costo, id) {
    if(document.getElementById('tbody-city').getElementsByTagName('tr').namedItem(id)) return 0; // controllo che non sia stato scelto il magazzino più vicinio
    if(document.getElementById('tbody-city').getElementsByTagName('tr').length !== 0) {
        if(confirm('È presente un magazzino nella tua città, sicuro di voler scegliere un magazzino al di fuori? Riceverai un addebito ulteriore del 15%')) {
             return costo + costo*0.15;
        }
        else return -1;
    }
    return 0
}

/**
 * Funzione che controlla che non siano presenti dei magazzini nella stessa regione
 * @param {Intero} costo iniziale di trasporto
 * @returns 0 se non ci sono o se è richiesto dal magazzino più vicino,, -1 se sceglie di ripensarci, il costo finale della tratta
 */
function checkRegion(costo, id) {
    if(document.getElementById('tbody-region').getElementsByTagName('tr').namedItem(id)) return 0; // controllo che non sia stato scelto il magazzino più vicinio
    if(document.getElementById('tbody-region').getElementsByTagName('tr').length !== 0) {
        console.log(document.getElementById('tbody-region').getElementsByTagName('tr'));
        if(confirm('È presente un magazzino nella tua regione, sicuro di voler scegliere un magazzino al di fuori? Riceverai un addebito ulteriore del 10%'))
            return costo + costo*0.1;
        else 
            return -1;
    }
    return 0
}

/**
 * Funzione che controlla il ritorno delle funzioni checkRegion e checkCity 
 * @param {*} costo 
 * @returns il costo aggiornato, oppure -1 se richiesta annullata 0 altrimenti
 */
function checkWarehouse(costo, id) {
    let ret = 0;
    let costoCitta = checkCity(costo, id)
    switch (costoCitta) {
        case 0: //nessun magazzino presente
            let = costoRegione = checkRegion(costo, id); // se non c'è nessuno in città si controlla la regione
            switch (costoRegione) {
                case 0: //nessun magazzino presente
                    ret = 0;
                    break;
                case -1: //scelta annullata
                    ret = -1
                    break; 
                default: //scelta confermata
                    ret = costoRegione;
                    break;
            }
            break;
        case -1: //scelta annullata
            ret = -1
            break; 
        default://scelta confermata
            ret = costoCitta;
            break;
    }
    return ret;
}

/**
 * Funzione per il calolo del tempo che ci vuole da una struttura all'altra,
 * in caso si urgente viene calcolato il tempo effettivo con un 10% per gli imprevisti
 * altrimenti il tempo può variare fino a 48 ore + tempo effettivo + 10%
 * @param {Intero} dt intero che rappresenta la distanza tra i due edifici
 * @param {Boolean} urg 
 * @returns {Intero} che rappresenta il tempo che ci vuole per la spedizione
 */
function calcoloTempo(dt, urg) {
    let tmp;
    if(dt === 0) tmp = timeS;
    else if(dt < 30) tmp = Math.floor(dt/vm1 * 60);
    else if(dt < 150) tmp = Math.floor(dt/vm2 * 60);
    else tmp = Math.floor(dt/vm3 * 60);
    if(urg === false ) {
        tmp +=  Math.random() * 2880 // numero di minuti random da 0 a 48 ore
    }
    tmp += tmp*0.1// 10% per imprevisti
    return tmp; 
}

/**
 * Funzione che aggiorna il tempo in caso urgente sia spuntato o no
 * @param {Intero} id che rappresenta l'id del magazzino
 * @param {Intero} dt distaza tra i due edifici
 */
function updateTime(id, dt) {
    let time;
    box = document.getElementById(id);
    if(box.getElementsByClassName('urgente')[0].checked){
        time = calcoloTempo(dt, true);
        box.getElementsByClassName('time')[0].id = time;
        box.getElementsByClassName('time')[0].innerText = parseInt(time/60) + ' H : ' + Math.floor(time - (60*parseInt(time/60))) + ' m';
    }
    else {
        time = calcoloTempo(dt, false);
        box.getElementsByClassName('time')[0].id = time;
        box.getElementsByClassName('time')[0].innerText = parseInt(time/60) + ' H : ' + Math.floor(time - (60*parseInt(time/60))) + ' m';
    } 
}
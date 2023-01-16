/* API RICHIESTE PAGINA SO*/
// url
var url = '../api/';

// latitudeine e longitudine
var ltn = 0;
var lng = 0;

/**
 * prende latitudine e longitudine della struttura ospedaliera
 */
function getCityInfo() {
    // chiamata a http://localhost/progetto-pweb/api/city.php per caricare le vecchie richieste
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + 'city.php/?id=' + getCookie('cityId'), true);
    xhr.onload = function () {
        let request = JSON.parse(xhr.response);
        if(xhr.status === 200 ){
            lng = request.lng;
            ltn = request.lat;
        }
    }
    xhr.send();
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

/**
 * Funzione che ricerca i magazzini a seconda del sangue selezionato
 */
function findSite() {
    clearTBody('tbody-city'); clearTBody('tbody-region'); clearTBody('tbody-it');
    let data = JSON.stringify({
        type : document.getElementById('btype').value
    });
    // chiamata a http://localhost/progetto-pweb/api/donation.php per caricare i magazzini disponibili
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'donation.php' , true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        let stocks = JSON.parse(xhr.response);
        if(xhr.status === 200 ){
            for (const s of stocks) {
                let tr = document.createElement('tr');
                let citta = document.createElement('td');
                let regione = document.createElement('td');
                let tdqta = document.createElement('td');
                let qta = document.createElement('select'); 
                let distanza = document.createElement('td');
                let tempoArr = document.createElement('td');
                let tdBtnU = document.createElement('td');
                let btnU = document.createElement('input')
                let tdBtn = document.createElement('td');
                let btnAdd = document.createElement('button');
                let dt = distance(ltn, lng, s.lat, s.lng); // calcolo della distanza terrestre (linea d'aria)
            
                for (let i = 0; i < s.QTA; i++) { // si crea il menù per selezionare la quantità desiderata
                    let opt = document.createElement('option');
                    opt.value = i+1;
                    opt.innerText = i+1;
                    qta.append(opt);
                }
                tdqta.append(qta);
                tdBtnU.append(btnU);
                tr.setAttribute('id', 'tr' + s.site);// set degli attributi e del testo
                tempoArr.setAttribute('class', 'time');
                qta.setAttribute('class', 'qta-r');
                btnU.setAttribute('class', 'urgente')
                btnU.type = 'checkbox';
                btnAdd.innerText = 'Richiedi';
                citta.innerText = s.cName;
                regione.innerText = s.rName;
                distanza.innerText = Math.floor(dt) + ' Km';
                time = calcoloTempo(dt, false);
                tempoArr.setAttribute('id', time);
                tempoArr.innerText = parseInt(time/60) + ' H : ' + Math.floor(time - (60*parseInt(time/60))) + ' m';
                btnU.addEventListener('change', () => updateTime('tr' + s.site, Math.floor(dt)));
                btnAdd.addEventListener('click', () => sendRequest('tr' + s.site, Math.floor(dt)));

                tdBtn.append(btnAdd)
                tr.append(citta); // aggiunta delle caselle
                tr.append(regione);
                tr.append(tempoArr);
                tr.append(distanza);
                tr.append(tdqta);
                tr.append(tdBtnU);
                tr.append(tdBtn);

                if(s.cId === getCookie('cityId')) // aggiunta della riga nella tabella corretta
                    document.getElementById('tbody-city').append(tr);
                else if(s.rId === getCookie('regionId'))
                    document.getElementById('tbody-region').append(tr);
                else 
                    document.getElementById('tbody-it').append(tr);
            }
        }
    }
    xhr.send(data);
}

/**
 * Invia la richiesta di sangue
 * @param {String} id tr + id del magazzino di spedizione
 * @param {Intero} km tra i due edifici
 */
function sendRequest(id, km) {
    box = document.getElementById(id);
    if(box.getElementsByClassName('urgente')[0].checked) costo = 0;
    else if(km < 1) costo = 10;
    else costo = km * 3 //se è meno di un km il costo default è 10 euro, altrimenti il costo è km * 3 (costante scelta ipoteticamente, stessa cosa per il prezzo default)

    let data = JSON.stringify({
        type : document.getElementById('btype').value,
        qta : box.getElementsByClassName('qta-r')[0].value,
        hospital : getCookie('id'),
        site : id.substring(2),
        time : box.getElementsByClassName('time')[0].id,
        cost : costo 
    });
    // chiamata a http://localhost/progetto-pweb/api/blood_request.php per eliminare account
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'blood_request.php', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        if(xhr.status === 200 ){
            document.location.reload();
        }
    }
    xhr.send(data);
}

/**
 * Funzione per il calcolo della cronologia delle vecchie richieste di sangue
 */
function history() {
    // pulisce il contenuto della tabella per poi ripopolarla sotto
    clearTBody('ordini');

    // chiamata a http://localhost/progetto-pweb/api/blood_request.php per caricare le vecchie richieste
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + 'blood_request.php/?id=' + getCookie('id'), true);
    xhr.onload = function () {
        let request = JSON.parse(xhr.response);
        if(xhr.status === 200 ){
            for (const r of request) {
                let tr = document.createElement('tr');
                let data = document.createElement('td');
                let bType = document.createElement('td');
                let qta = document.createElement('td');
                let city = document.createElement('td');
                let time = document.createElement('td');
                let cost = document.createElement('td');
                let pending = document.createElement('td');
                let hour = parseInt(r.deliveryTime/60);

                data.innerText = r.date;
                tr.append(data);
                bType.innerText = r.blood_type
                tr.append(bType);
                qta.innerText = r.quantity;
                tr.append(qta);
                city.innerText = r.name;
                tr.append(city);
                time.innerText = hour + ' H : ' + (r.deliveryTime - (60*hour)) + ' m';
                tr.append(time);
                cost.innerText = r.cost;
                tr.append(cost);
                if(r.isPending === '0') {
                    let btnX = document.createElement('button');
                    btnX.innerText = 'X'
                    btnX.addEventListener('click', () => deleteRequest(r._id));
                    pending.append(btnX);
                } 
                else if(r.isPending === '2') pending.innerText = 'Rifiutato'
                else
                    pending.innerText = 'Approvato' 
                tr.append(pending);
                document.getElementById('ordini').append(tr);
            }
        }
    }
    xhr.send();
}

/**
 * Funzione che permette di eliminare una richiesta di sangue in caso non sia stata ancora accettata
 * @param {Intero} id della richiesta da eliminare
 */
function deleteRequest(id) {
    // chiamata a http://localhost/progetto-pweb/api/blood_request.php per eliminare richiesta sangue
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', url + 'blood_request.php/' + id, true);
    xhr.onload = function () {
        if(xhr.status === 200 ){
            alert('Richiesta eliminata');
            history();
        }
    }
    xhr.send();
}
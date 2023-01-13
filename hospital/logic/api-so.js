/*
CHIAMATE API
*/

// url
var url = '../api/';

// latitudeine e longitudine
var ltn = 0;
var lng = 0;

// prende latitudine e latitudine
function getCityInfo() {
    // chiamata a http://localhost/progetto-pweb/api/city.php per caricare le vecchie richieste
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + 'city.php/?id=' + getCookie('cityId'), true);
    xhr.onload = function () {
        let request = JSON.parse(xhr.response);
        if(xhr.status === 200 ){
            lng = request.lng;
            ltn = request.lat;
            findSite();
        }
    }
    xhr.send();
}

// ricerca di tutti i siti (viene richiamata quando si sceglie unta tipologia di sangue)
function findSite() {
    // prende e pulisce il div che contiene i vari magazzini
    let divc = document.getElementById('stock-box-ci');
    divc.innerText = '';
    let divre = document.getElementById('stock-box-re');
    divre.innerText = '';
    let divit = document.getElementById('stock-box-it');
    divit.innerText = '';

    let data = JSON.stringify({
        type : document.getElementById('btype').value
    });

    // chiamata a http://localhost/progetto-pweb/api/donation.php per caricare le vecchie richieste
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'donation.php' , true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        let stocks = JSON.parse(xhr.response);
        if(xhr.status === 200 ){
            for (const s of stocks) {
                let art = document.createElement('article');
                let citta = document.createElement('label');
                let regione = document.createElement('label');
                let qta = document.createElement('select'); 
                let distanza = document.createElement('label');
                let tempoArr = document.createElement('label');
                let btnAdd = document.createElement('button');
                let urgente = document.createElement('label');
                let btnU = document.createElement('input')
                let dt = distance(ltn, lng, s.lat, s.lng); // calcolo della distanza terrestre (linea d'aria)

                // si crea il menù per selezionare la quantità desiderata
                for (let i = 0; i < s.QTA; i++) {
                    let opt = document.createElement('option');
                    opt.value = i+1;
                    opt.innerText = i+1;
                    qta.append(opt);
                }

                // set degli attributi
                art.setAttribute('id', s.site);
                art.setAttribute('class', 'box');
                citta.setAttribute('id', s.cId);
                regione.setAttribute('id', s.nId);
                tempoArr.setAttribute('class', 'time');
                qta.setAttribute('class', 'qta-r');
                btnU.setAttribute('class', 'urgente')
                btnU.type = 'checkbox';
                
                // set del testo
                urgente.innerText = 'Urgenza'
                btnAdd.innerText = 'Richiedi';
                citta.innerText = 'Citta:' + s.cName;
                regione.innerText = 'Regione:' + s.rName;
                distanza.innerText = 'Distanza:' + Math.floor(dt) + ' Km';
                if(dt === 0) time = timeS;
                else if(dt < 30) time = Math.floor(dt/vm1 * 60);
                else if(dt < 150) time = Math.floor(dt/vm2 * 60);
                else time = Math.floor(dt/vm3 * 60);
                tempoArr.innerText = 'Tempo stimato:' + time + ' minuti';
                
                btnAdd.addEventListener('click', () => sendRequest(s.site, time, Math.floor(dt)));

                art.append(citta);
                art.append(regione);
                art.append(tempoArr);
                art.append(distanza);
                art.append(urgente);
                art.append(btnU);
                art.append(qta);
                art.append(btnAdd);

                if(s.cId === getCookie('cityId'))
                    divc.append(art);
                else if(s.rId === getCookie('regionId'))
                    divre.append(art);
                else 
                    divit.append(art);
            }
        }
    }
    xhr.send(data);
}

// invia richiesta
function sendRequest(id, tempo, km) {
    box = document.getElementById(id);

    if(box.getElementsByClassName('urgente')[0].checked) costo = 0;
    else if(km < 1) costo = 10;
    else costo = km * 3 //se è meno di un km il costo default è 10 euro, altrimenti il costo è km * 3 (costante scelta ipoteticamente)

    let data = JSON.stringify({
        type : document.getElementById('btype').value,
        qta : box.getElementsByClassName('qta-r')[0].value,
        hospital : getCookie('id'),
        site : id,
        time : tempo,
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

// Cronologia
function history() {
    let table = document.getElementById('ordini');

    // pulisce il contenuto della tabella per poi ripopolarla sotto
    let prevTr = document.querySelectorAll('#ordini tr');
    for (let i = 1; i < prevTr.length; i++) // il primo viene saltato perchè è l'header della tabella
        prevTr[i].remove();

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
                table.append(tr);
            }
        }
    }
    xhr.send();
}

// elimina richiesta di sangue
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

//Elimina account
function deleteAccount() {
    if(confirm("Sei sicuro di voler eliminare l'account? Clicca su cancel per annullare")){
        let data = JSON.stringify({
            type : 'H'
        });

        // chiamata a http://localhost/progetto-pweb/api/delete.php per eliminare account
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', url + 'delete.php', true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {
            if(xhr.status === 200 ){
                alert('Account eliminato');
                for (const cookie of cookiesName) // delete al cookie
                    deleteCookie(cookie);
                document.location.href = indexUrl; // back to index
            }
        }
        xhr.send(data);
    }
}

//Aggiorna info
function checkAccount() {
    if(document.getElementById('name').value === '') return 0;
    if(document.getElementById('email').value === '') return 0;
    if(document.getElementById('phone').value === '') return 0;
    if(document.getElementById('address').value === '') return 0;
    if(!validateEmail(document.getElementById('email').value)) return 0;
    if(!validateNumber(document.getElementById('phone').value)) return 0;
    return 1;
}
  
function updateInfo() {
    if(checkAccount() === 0) {
      document.getElementById('message-acc').classList.add('errore');
      document.getElementById('message-acc').style.display = 'block';
      document.querySelectorAll('#message-acc p')[0].innerText = 'Compila i campi correttamente';
      interval = setInterval(() =>  {
        document.getElementById('message-acc').style.display = 'none';
        document.getElementById('message-acc').classList.remove('errore');
        clearInterval(interval);
      }, 4000);
      resetInfo();
      return;
    }
    else {
        let data = JSON.stringify({
            id : getCookie('id'),
            name : document.getElementById('name').value,
            email : document.getElementById('email').value,
            phone : document.getElementById('phone').value,
            pwd : document.getElementById('pwd').value,
            address : document.getElementById('address').value,
            city : document.getElementById('city-input').value,
            type : 'H'
        })

        // chiamata a http://localhost/progetto-pweb/api/update.php per aggiornare le info dell'account
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', url + 'update.php', true)
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {
            if(xhr.status === 200 ){
                document.getElementById('message-acc').classList.add('corretto');
                document.getElementById('message-acc').style.display = 'block';
                document.querySelectorAll('#message-acc p')[0].innerText = 'Informazioni aggiornate';
                interval = setInterval(() =>  {
                    document.getElementById('message-acc').style.display = 'none';
                    document.getElementById('message-acc').classList.remove('corretto');
                    clearInterval(interval);
                }, 4000);
                resetInfo();
            } else {
                document.getElementById('message-acc').classList.add('errore');
                document.getElementById('message-acc').style.display = 'block';
                document.querySelectorAll('#message-acc p')[0].innerText = 'Email inserita già in uso';
                interval = setInterval(() =>  {
                    document.getElementById('message-acc').style.display = 'none';
                    document.getElementById('message-acc').classList.remove('errore');
                    clearInterval(interval);
                }, 4000);
                resetInfo();
            }
        }
        xhr.send(data);
    }
}
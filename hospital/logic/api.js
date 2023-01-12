/*
CHIAMATE API
*/

// url
var url = '../api/';

function findSite() {
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
                // sciverli divisi per città, regione, italia
                //console.log(s.QTA);
            }
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
                if(r.isPending === '0') {
                    let btnX = document.createElement('button');
                    btnX.innerText = 'X'
                    btnX.addEventListener('click', () => deleteRequest(r._id));
                    let btnU = document.createElement('button');
                    btnU.innerText = 'U'
                    btnU.addEventListener('click', () => updateRequest(r._id));
                    pending.append(btnX);
                    pending.append(btnU);
                }
                else {
                    pending.innerText = 'N' //non ancora approvato
                }
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

// modifica richiesta
function updateRequest() {
    // da fare
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
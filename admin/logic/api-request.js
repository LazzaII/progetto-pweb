/* API RICHIESTE PAGINA ADMIN */
/**
 * Funzione per mettere in tabella tutte le richieste di sangue
 */
function getRequest() {
    clearTBody('tbody-request')
    // chiamata a http://localhost/progetto-pweb/api/blood_request.php per caricare tutte le richieste di sangue
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + 'blood_request.php', true);
    xhr.onload = function () {
        if(xhr.status === 200 ){
            let requests =  JSON.parse(xhr.response);
            for (const r of requests) {
                
                let tr = document.createElement('tr');
                let date = document.createElement('td');
                let hName = document.createElement('td');
                let cName = document.createElement('td');
                let btype = document.createElement('td');
                let qta = document.createElement('td');
                let cost = document.createElement('td');
                let azioni = document.createElement('td');
                
                date.innerText = r.date;
                hName.innerText = r.hName;
                cName.innerText = r.cName;
                btype.innerText = r.blood_type;
                qta.innerText = r.quantity;
                cost.innerText = r.cost;
                if(r.isPending === '0'){
                    let btnR = document.createElement('button');
                    btnR.innerText = 'R';
                    btnR.addEventListener('click', () => { actionRequest(r._id, 2) })
                    azioni.append(btnR);
                    let btnA = document.createElement('button');
                    btnA.innerText = 'A';
                    btnA.addEventListener('click', () => { actionRequest(r._id, 1) })
                    azioni.append(btnA);
                }
                else if (r.isPending === '2') azioni.innerText = 'Rigettata';
                else azioni.innerText = 'Accettata';
                tr.append(date);
                tr.append(hName);
                tr.append(cName);
                tr.append(btype);
                tr.append(qta);
                tr.append(cost);
                tr.append(azioni);
                document.getElementById('tbody-request').append(tr);
            }
        }
    }
    xhr.send();
}
/**
 * Funzione per svolgere una azione su una richiesta (rigetto o accettazione)
 * @param {Intero} id numero di richiesta su cui svolgere l'azione
 * @param {Intero} val valore della richiesta, 1 accettata, 2 rigettata
 */
function actionRequest(id, val) {
    let data = JSON.stringify({
        id : id,
        value : val
    });
    // chiamata a http://localhost/progetto-pweb/api/blood_request.php per eliminare o autenticare l'utente
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', url + 'blood_request.php', true);
    xhr.onload = function () {
        if(xhr.status === 200) {
            getRequest();
        }
    }
    xhr.send(data);
}
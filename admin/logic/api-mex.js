/*
    API MESSAGGI
*/

// tutti i messaggi
function getMex() {
    let tbody = document.getElementById('tbody-mex');

    // pulisce il contenuto della tabella per poi ripopolarla sotto
    let prevTr = document.querySelectorAll('#tbody-mex tr');
    for (let i = 1; i < prevTr.length; i++) // il primo viene saltato perchè è l'header della tabella
        prevTr[i].remove();

    // chiamata a http://localhost/progetto-pweb/api/message.php per caricare tutti i messaggi
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + 'message.php', true);
    xhr.onload = function () {
        if(xhr.status === 200 ){
            let messages =  JSON.parse(xhr.response);
            for (const m of messages) {
                
                let tr = document.createElement('tr');
                let fname = document.createElement('td');
                let sname = document.createElement('td');
                let email = document.createElement('td');
                let obj = document.createElement('td');
                let body = document.createElement('td');
                let azioni = document.createElement('td');
                let btnE = document.createElement('button'); // sostituire con icona 
                
                fname.innerText = m.first_name;
                sname.innerText = m.second_name;
                email.innerText = m.email;
                obj.innerText = m.object;
                body.innerText = m.body;
                btnE.innerText = 'E';
                btnE.addEventListener('click', () => { deleteMessage(m._id) })
                azioni.append(btnE);
                tr.append(fname);
                tr.append(sname);
                tr.append(email);
                tr.append(obj);
                tr.append(body);
                tr.append(azioni);
                tbody.append(tr);
            }
        }
    }
    xhr.send();
}

// cancella il messaggio
function deleteMessage(id) {
    // chiamata a http://localhost/progetto-pweb/api/message.php per eliminare o autenticare l'utente
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', url + 'message.php/' + id, true);
    xhr.onload = function () {
        if(xhr.status === 200) {
            alert("Messaggio eliminato con successo");
            getMex();
        }
    }
    xhr.send();
}
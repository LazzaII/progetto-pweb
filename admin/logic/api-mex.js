/* API MESSAGGI PAGINA ADMIN */

/**
 * Funzione per prendere tutti i messaggi e scriverli nella tabella
 */
async function getMex() {
    clearTBody('tbody-mex');
    // chiamata a http://localhost/progetto-pweb/api/message.php per caricare tutti i messaggi
    const response = await fetch(url + 'message.php', {
        method: 'GET'
    });
    if(response.ok) {
        response.json().then((messages) => {
            for (const m of messages) {
                let tr = document.createElement('tr');
                let fname = document.createElement('td');
                let sname = document.createElement('td');
                let email = document.createElement('td');
                let obj = document.createElement('td');
                let body = document.createElement('td');
                let azioni = document.createElement('td');
                let btnE = document.createElement('button');
                
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
                document.getElementById('tbody-mex').append(tr);
            }
        });
    }
}

/**
 * Funzione per eliminare un messaggio
 * @param {Number} id intero che rappresenta il messggio da eliminare
 */
async function deleteMessage(id) {
    // chiamata a http://localhost/progetto-pweb/api/message.php per eliminare il messaggio
    const response = await fetch(url + 'message.php/' + id, {
        method: 'DELETE'
    });
    if(response.ok) {
        alert("Messaggio eliminato con successo");
        getMex();
    }
    
}
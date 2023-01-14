/*
    tutti gli utenti
*/

// funzione di caricamento di tutti gli utenti
function getUsers() {
    getDonator();
    getSo();
    getAdmin();
}

// funzione per eliminare o autenticare l'utente
function actionUsers(id, type, METHOD) {
    let data = JSON.stringify({
        id : id,
        type : type
    });

    // chiamata a http://localhost/progetto-pweb/api/users.php per eliminare o autenticare l'utente
    let xhr = new XMLHttpRequest();
    xhr.open(METHOD, url + 'users.php?type=' + type, true);
    xhr.onload = function () {
        if(xhr.status === 200) {
            if(METHOD === 'DELETE') alert("Account eliminato con successo");
            else alert("Account abilitato")
            getUsers();
        }
    }
    xhr.send(data);
}

// prende i donatori
function getDonator() {
    let tbody = document.getElementById('tbody-donator');

    // pulisce il contenuto della tabella per poi ripopolarla sotto
    let prevTr = document.querySelectorAll('#tbody-donator tr');
    for (let i = 1; i < prevTr.length; i++) // il primo viene saltato perchè è l'header della tabella
        prevTr[i].remove();

    // chiamata a http://localhost/progetto-pweb/api/users.php per caricare tutti i donatori
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + 'users.php?type=D', true);
    xhr.onload = function () {
        if(xhr.status === 200 ){
            let donators =  JSON.parse(xhr.response);
            for (const d of donators) {
                
                let tr = document.createElement('tr');
                let fname = document.createElement('td');
                let sname = document.createElement('td');
                let email = document.createElement('td');
                let phone = document.createElement('td');
                let btype = document.createElement('td');
                let azioni = document.createElement('td');
                let btnE = document.createElement('button');
                
                fname.innerText = d.first_name;
                sname.innerText = d.second_name;
                email.innerText = d.email;
                phone.innerText = d.phone;
                btype.innerText = d.blood_group;
                btnE.innerText = 'E';
                btnE.addEventListener('click', () => { actionUsers(d._id, 'D', 'DELETE') })
                azioni.append(btnE);
                if(d.isAuth === '0') {
                    btnC = document.createElement('button')
                    btnC.innerText = 'C';
                    btnC.addEventListener('click', () => { actionUsers(d._id, 'D', 'PUT') })
                    azioni.append(btnC);
                }
                tr.append(fname);
                tr.append(sname);
                tr.append(email);
                tr.append(phone);
                tr.append(btype);
                tr.append(azioni);
                tbody.append(tr);
            }
        }
    }
    xhr.send();
}

// prende le strutture ospedaliera
function getSo() {
    let tbody = document.getElementById('tbody-so');

    // pulisce il contenuto della tabella per poi ripopolarla sotto
    let prevTr = document.querySelectorAll('#tbody-so tr');
    for (let i = 1; i < prevTr.length; i++) // il primo viene saltato perchè è l'header della tabella
        prevTr[i].remove();

    // chiamata a http://localhost/progetto-pweb/api/users.php per caricare tutti i donatori
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + 'users.php?type=H', true);
    xhr.onload = function () {
        if(xhr.status === 200 ){
            let hospitals =  JSON.parse(xhr.response);
            for (const h of hospitals) {
                
                let tr = document.createElement('tr');
                let name = document.createElement('td');
                let addr = document.createElement('td');
                let email = document.createElement('td');
                let phone = document.createElement('td');
                let city = document.createElement('td');
                let region = document.createElement('td');
                let azioni = document.createElement('td');
                let btnE = document.createElement('button');
                
                name.innerText = h.name;
                addr.innerText = h.address
                email.innerText = h.email;
                phone.innerText = h.phone;
                city.innerText = h.cName;
                region.innerText = h.rName;
                btnE.innerText = 'E';
                btnE.addEventListener('click', () => { actionUsers(h._id, 'H', 'DELETE') })
                azioni.append(btnE);
                if(h.isAuth === '0') {
                    btnC = document.createElement('button')
                    btnC.innerText = 'C';
                    btnC.addEventListener('click', () => { actionUsers(h._id, 'H', 'PUT') })
                    azioni.append(btnC);
                }
                tr.append(name);
                tr.append(email);
                tr.append(phone);
                tr.append(addr);
                tr.append(city);
                tr.append(region);
                tr.append(azioni);
                tbody.append(tr);
            }
        }
    }
    xhr.send();
}

// prende gli admin
function getAdmin() {
    let tbody = document.getElementById('tbody-admin');

    // pulisce il contenuto della tabella per poi ripopolarla sotto
    let prevTr = document.querySelectorAll('#tbody-admin tr');
    for (let i = 1; i < prevTr.length; i++) // il primo viene saltato perchè è l'header della tabella
        prevTr[i].remove();

    // chiamata a http://localhost/progetto-pweb/api/users.php per caricare tutti i donatori
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + 'users.php?type=A', true);
    xhr.onload = function () {
        if(xhr.status === 200 ){
            let admins =  JSON.parse(xhr.response);
            for (const a of admins) {
                
                let tr = document.createElement('tr');
                let fname = document.createElement('td');
                let sname = document.createElement('td');
                let email = document.createElement('td');
                let azioni = document.createElement('td');
                let btnE = document.createElement('button');
                
                fname.innerText = a.first_name;
                sname.innerText = a.second_name;
                email.innerText = a.email;
                btnE.innerText = 'E';
                btnE.addEventListener('click', () => { actionUsers(a._id, 'A', 'DELETE') })
                azioni.append(btnE);
                tr.append(fname);
                tr.append(sname);
                tr.append(email);
                tr.append(azioni);
                tbody.append(tr);
            }
        }
    }
    xhr.send();
}
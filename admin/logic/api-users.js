/* API USERS PAGINA ADMIN */

/**
 * Funzione per il avviare processo di caricament di tutti gli utenti
 */
function getUsers() {
    getDonator();
    getSo();
    getAdmin();
}

/**
 * Funzione per svolgere un'azione su un utente (eliminazine o conferma account) 
 * @param {Intero} id intero che rappresenta l'utente su cui svolgere l'azione
 * @param {Char} type tipo di utente (A, D, H)
 * @param {String} METHOD tipo di metodo (PUT, DELETE)
 */
async function actionUsers(id, type, METHOD) {
    let data = JSON.stringify({
        id : id,
        type : type
    });
    // chiamata a http://localhost/progetto-pweb/api/users.php per eliminare o autenticare l'utente
    const response = await fetch(url + 'users.php?type=' + type, {
        method: METHOD,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    });
    if(response.ok) {
        if(METHOD === 'DELETE') alert("Account eliminato con successo");
        else alert("Account abilitato")
        getUsers();
    }
}

/**
 * Funzione per caricare tutti i donatori
 */
async function getDonator() {
    clearTBody('tbody-donator');
    // chiamata a http://localhost/progetto-pweb/api/users.php per caricare tutti i donatori
    const response = await fetch(url + 'users.php?type=D', {
        method: 'GET'
      });
      if(response.ok) {
        response.json().then((donators) => {
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
                document.getElementById('tbody-donator').append(tr);
            }
        });
    }
}

/**
 * Funzione per caricare tutte le strutture ospedaliere
 */
async function getSo() {
    clearTBody('tbody-so');
    // chiamata a http://localhost/progetto-pweb/api/users.php per caricare tutti i donatori
    const response = await fetch(url + 'users.php?type=H', {
        method: 'GET'
      });
      if(response.ok) {
        response.json().then((hospitals) => {
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
                document.getElementById('tbody-so').append(tr);
            }
        });
    }
}

/**
 * Funzione per caircar tuti gli admin
 */
async function getAdmin() {
    clearTBody('tbody-admin');
    // chiamata a http://localhost/progetto-pweb/api/users.php per caricare tutti i donatori
    const response = await fetch(url + 'users.php?type=A', {
        method: 'GET'
      });
      if(response.ok) {
        response.json().then((admins) => {
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
                if(getCookie('id') !== a._id) { // non può eliminare se stesso dalla lista utenti
                    btnE.innerText = 'E';
                    btnE.addEventListener('click', () => { actionUsers(a._id, 'A', 'DELETE') })
                    azioni.append(btnE);
                }
                tr.append(fname);
                tr.append(sname);
                tr.append(email);
                tr.append(azioni);
                document.getElementById('tbody-admin').append(tr);
            }
        });
    }
}
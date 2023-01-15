/* API DONAZIONE PAGINA DONATORE*/

// url
var url = '../api/';

/**
 * Prende tutte le donazioni effettuate dall'utente
 */
function getDonation() {
    clearTBody('donazioni');
    // chiamata a http://localhost/progetto-pweb/api/donation.php per prendere tutte le donazioni
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + 'donation.php', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        let donations = JSON.parse(xhr.response);
        if(xhr.status === 200){
            for (const d of donations) {
                let tr = document.createElement('tr');
                let data = document.createElement('td');
                let num = document.createElement('td');
                let city = document.createElement('td');
                let used = document.createElement('td');
                
                data.innerText = d.date;
                tr.append(data);
                num.innerText = d.id;
                tr.append(num);
                city.innerText = d.city;
                tr.append(city);
                if(d.isUsed === '0')
                    used.innerText = 'in magazzino';
                else 
                    used.innerText = 'usato';
                tr.append(used);
                document.getElementById('donazioni').append(tr);
            }
        }
    }
    xhr.send();
}

/**
 * Funzione che permette di "donare il sangue"
 */
function donate() {
    // chiamata a http://localhost/progetto-pweb/api/donation.php per aggiungere la donazione
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'donation.php', true);
    xhr.onload = function () { 
        if(xhr.status === 200){
            showMessage('message-d', 'Donazione effettuata ti ringraziamo per la collaborazione. Donare è un gesto di soliderietà, invita gli amici a donare!', 'corretto')
            getDonation(); 
        } else 
            showMessage('message-d', 'Non è stato possibile donare. L\'ultima donazione risale a meno di 3 mesi fa.', 'errore')
    }
    xhr.send();
}


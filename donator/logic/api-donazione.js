/* API DONAZIONE PAGINA DONATORE*/
// url
const url = '../api/';

/**
 * Prende tutte le donazioni effettuate dall'utente
 */
async function getDonation() {
    clearTBody('donazioni');
    // chiamata a http://localhost/progetto-pweb/api/donation.php per prendere tutte le donazioni
    const response = await fetch(url + 'donation.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
      });
    if(response.ok) {
        response.json().then((donations) => {
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
                if(d.isUsed === '0') used.innerText = 'in magazzino';
                else used.innerText = 'usato';
                tr.append(used);
                document.getElementById('donazioni').append(tr);
            }
        });
    }
}

/**
 * Funzione che permette di "donare il sangue"
 */
async function donate() {
    // chiamata a http://localhost/progetto-pweb/api/donation.php per aggiungere la donazione
    const response = await fetch(url + 'donation.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
      });
    if(response.ok) {
        showMessage('message-d', 'Donazione effettuata ti ringraziamo per la collaborazione. Donare è un gesto di soliderietà, invita gli amici a donare!', 'corretto');
        getDonation(); 
    } else if (response.status === 409) // ultima donazione troppo recente 
        showMessage('message-d', 'Non è stato possibile donare. L\'ultima donazione risale a meno di 3 mesi fa.', 'errore');
    else 
        showMessage('message-d', 'Non è stato possibile donare per un errore sul server.', 'errore');

}


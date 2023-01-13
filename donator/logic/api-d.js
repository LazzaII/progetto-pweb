/*
CHIAMATE API
*/

// url
var url = '../api/';
/*
  DONAZIONI
*/
// prende tutte le donazioni
function getDonation() {
    let table = document.getElementById('donazioni');

    // pulisce il contenuto della tabella per poi ripopolarla sotto
    let prevTr = document.querySelectorAll('#donation tr');
    for (let i = 1; i < prevTr.length; i++) // il primo viene saltato perchè è l'header della tabella
        prevTr[i].remove();
    
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
                table.append(tr);
            }
        }
    }
    xhr.send();
}

// donazione
function donate() {
    // chiamata a http://localhost/progetto-pweb/api/donation.php per aggiungere la donazione
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'donation.php', true);
    xhr.onload = function () { 
        if(xhr.status === 200){
            document.getElementById('message-d').classList.add('corretto');
            document.getElementById('message-d').style.display = 'block';
            document.querySelectorAll('#message-d p')[0].innerText = 'Donazione effettuata ti ringraziamo per la collaborazione. Donare è un gesto di soliderietà, invita gli amici a donare!';
            interval = setInterval(() =>  {
                document.getElementById('message-d').style.display = 'none';
                document.getElementById('message-d').classList.remove('corretto');
                clearInterval(interval);
            }, 4000);
            getDonation(); // refresh with new donation
        } else {
            document.getElementById('message-d').classList.add('errore');
            document.getElementById('message-d').style.display = 'block';
            document.querySelectorAll('#message-d p')[0].innerText = 'Non è stato possibile donare. L\'ultima donazione risale a meno di 3 mesi fa.';
            interval = setInterval(() =>  {
                document.getElementById('message-d').style.display = 'none';
                document.getElementById('message-d').classList.remove('errore');
                clearInterval(interval);
            }, 4000);
        }
    }
    xhr.send(null);
}

//ELIMINAZIONE ACCOUNT
function deleteAccount() {
    if(confirm("Sei sicuro di voler eliminare l'account? Clicca su cancel per annullare")){
        let data = JSON.stringify({
            type : 'D'
        });

        // chiamata a http://localhost/progetto-pweb/api/delete.php per eliminare l'account
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

//AGGIORNA INFO 
// controlla la validità degli input
function checkAccount() {
    if(document.getElementById('first').value === '') return 0;
    if(document.getElementById('second').value === '') return 0;
    if(document.getElementById('email').value === '') return 0;
    if(document.getElementById('phone').value === '') return 0;
    if(!validateEmail(document.getElementById('email').value)) return 0;
    return 1;
}
  
function updateInfo() {
    if(checkAccount() === 0) {
      document.getElementById('message-acc').classList.add('errore');
      document.getElementById('message-acc').style.display = 'block';
      document.querySelectorAll('#message-acc p')[0].innerText = 'Compila tutti i campi correttamente';
      interval = setInterval(() =>  {
        document.getElementById('message-acc').style.display = 'none';
        document.getElementById('message-acc').classList.remove('errore');
        clearInterval(interval);
      }, 4000);
      resetInfo();
      return;
    }

    let data = JSON.stringify({
        id : getCookie('id'),
        fn : document.getElementById('first').value,
        sn : document.getElementById('second').value,
        email : document.getElementById('email').value,
        phone : document.getElementById('phone').value,
        pwd : document.getElementById('pwd').value,
        type : 'D'
    })

    // chiamata a http://localhost/progetto-pweb/api/update.php per aggiornare l'account
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

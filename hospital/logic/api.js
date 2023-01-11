/*
CHIAMATE API
*/

// url
var url = '../api/';

function findSite() {
    // find site from blood type
    console.log(document.getElementById('btype').value)
}

//DELETE ACCOUNT

function deleteAccount() {
    if(confirm("Sei sicuro di voler eliminare l'account? Clicca su cancel per annullare")){
        let data = JSON.stringify({
            type : 'H'
        });

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

//UPDATE INFO 

function checkAccount() {
    if(document.getElementById('name').value === '') return 0;
    if(document.getElementById('email').value === '') return 0;
    if(document.getElementById('phone').value === '') return 0;
    if(document.getElementById('address').value === '') return 0;
}
  
function updateInfo() {
    if(checkAccount() === 0) {
      document.getElementById('message-acc').classList.add('errore');
      document.querySelectorAll('#message-acc p')[0].innerText = 'Compila tutti i campi';
      interval = setInterval(() =>  {
        document.getElementById('message-acc').style.display = 'none';
        document.getElementById('message-acc').classList.remove('errore');
        clearInterval(interval);
      }, 4000);
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
            city : document.getElementById('city').value,
            type : 'H'
        })

        // MANCA DA MODIFICARE IL FILE PHP Hospital.PHP manca il controllo della password vuota in update(...)

        let xhr = new XMLHttpRequest();
        xhr.open('PUT', url + 'update.php', true)
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {
            if(xhr.status === 200 ){
                document.getElementById('message-acc').classList.add('corretto');
                document.querySelectorAll('#message-acc p')[0].innerText = 'Informazioni aggiornate';
                interval = setInterval(() =>  {
                    document.getElementById('message-acc').style.display = 'none';
                    document.getElementById('message-acc').classList.remove('corretto');
                    clearInterval(interval);
                }, 4000);
            } else {
                document.getElementById('message-acc').classList.add('errore');
                document.querySelectorAll('#message-acc p')[0].innerText = 'Email inserita già in uso';
                interval = setInterval(() =>  {
                    document.getElementById('message-acc').style.display = 'none';
                    document.getElementById('message-acc').classList.remove('errore');
                    clearInterval(interval);
                }, 4000);
            }
        }
        xhr.send(data);

    }
    resetInfo();
}
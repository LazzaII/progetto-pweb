/* API ACCOUNT PAGINA SO*/
/**
 * Funzione per elimianre l'account
 */
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
                exit();
            }
        }
        xhr.send(data);
    }
}

const infoSo = ['name', 'email', 'phone', 'address']
/**
 * Funzine per aggiornare le informazioni dell'account
 * @returns solo per uscire in caso di errore
 */
function updateInfo() {
    if(!checkInput(infoSo, 1, 2)) {
      showMessage('message-acc', 'Compila i campi correttamente', 'errore')
      resetInfo();
      return;
    }
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
            showMessage('message-acc', 'Informazioni aggiornate', 'corretto')
            resetInfo();
        } else {
            showMessage('message-acc', 'Email inserita già in uso', 'errore')
            resetInfo();
        }
    }
    xhr.send(data);
}
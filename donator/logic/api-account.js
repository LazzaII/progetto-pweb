/* API ACCOUNT PAGINA DONATORE*/
/**
 * Funzione per eliminare l'account
 */
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

const infoDonator = ['first', 'second', 'email', 'phone']
/**
 * Funzione per aggiornare le informazioni
 * @returns solo per uscire in caso di errore
 */
function updateInfo() {
    if(!checkInput(infoDonator, 2, 3)) {
        showMessage('message-acc', 'Compila tutti i campi correttamente', 'errore');
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
            showMessage('message-acc', 'Informazioni aggiornate', 'corretto');
            resetInfo();
        } else { 
            showMessage('message-acc', 'Email inserità già in uso / Numero di telefono troppo lungo', 'errore');
            resetInfo();
        }
    }
    xhr.send(data);
}

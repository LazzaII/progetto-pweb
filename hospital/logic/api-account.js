/* API ACCOUNT PAGINA SO*/
/**
 * Funzione per elimianre l'account
 */
async function deleteAccount() {
    if(confirm("Sei sicuro di voler eliminare l'account? Clicca su cancel per annullare")){
        let data = JSON.stringify({
            type : 'H'
        });
        // chiamata a http://localhost/progetto-pweb/api/delete.php per eliminare l'account
        const response = await fetch(url + 'delete.php', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
          });
        if(response.ok) {
            alert('Account eliminato');
            for (const cookie of cookiesName) // delete al cookie
                deleteCookie(cookie);
            document.location.href = indexUrl; // back to index
        }
    }
}

const infoSo = ['name', 'email', 'phone', 'address']
/**
 * Funzine per aggiornare le informazioni dell'account
 * @returns solo per uscire in caso di errore
 */
async function updateInfo() {
    if(!checkInput(infoSo, 1, 2) || (document.getElementById('pwd').value !== '' && !validatePwd(document.getElementById('pwd').value))) {
        if(document.getElementById('pwd').value !== '') showError('pwd', 'input-errato');
        showMessage('message-acc', 'Compila i campi correttamente', 'errore')
      resetInfo();
      return;
    }
    let data = JSON.stringify({
        id : getCookie('id'),
        name : document.getElementById('name').value,
        email : document.getElementById('email').value.toLowerCase(),
        phone : document.getElementById('phone').value,
        pwd : document.getElementById('pwd').value,
        address : document.getElementById('address').value,
        city : document.getElementById('city-input').value,
        type : 'H'
    })
    // chiamata a http://localhost/progetto-pweb/api/update.php per aggiornare le info dell'account
    const response = await fetch(url + 'update.php', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
      });
    if(response.ok) {
        showMessage('message-acc', 'Informazioni aggiornate', 'corretto')
        resetInfo();
    }
    else if (response.status === 409) {
        showMessage('message-acc', 'Email inserita già in uso', 'errore')
            resetInfo();
    }
}
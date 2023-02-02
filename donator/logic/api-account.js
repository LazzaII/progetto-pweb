/* API ACCOUNT PAGINA DONATORE*/
/**
 * Funzione per eliminare l'account
 */
async function deleteAccount() {
    if(confirm("Sei sicuro di voler eliminare l'account? Clicca su cancel per annullare")){
        let data = JSON.stringify({
            type : 'D'
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

const infoDonator = ['first', 'second', 'email', 'phone']
/**
 * Funzione per aggiornare le informazioni
 * @returns solo per uscire in caso di errore
 */
async function updateInfo() {
    if(!checkInput(infoDonator, 2, 3) || (document.getElementById('pwd').value !== '' && !validatePwd(document.getElementById('pwd').value))) {
        if(document.getElementById('pwd').value !== '') showError('pwd', 'input-errato');
        showMessage('message-acc', 'Compila tutti i campi correttamente', 'errore');
        resetInfo();
        return;
    }
    let data = JSON.stringify({
        id : getCookie('id'),
        fn : document.getElementById('first').value,
        sn : document.getElementById('second').value,
        email : document.getElementById('email').value.toLowerCase(),
        phone : document.getElementById('phone').value,
        pwd : document.getElementById('pwd').value,
        type : 'D'
    })
    // chiamata a http://localhost/progetto-pweb/api/update.php per aggiornare l'account
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

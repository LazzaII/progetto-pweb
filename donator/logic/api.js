/*
CHIAMATE API
*/

// url
var url = '../api/';

// NEWS
function getNews() {
    // clear the div
    document.getElementById('news-container').textContent = '';
  
    // call to http://localhost/progetto-pweb/api/news.php to get all news
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + 'news.php', true);
    xhr.onload = function () {
      let news = JSON.parse(xhr.response);
      let sect = document.getElementById('news-container');
      for (const n of news) {
        // creation of all element
        let article = document.createElement('article');
        article.setAttribute('class', 'box-news')
        let h4 = document.createElement('h4');
        h4.innerText = n.title;
        h4.setAttribute('class', 'news-title')
        let body = document.createElement('p');
        body.innerText = n.body;
        body.setAttribute('class', 'news-body');
        let author = document.createElement('span');
        author.innerText = n.second_name + ' ' + n.first_name; 
        author.setAttribute('class', 'news-author')
        //mettere immagine solo se c'è tempo [probabilmente non ci sarà]
        // merge the element in the article and append at div
        article.append(h4);
        article.append(body);
        article.append(author);
        sect.append(article);
      } 
    }
    xhr.send(null);
}

// MESSAGE
// check input value 
function checkContact() {
    if(document.getElementById('fname').value === '') return 0;
    if(document.getElementById('sname').value === '') return 0;
    if(document.getElementById('c-email').value === '') return 0;
    if(document.getElementById('body').value === '') return 0;
    if(document.getElementById('obj').value === '') return 0;
    return 1;
  }
  
  // send message
function sendMessage() {
    if(checkContact() === 0) {
        document.getElementById('message').classList.add('errore');
        document.querySelectorAll('#message p')[0].innerText = 'Compila tutti i campi correttamente';
        setInterval( () =>  document.getElementById('message').style.display = 'none' , 3000);
        return;
    }

    let data = JSON.stringify({
        fn: document.getElementById('fname').value,
        sn: document.getElementById('sname').value,
        email: document.getElementById('c-email').value,
        body: document.getElementById('body').value,
        obj: document.getElementById('obj').value,
    });

    //clear input type
    document.getElementById('fname').value = "";
    document.getElementById('sname').value = "";
    document.getElementById('c-email').value = "";
    document.getElementById('body').value = "";
    document.getElementById('obj').value = "";

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'message.php', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        if(xhr.status === 200){
            document.getElementById('message').classList.add('corretto');
            document.querySelectorAll('#message p')[0].innerText = 'Messaggio inviato correttamente';
            setInterval( () =>  document.getElementById('message').style.display = 'none' , 3000);
        }
    }
    xhr.send(data);
}

//DONATION
// get donation
function getDonation() {
    let table = document.getElementById('donazioni');

    //clear table
    let prevTr = document.querySelectorAll('#donation tr');
    for (let i = 1; i < prevTr.length; i++) // first one is header so skip
        prevTr[i].remove();
    
    // get donation
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url + 'donation.php', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        let donations = JSON.parse(xhr.response);
        if(xhr.status === 200){
            for (const d of donations) {
                let tr = document.createElement('tr');
                let data = document.createElement('td');
                data.innerText = d.date;
                tr.append(data);
                let num = document.createElement('td');
                num.innerText = d.id;
                tr.append(num);
                let city = document.createElement('td');
                city.innerText = d.city;
                tr.append(city);
                let used = document.createElement('td');
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

// donate
function donate() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'donation.php', true);
    xhr.onload = function () { 
        if(xhr.status === 200){
            document.getElementById('message-d').classList.add('corretto');
            document.querySelectorAll('#message-d p')[0].innerText = 'Donazione effettuata ti ringraziamo per la collaborazione. Donare è un gesto di soliderietà, invita gli amici a donare!';
            setInterval( () =>  document.getElementById('message-d').style.display = 'none' , 4000);
            getDonation(); // refresh with new donation
        } else {
            document.getElementById('message-d').classList.add('errore');
            document.querySelectorAll('#message-d p')[0].innerText = 'Non è stato possibile donare. L\'ultima donazione risale a meno di 3 mesi fa.';
            setInterval( () =>  document.getElementById('message-d').style.display = 'none' , 3000);
        }
    }
    xhr.send(null);
}

//DELETE ACCOUNT
function deleteAccount() {
    if(confirm("Sei sicuro di voler eliminare l'account? Clicca su cancel per annullare")){
        let data = JSON.stringify({
            type : 'D'
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
    if(document.getElementById('first').value === '') return 0;
    if(document.getElementById('second').value === '') return 0;
    if(document.getElementById('email').value === '') return 0;
    if(document.getElementById('phone').value === '') return 0;
    if(document.getElementById('first').value === '') return 0;
}
  
function updateInfo() {
    if(checkAccount() === 0) {
      document.getElementById('message-acc').classList.add('errore');
      document.querySelectorAll('#message-acc p')[0].innerText = 'Compila tutti i campi';
      setInterval( () =>  document.getElementById('message-acc').style.display = 'none' , 3000);
      return;
    }
    else {
        let data = JSON.stringify({
            id : getCookie('id'),
            fn : document.getElementById('first').value,
            sn : document.getElementById('second').value,
            email : document.getElementById('email').value,
            phone : document.getElementById('phone').value,
            pwd : document.getElementById('pwd').value,
            type : 'D'
        })

        let xhr = new XMLHttpRequest();
        xhr.open('PUT', url + 'update.php', true)
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = function () {
            if(xhr.status === 200 ){
                document.getElementById('message-acc').classList.add('corretto');
                document.querySelectorAll('#message-acc p')[0].innerText = 'Informazioni aggiornate';
                setInterval( () =>  document.getElementById('message-acc').style.display = 'none' , 3000);
            } else {
                document.getElementById('message-acc').classList.add('errore');
                document.querySelectorAll('#message-acc p')[0].innerText = 'Email inserita già in uso';
                setInterval( () =>  document.getElementById('message-acc').style.display = 'none' , 3000);
            }
        }
        xhr.send(data);

    }
    resetInfo();
}

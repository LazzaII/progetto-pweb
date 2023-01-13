/*
    LOGIN
*/

//url
var url = '../api/';

// controllo validità degli input
function checkLogin() {
    if(document.getElementById('email-l').value === '') return 0;
    if(document.getElementById('password-l').value === '') return 0;
    return 1;
}
  
function login() {
    if(checkLogin() === 0) {
      document.getElementById('message-l').classList.add('errore');
      document.querySelectorAll('#message-l p')[0].innerText = 'Compila tutti i campi correttamente';
      interval = setInterval(() =>  {
        document.getElementById('message-l').style.display = 'none';
        document.getElementById('message-l').classList.remove('errore');
        clearInterval(interval);
      }, 4000);
      return; 
    }
  
    let data = JSON.stringify({
      email: document.getElementById('email-l').value,
      pwd: document.getElementById('password-l').value,
      type: 'A'
    });
  
    // chiamata a
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'login.php', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
      if(xhr.status === 200){
        document.getElementById('sec-login').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
      } 
      else {
        document.getElementById('message-l').classList.add('errore');
        document.getElementById('message-l').style.display = 'block';
        document.querySelectorAll('#message-l p')[0].innerText = 'Password e/o email errati';
        interval = setInterval(() =>  {
          document.getElementById('message-l').style.display = 'none';
          document.getElementById('message-l').classList.remove('errore');
          clearInterval(interval);
        }, 4000);
      }
    }
    xhr.send(data);
}





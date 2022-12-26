/*
CHIAMATE API
*/

// send message
function sendMessage() {
    let data = JSON.stringify({
      fn: document.getElementById('fname').value,
      sn: document.getElementById('sname').value,
      email: document.getElementById('email').value,
      body: document.getElementById('body').value,
      obj: document.getElementById('obj').value,
    });
  
    fetch('./api/message.php', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
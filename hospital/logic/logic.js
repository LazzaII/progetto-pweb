// index url
var indexUrl = '../';

// useful arrays
var divs = ['request', 'history', 'account',  'news', 'contacts'];
var cookiesName = ['login', 'auth', 'address', 'email', 'name', 'id', 'city', 'cityId', 'phone'];

// SHOW/HIDE

function showRequest() {
  if (document.getElementById('request').style.display === 'none' || document.getElementById('request').style.display === ''){
      document.getElementById('request').style.display = 'block';
      for (let i = 0; i < divs.length; i++) {
          if(divs[i] !== 'request')
              document.getElementById(divs[i]).style.display = 'none';
      }
  }
}

function showHistory() {
  if (document.getElementById('history').style.display === 'none' || document.getElementById('history').style.display === ''){
    document.getElementById('history').style.display = 'block';
    //getHistory(); da scrivere
    for (let i = 0; i < divs.length; i++) {
        if(divs[i] !== 'history')
            document.getElementById(divs[i]).style.display = 'none';
    }
}
}

//show news
function showNews() {
  if (document.getElementById('news').style.display === 'none' || document.getElementById('news').style.display === ''){
      document.getElementById('news').style.display = 'block';
      getNews();  
      for (let i = 0; i < divs.length; i++) {
          if(divs[i] !== 'news')
              document.getElementById(divs[i]).style.display = 'none';
      }
  }
}

//show contact
function showContact() {
  if (document.getElementById('contacts').style.display === 'none' || document.getElementById('contacts').style.display === ''){
      document.getElementById('contacts').style.display = 'block';
      for (let i = 0; i < divs.length; i++) {
          if(divs[i] !== 'contacts')
              document.getElementById(divs[i]).style.display = 'none';
      }
  }
}

//show account
function showAccount() {
  if (document.getElementById('account').style.display === 'none' || document.getElementById('account').style.display === ''){
      document.getElementById('account').style.display = 'block';
      info();
      for (let i = 0; i < divs.length; i++) {
          if(divs[i] !== 'account')
              document.getElementById(divs[i]).style.display = 'none';
      }
  }
}

// COOKIES FUNCTION

function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); 
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
}

function deleteCookie(name) {
    if(getCookie(name) ) {
        document.cookie = name + '=;path=/;domain=localhost ;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
}

// ACCOUNT

function activateModify() {
  console.log( document.getElementById('email'));
  // activate input 
  for (const cookie of cookiesName) {
    if(document.getElementById(cookie) !== null)
      document.getElementById(cookie).disabled = false;
  }
  document.getElementById('pwd').disabled = false;

  // METTERE TUTTE LE CITTÀ IN OUTPUT CON VALORE IL PROPRIO ID

  // active confirm btn e disabled modify and delete
  document.getElementById('btn-modify').style.display = 'none';
  document.getElementById('btn-elimina').style.display = 'none';
  document.getElementById('btn-confirm').style.display = 'block';
  document.getElementById('btn-reset').style.display = 'block';
}

function resetInfo() {
  info();
  for (const cookie of cookiesName) {
    if(document.getElementById(cookie) !== null)
      document.getElementById(cookie).disabled = true;
  }
  document.getElementById('pwd').value = '';
  document.getElementById('pwd').disabled = true;

  document.getElementById('btn-modify').style.display = 'block';
  document.getElementById('btn-elimina').style.display = 'block';  
  document.getElementById('btn-confirm').style.display = 'none';
  document.getElementById('btn-reset').style.display = 'none';
}

// login - logout

function checkLogin() {
    if(!getCookie('login')) document.location.href = indexUrl;
  
  }
  
  function exit() {
    for (const cookie of cookiesName) // delete al cookie
        deleteCookie(cookie);
    document.location.href = indexUrl; // back to index
  }
  
  function info() {
    for (const cookie of cookiesName) {
      if(document.getElementById(cookie) !== null)
        document.getElementById(cookie).value = getCookie(cookie);
    }
  }
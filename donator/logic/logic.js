// FARE GLI SHOW CORRETTI

var indexUrl = '../';

//fare array con nome dei cookie e array con i div
var divs = ['donation', 'account',  'news', 'contacts'];
var cookiesName = ['login', 'auth', 'blood_group', 'email', 'first', 'id', 'second', 'phone']

//show donation
function showDonation() {
  if (document.getElementById('donation').style.display === 'none' || document.getElementById('donation').style.display === ''){
      document.getElementById('donation').style.display = 'block';
      getDonation();  
      for (let i = 0; i < divs.length; i++) {
          if(divs[i] !== 'donation')
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
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach(val => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res
}

function deleteCookie(name) {
  if(getCookie(name) ) {
    document.cookie = name + '=;path=/;domain=localhost ;expires=Thu, 01 Jan 1970 00:00:01 GMT';
  }
}

// LOGIN - LOGOUT

function checkLogin() {
  // manca controllo su account verificato
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
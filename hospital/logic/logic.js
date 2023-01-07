// index url
var indexUrl = '../';

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


// login - logout

function checkLogin() {
    if(!getCookie('login')) document.location.href = indexUrl;
  
    getDonation();
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
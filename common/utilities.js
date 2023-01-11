// get cookie [mettere da chi è preso il codice]
function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); 
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
}

// delete cookie
function deleteCookie(name) {
    if(getCookie(name) ) {
        document.cookie = name + '=;path=/;domain=localhost ;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    }
}

// show div
function showDiv(divName) {
    if (document.getElementById(divName).style.display === 'none' || document.getElementById(divName).style.display === ''){
        document.getElementById(divName).style.display = 'block';
        getNews();  
        for (let i = 0; i < divs.length; i++) {
            if(divs[i] !== divName)
                document.getElementById(divs[i]).style.display = 'none';
        }
    }
}

// account
function info() {
    for (const cookie of cookiesName) {
        if(document.getElementById(cookie) !== null)
        document.getElementById(cookie).value = getCookie(cookie);
    }
}

function exit() {
    for (const cookie of cookiesName) // delete al cookie
        deleteCookie(cookie);
    document.location.href = indexUrl; // back to index
  }
    

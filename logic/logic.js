/*
SHOW/HIDE SECTION
*/

var divs = ['manual', 'why',  'news', 'contacts', 'login'];

//show why
function showWhy() {
    if (document.getElementById('why').style.display === 'none' || document.getElementById('why').style.display === ''){
        document.getElementById('why').style.display = 'block';
        for (let i = 0; i < divs.length; i++) {
             if(divs[i] !== 'why')
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

//show manual
function showManual() {
    if (document.getElementById('manual').style.display === 'none' || document.getElementById('manual').style.display === ''){
        document.getElementById('manual').style.display = 'block';
        for (let i = 0; i < divs.length; i++) {
            if(divs[i] !== 'manual')
                document.getElementById(divs[i]).style.display = 'none';
        }
    }
}

//show login
function showLogin() {
    if (document.getElementById('login').style.display === 'none' || document.getElementById('login').style.display === ''){
        document.getElementById('login').style.display = 'block';
        for (let i = 0; i < divs.length; i++) {
            if(divs[i] !== 'login')
                document.getElementById(divs[i]).style.display = 'none';
        }
    }
}

/*
SHOW/HIDE LOGIN
*/
function showRegister() {
    document.getElementById('form-l').style.display = 'none';
    document.getElementById('form-r').style.display = 'block';
}

// function showLogin() {
//     document.getElementById('form-r').style.display = 'none';
//     document.getElementById('form-l').style.display = 'block';
// }

//ROBA DEL CROCI
/*Password*/
// let isOk = true;

// function setIsOk(val) {
//   isOk = val;
// }

// function getIsOk() {
//   return isOk;
// }

// function setElementValid(id) {
//   document.getElementById(id).classList.remove('invalid');
//   document.getElementById(id).classList.add('valid');
// }

// function setElementInvalid(id) {
//   document.getElementById(id).classList.remove('valid');
//   document.getElementById(id).classList.add('invalid');
// }

// //effettua controlli sulla password
// function checkPassword() {
//   setIsOk(true);
//   let pass = document.getElementById('passInputR').value;

//   //controllo sulla lunghezza
//   if (pass.length >= 8 && pass.length <= 12) {
//     setElementValid('lengthCondition');
//   } else {
//     setElementInvalid('lengthCondition');
//     setIsOk(false);
//   }

//   //controllo sulla lettera minuscola
//   if (/[a-z]/.test(pass)) {
//     setElementValid('lowerCondition');
//   } else {
//     setElementInvalid('lowerCondition');
//     setIsOk(false);
//   }

//   //controllo sulla lettera minuscola
//   if (/[A-Z]/.test(pass)) {
//     setElementValid('upperCondition');
//   } else {
//     setElementInvalid('upperCondition');
//     setIsOk(false);
//   }

//   //controllo del numero
//   if (/\d/.test(pass)) {
//     setElementValid('numberCondition');
//   } else {
//     setElementInvalid('numberCondition');
//     setIsOk(false);
//   }

//   //controllo della conferma
//   if (document.getElementById('passInputR').value === document.getElementById('passConfInput').value) {
//     setElementValid('matchCondition');
//   } else {
//     setElementInvalid('matchCondition');
//     setIsOk(false);
//   }
// }

// function enableRegister() {
//   document.getElementById('registerBtn').disabled = false;
//   document.getElementById('registerBtn').classList.remove('wrongChar');
//   document.getElementById('registerBtn').classList.add('correctChar');
// }

// function disableRegister() {
//   document.getElementById('registerBtn').disabled = true;
//   document.getElementById('registerBtn').classList.remove('correctChar');
//   document.getElementById('registerBtn').classList.add('wrongChar');
// }

// //keyup campo password
// function passKeyUp() {
//   checkPassword();

//   if (getIsOk()) {
//     enableRegister();
//   } else {
//     disableRegister();
//   }
// }

// //keyup campo conferma password
// function confKeyUp() {
//   checkPassword();

//   if (getIsOk()) {
//     enableRegister();
//   } else {
//     disableRegister();
//   }
// }

// /*Gestione form*/
// //mostra il form di registrazione e nasconde il form di login
// function showRegisterForm() {
//   document.getElementById('loginForm').style.display = 'none';
//   document.getElementById('registerForm').style.display = 'block';
// }

// //mostra il form di login e nasconde il form di registrazione
// function showLoginForm() {
//   document.getElementById('registerForm').style.display = 'none';
//   document.getElementById('loginForm').style.display = 'block';
// }




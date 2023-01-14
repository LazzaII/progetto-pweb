// Array utili
var divs = ['manual', 'why',  'news', 'contacts', 'login'];

// Mostra login
function showLogin() {
    if (document.getElementById('login').style.display === 'none' || document.getElementById('login').style.display === ''){
        document.getElementById('login').style.display = 'grid'; //perchè la classe centered è stata gestita con grid
        for (let i = 0; i < divs.length; i++) {
            if(divs[i] !== 'login')
                document.getElementById(divs[i]).style.display = 'none';
        }
        if(document.getElementById('form-l').style.display === 'none'){
            document.getElementById('form-l').style.display = 'grid';  //perchè la classe centered è stata gestita con grid
            document.getElementById('form-r').style.display = 'none';
        }
    }
}

/*
Mostra/nasconde registraizione-login
*/

// mostra registrazione nasconde login
function showRegister() {
    document.getElementById('form-l').style.display = 'none';
    document.getElementById('form-r').style.display = 'grid';  //perchè la classe centered è stata gestita con grid
}

// mostra login nasconde registrazione
function showLoginF() {
    document.getElementById('form-r').style.display = 'none';
    document.getElementById('form-l').style.display = 'grid';  //perchè la classe centered è stata gestita con grid
}

// mostra registrazione donatore
function switchDonatore() {
    document.getElementById('r-so').style.display = 'none';
    document.getElementById('r-donatore').style.display = 'grid';  //perchè la classe centered è stata gestita con grid

    document.getElementById('swSo').classList.remove('selezionato');
    document.getElementById('swDonatore').classList.add('selezionato');
}

// mostra registrazione struttura ospedaliera
function switchSo() {
    document.getElementById('r-donatore').style.display = 'none';
    document.getElementById('r-so').style.display = 'grid';  //perchè la classe centered è stata gestita con grid
    document.getElementById('city-input').innerText = '';
    
    getRegions();
    getCity();

    document.getElementById('swDonatore').classList.remove('selezionato');
    document.getElementById('swSo').classList.add('selezionato');
}
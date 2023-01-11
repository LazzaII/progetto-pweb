/*
SHOW/HIDE SECTION
*/

// useful array
var divs = ['manual', 'why',  'news', 'contacts', 'login'];

//show login
function showLogin() {
    if (document.getElementById('login').style.display === 'none' || document.getElementById('login').style.display === ''){
        document.getElementById('login').style.display = 'block';
        for (let i = 0; i < divs.length; i++) {
            if(divs[i] !== 'login')
                document.getElementById(divs[i]).style.display = 'none';
        }
        if(document.getElementById('form-l').style.display === 'none'){
            document.getElementById('form-l').style.display = 'block';
            document.getElementById('form-r').style.display = 'none';
        }
    }
}

/*
SHOW/HIDE LOGIN
*/

// show register hide login
function showRegister() {
    document.getElementById('form-l').style.display = 'none';
    document.getElementById('form-r').style.display = 'block';
}

// show login hide register
function showLoginF() {
    document.getElementById('form-r').style.display = 'none';
    document.getElementById('form-l').style.display = 'block';   
}

// show donator
function switchDonatore() {
    document.getElementById('r-so').style.display = 'none';
    document.getElementById('r-donatore').style.display = 'block';

    document.getElementById('swSo').classList.remove('selezionato');
    document.getElementById('swDonatore').classList.add('selezionato');
}

// show so
function switchSo() {
    document.getElementById('r-donatore').style.display = 'none';
    document.getElementById('r-so').style.display = 'block';
    document.getElementById('city-input').innerText = '';
    getRegions();
    getCity();

    document.getElementById('swDonatore').classList.remove('selezionato');
    document.getElementById('swSo').classList.add('selezionato');
}
/*
SHOW/HIDE SECTION
*/

// useful array
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

// show login hide reister
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
    getCity();

    document.getElementById('swDonatore').classList.remove('selezionato');
    document.getElementById('swSo').classList.add('selezionato');
}
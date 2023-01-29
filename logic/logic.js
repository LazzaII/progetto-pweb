// Array utili
const divs = ['manual', 'why',  'news', 'contacts', 'login'];

/**
 * Funzione per mostrare la sezione di login.
 * Staccata dalla funzione showDiv perchè grid e non block
 */
function showLogin() {
    if (document.getElementById('login').style.display === 'none' || document.getElementById('login').style.display === ''){
        document.getElementById('login').style.display = 'grid'; //perchè il layout è stato gestit con grid
        for (let i = 0; i < divs.length; i++) {
            if(divs[i] !== 'login')
                document.getElementById(divs[i]).style.display = 'none';
        }
        if(document.getElementById('form-l').style.display === 'none'){
            document.getElementById('form-l').style.display = 'grid';  //perchè il layout è stato gestit con grid
            document.getElementById('form-r').style.display = 'none';
        }
    }
}

/**
 * Funzione per mostrare/nascondere div login/registrazione
 */
function showRegLog() {
    if(document.getElementById('form-l').style.display === 'none'){
        document.getElementById('form-r').style.display = 'none'; 
        document.getElementById('form-l').style.display = 'grid'; //perchè il layout è stato gestit con grid
    }
    else {
        document.getElementById('form-l').style.display = 'none';
        document.getElementById('form-r').style.display = 'grid'; //perchè il layout è stato gestit con grid
    }   
}

/**
 * Funzione per mostrare/nascondere div registrazione donatore/struttura ospedaliera
 */
function showDonatorSo() {
    if(document.getElementById('r-so').style.display === 'grid') {
        document.getElementById('r-so').style.display = 'none';
        document.getElementById('r-donatore').style.display = 'grid';  //perchè la classe centered è stata gestita con grid

        document.getElementById('swSo').classList.remove('selezionato');
        document.getElementById('swDonatore').classList.add('selezionato');
    }
    else {
        document.getElementById('r-so').style.display = 'grid';  //perchè la classe centered è stata gestita con grid
        document.getElementById('r-donatore').style.display = 'none';
        document.getElementById('city-input').innerText = '';
        
        getRegions();
        getCity();

        document.getElementById('swDonatore').classList.remove('selezionato');
        document.getElementById('swSo').classList.add('selezionato');
    }
}


function isLogged() {
    if(getCookie('login')) {
        switch (getCookie('type')) {
            case 'D':
                document.location.href = 'donator'; // redirect all'index della struttura ospedaliera
                break;
            case 'H':
                document.location.href = 'hospital'; // redirect all'index dell donatore
                break;
            default:
                document.location.href = 'admin'; // redirect all'index dell donatore
                break;
        }
    }
}


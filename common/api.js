/* API IN COMUNE ALLE VARIE PAGINE */
/**
 * Funzione per prendere le regioni e creare il menù 
 * @param {Number} setDef intero per prendere la regione default (si utilizza nella modifica delle info)
 */
async function getRegions(setDef = null) {
  // chiamata a http://localhost/progetto-pweb/api/region.php per prendere tutte le regioni
  const response = await fetch(url + 'region.php', {
    method: 'GET'
  });
  if(response.ok) {
    response.json().then((regions) => {
      select = document.getElementById('region-input');
      for (const region of regions) {
        opt = document.createElement('option');
        opt.innerText = region.name;
        opt.setAttribute('value', region._id);
        select.append(opt);
      }
      // nella registrazione non ci sono cookie quindi va bene qualsiasi regione
      // nelle info degli account invece serve settare come default quella dei cookie
      if(setDef !== null) {
        document.getElementById('region-input').value = setDef;
        document.getElementById('city-input').innerText = '' // svuoto la citt attuale
        getCity(getCookie('cityId'));
      }
    });
  } 
}
  
/**
 * Funzione per prendere le città e creare il menù 
 * @param {Number} setDef intero per prendere la città default (si utilizza nella modifica delle info)
 */
async function getCity(setDef = null) {
  // chiamata a http://localhost/progetto-pweb/api/city.php per prendere tutte le città di una regione
  let region = document.getElementById('region-input').value;
  if(!region) region = 1; // serve solo per settare le città default nella registazione dato che la prima regione è il Lazio
  const response = await fetch(url + 'city.php?region=' + region, {
    method: 'GET'
  });
  if(response.ok) {
    response.json().then((cities) => {
      select = document.getElementById('city-input');
      select.innerText = '';
      for (const city of cities) {
        opt = document.createElement('option');
        opt.innerText = city.name;
        opt.setAttribute('value', city._id)
        select.append(opt);
      }
      if(setDef !== null) document.getElementById('city-input').value = setDef;
    });
  }  
}

/**
 * Funzione per prendere tutt le news
 */
async function getNews() {
  document.getElementById('news-container').textContent = ''; // puliziza del div
  // chiamata a http://localhost/progetto-pweb/api/news.php per prendere tutte le news
  const response = await fetch(url + 'news.php', {
    method: 'GET'
  });
  if(response.ok) {
    response.json().then((news) => {
      let sect = document.getElementById('news-container');
      for (const n of news) {
        let article = document.createElement('article');
        article.setAttribute('class', 'box-news')
        let h4 = document.createElement('h4');
        h4.innerText = n.title;
        h4.setAttribute('class', 'news-title')
        let body = document.createElement('p');
        body.innerText = n.body;
        body.setAttribute('class', 'news-body');
        let author = document.createElement('span');
        author.innerText = n.second_name + ' ' + n.first_name; 
        author.setAttribute('class', 'news-author')
        let image = document.createElement('img')
        image.setAttribute('src', indexUrl + n.img_uri);
        image.setAttribute('class', 'news-img')
        image.setAttribute('alt', 'img-news')
        article.append(h4);
        article.append(image);
        article.append(body);
        article.append(author);
        sect.append(article);
      }
    });
  }
}

const contactInfo = ['fname', 'sname','c-email', 'body', 'obj']
/**
 * Funzione per l'invio di un messagio
 * @returns per uscire in caso di errore
 */
async function sendMessage() {
  if(!checkInput(contactInfo, 2)) {
    showMessage('message', 'Compila tutti i campi correttamente', 'errore');
    return;
  }
  let data = JSON.stringify({
    fn: document.getElementById('fname').value,
    sn: document.getElementById('sname').value,
    email: document.getElementById('c-email').value.toLowerCase(),
    body: document.getElementById('body').value,
    obj: document.getElementById('obj').value,
  });
  // pulisce gli input
  clearValue(contactInfo);
  // chiamata a http://localhost/progetto-pweb/api/message.php per inviare il messaggio
  const response = await fetch(url + 'message.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: data
  });
  if(response.ok) showMessage('message', 'Messaggio inviato correttamente', 'corretto'); 
}

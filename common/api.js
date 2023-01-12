// REGIONI
function getRegions() {
  // chiamata a http://localhost/progetto-pweb/api/region.php per prendere tutte le regioni
    let xhr = new XMLHttpRequest;
    xhr.open('GET', url + 'region.php', true);
    xhr.onload = function () {
      let regions = JSON.parse(xhr.response);
      select = document.getElementById('region-input');
      for (const region of regions) {
        opt = document.createElement('option');
        opt.innerText = region.name;
        opt.setAttribute('value', region._id);
        select.append(opt);
      }
    }
    xhr.send(null);
  }
  
  // CITTÀ
  function getCity() {
    // chiamata a http://localhost/progetto-pweb/api/city.php per prendere tutte le città di una regione
    let xhr = new XMLHttpRequest;
    let region = document.getElementById('region-input').value;
    if(!region) region = 1;
    xhr.open('GET', url + 'city.php?region=' + region, true);
    xhr.onload = function () {
      let cities = JSON.parse(xhr.response);
      select = document.getElementById('city-input');
      select.innerText = '';
      for (const city of cities) {
        opt = document.createElement('option');
        opt.innerText = city.name;
        opt.setAttribute('value', city._id)
        select.append(opt);
      }
    }
    xhr.send(null);
  }

// NEWS
function getNews() {
  // pulisce il dic
  document.getElementById('news-container').textContent = '';

  // chiamata a http://localhost/progetto-pweb/api/news.php per prendere tutte le news
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url + 'news.php', true);
  xhr.onload = function () {
    let news = JSON.parse(xhr.response);
    let sect = document.getElementById('news-container');
    for (const n of news) {
      // creation of all element
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
      // uscite tutti gli elementi in unico articolo e le mette nel div
      article.append(h4);
      article.append(body);
      article.append(author);
      sect.append(article);
    } 
  }
  xhr.send(null);
}

// MESSAGE
// controlla la validità degli input
function checkContact() {
  if(document.getElementById('fname').value === '')return 0;
  if(document.getElementById('sname').value === '') return 0;
  if(document.getElementById('c-email').value === '') return 0;
  if(document.getElementById('body').value === '') return 0;
  if(document.getElementById('obj').value === '') return 0;
  if(!validateEmail(document.getElementById('c-email').value)) return 0;
  return 1;
}
  
// invia messaggio
function sendMessage() {
    if(checkContact() === 0) {
        document.getElementById('message').classList.add('errore');
        document.getElementById('message').style.display = 'block';
        document.querySelectorAll('#message p')[0].innerText = 'Compila tutti i campi correttamente';
        interval = setInterval(() =>  {
            document.getElementById('message').style.display = 'none';
            document.getElementById('message').classList.remove('errore');
            clearInterval(interval);
        }, 4000);
        return;
    }

    let data = JSON.stringify({
        fn: document.getElementById('fname').value,
        sn: document.getElementById('sname').value,
        email: document.getElementById('c-email').value,
        body: document.getElementById('body').value,
        obj: document.getElementById('obj').value,
    });

    // pulisce gli input
    document.getElementById('fname').value = "";
    document.getElementById('sname').value = "";
    document.getElementById('c-email').value = "";
    document.getElementById('body').value = "";
    document.getElementById('obj').value = "";

    // chiamata a http://localhost/progetto-pweb/api/message.php per inviare il messaggio
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url + 'message.php', true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        if(xhr.status === 200){
            document.getElementById('message').classList.add('corretto');
            document.getElementById('message').style.display = 'block';
            document.querySelectorAll('#message p')[0].innerText = 'Messaggio inviato correttamente';
            interval = setInterval(() =>  {
                document.getElementById('message').style.display = 'none';
                document.getElementById('message').classList.remove('corretto');
                clearInterval(interval);
            }, 4000);
        }
    }
    xhr.send(data);
}

/*
'use strict';

let originalData = null;
let map = null;
let marker = null;

document.querySelector('#reset-button').addEventListener('click', () => {
  update(originalData);
});

document.querySelector('.modal button').addEventListener('click', (evt) => {
  evt.target.parentNode.classList.add('hidden');
});

const createArticle = (image, title, texts) => {
  let text = '';
  for (let t of texts) {
    text += `<p>${t}</p>`;
  }

  return `<img src="${image}" alt="${title}">
                <h3 class="card-title">${title}</h3>
                <p>${text}</p>
                <p><button>View</button></p>`;
};

const categoryButtons = (items) => {
  items = removeDuplicates(items, 'category');
  console.log(items);
  document.querySelector('#categories').innerHTML = '';
  for (let item of items) {
    const button = document.createElement('button');
    button.class = 'btn btn-secondary';
    button.innerText = item.category;
    document.querySelector('#categories').appendChild(button);
    button.addEventListener('click', () => {
      sortItems(originalData, item.category);
    });
  }
};

const sortItems = (items, rule) => {
  const newItems = items.filter(item => item.category === rule);
  // console.log(newItems);
  update(newItems);
};

const getData = () => {
  fetch('data.json').then(response => {
    return response.json();
  }).then(items => {
    originalData = items;
    update(items);
  });

};

const removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
};

const update = (items) => {
  categoryButtons(items);
  document.querySelector('main').innerHTML = '';
  for (let item of items) {
    // console.log(item);
    const article = document.createElement('article');
    const time = moment(item.time);
    article.innerHTML = createArticle(item.thumbnail, item.title, [
      '<small>' + time.format('dddd, MMMM Do YYYY, HH:mm') + '</small>',
      item.details]);
    article.addEventListener('click', () => {
      document.querySelector('.modal').classList.remove('hidden');
      document.querySelector('.modal img').src = item.image;
      document.querySelector('.modal h4').innerHTML = item.title;
      resetMap(item);
      document.querySelector('#map').addEventListener('transitionend', () => {
        map.invalidateSize();
      });
    });
    document.querySelector('main').appendChild(article);
  }
};

const initMap = () => {
  map = L.map('map').setView([0, 0], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  getData();
};

const resetMap = (item) => {
  try {
    map.removeLayer(marker);
  } catch (e) {

  }
  const coords = item.coordinates;
  console.log(coords);
  map.panTo([coords.lat, coords.lng]);
  marker = L.marker([coords.lat, coords.lng]).addTo(map);
  map.invalidateSize();
};

initMap();


*/
'use strict';

//import * as data from 'express';

const frm = document.querySelector('#mediaform');
const img = document.querySelector('#image');
const aud = document.querySelector('#aud');
const vid = document.querySelector('#vid');
const div = document.createElement('div');
const main = document.querySelector('main');
const getimg =()=>{

  fetch('./pic/')
  .then((res)=>{return res.json();})
  .then(json => {
    console.log(json);

    for (let i = 0; i<json.length;i++){
      const img = document.createElement('img');
      const ul = document.createElement('ul');
      const li =document.createElement('li')
      img.setAttribute('src',`./medium/${json[i].image}`);
      li.appendChild(img);
      ul.appendChild(li);
      div.appendChild(ul);
      main.appendChild(div);
    }
  });

}
getimg()


const sendForm = (evt) => {

  evt.preventDefault();
  const fd = new FormData(frm);
  const settings = {
    method: 'post',
    body: fd,
  };

  fetch('./upload/', settings).then((response) => {
    console.log(response);
    return response.json();
  }).then((json) => {
        console.log(json);
        //  if (json.mimeType.includes('image')) {
        //    img.src = json.url;
        //  } else if (json.mimeType.includes('audio')) {
        //    aud.src = json.url;
        //  } else {
        //    vid.src = json.url;
      }
  );
};

frm.addEventListener('submit', sendForm);

const formUpdate = document.querySelector('#updateform');
formUpdate.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const frm = new FormData(formUpdate);
  const settings = {
    method: 'post',
    body: frm,
  };
  fetch('/node/upload/', settings)
  .then((res) => {
    getimg();
  });
});
const removeButton = document.createElement('button');
removeButton.setAttribute('type', 'submit');
removeButton.innerText = 'remove';
removeButton.style.backgroundColor = 'red';
removeButton.style.color = 'wheat';
removeButton.className = 'rmButton';
// removeButton.id = json[i].id;
//

const frme = document.createElement('form');
//frme.id = json[i].id;
frme.className = 'rmForm';
frme.enctype = "multipart/form-data";
frme.action = '/x/';
frme.method = 'post';
frme.appendChild(removeButton);
div.appendChild(frme);
main.appendChild(div);

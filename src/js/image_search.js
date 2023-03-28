import Notiflix from 'notiflix';
import axios from "axios";


const API_KEY = '34818216-83cfe1c4dc113fc342b3737b5';
const BASE_URL = 'https://pixabay.com/api/';

const form = document.querySelector('#search-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchQuery = document.querySelector('input').value.trim();
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // handle the response data here
        // renderCollection(data.hits);
        // return data.hits;
        createPhoto(data.hits)
    })
    .catch((error) => console.error(error));
});


function createPhoto(collection) {
    const gallery = document.querySelector('.gallery');
gallery.innerHTML = ''; // clear the previous search results
collection.forEach((image) => {
  const card = document.createElement('div');
  card.classList.add('photo-card');
  card.innerHTML = `
    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item"><b>Likes:</b> ${image.likes}</p>
      <p class="info-item"><b>Views:</b> ${image.views}</p>
      <p class="info-item"><b>Comments:</b> ${image.comments}</p>
      <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
    </div>
  `;
  gallery.appendChild(card);
});

}

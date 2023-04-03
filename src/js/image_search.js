
import Notiflix from 'notiflix';
import axios from "axios";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34818216-83cfe1c4dc113fc342b3737b5';
const IMAGES_PER_PAGE = 40;
const DEFAULT_PARAMS = {
  key: API_KEY,
  image_type: "photo",
  orientation: "horizontal",
  safesearch: "true",
  per_page: IMAGES_PER_PAGE,
};

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let page = 1;
let totalHits = 0;

loadMoreBtn.classList.add('visually-hidden');

form.addEventListener('submit', e => {
  e.preventDefault();
  searchQuery = e.target.elements.searchQuery.value.trim();
  page = 1; 
  gallery.innerHTML = ''; 
  searchImages();
});

loadMoreBtn.addEventListener('click', searchImages);

async function searchImages() {
  if (!searchQuery) {
    // loadMoreBtn.classList.add('visually-hidden');
    Notiflix.Notify.info("Please, enter what you are looking for.");
    return;
  }

  try {
    const params = {...DEFAULT_PARAMS, q: searchQuery, page};
    const {data: {hits, totalHits: newTotalHits}} = await axios.get(BASE_URL, {params});

    if (!hits.length) {
      loadMoreBtn.classList.add('visually-hidden');
      gallery.innerHTML = ''
     
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    createGalleryCards(hits);
    totalHits = newTotalHits;

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

    if (gallery.children.length < totalHits) {
      loadMoreBtn.classList.remove('visually-hidden');
    } else {
      loadMoreBtn.classList.add('visually-hidden');
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }

    page += 1;

  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Oops, something went wrong. Please try again later.');
  }
}

function createGalleryCards(images) {
  const galleryCards = images.reduce((accumulator, image) => {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
    accumulator += `
      <div class="photo-card">
        <a href="${largeImageURL}">
          <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" data-src="${largeImageURL}" class="photo-card__image lazyload" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b>: ${likes}</p>
          <p class="info-item"><b>Views</b>: ${views}</p>
          <p class="info-item"><b>Comments</b>: ${comments}</p>
          <p class="info-item"><b>Downloads</b>: ${downloads}</p>
        </div>
      </div>
    `;
    return accumulator;
  }, '');
  gallery.innerHTML += galleryCards;
  simpleLightbox();
}


function simpleLightbox() {
  let gallery = new SimpleLightbox('.photo-card a', {
    overlayOpacity: 0.5,
    captions: true,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    animationSpeed: 350,
    fadeSpeed: 350,
    enableKeyboard: true,
  });
  gallery.refresh();
}

























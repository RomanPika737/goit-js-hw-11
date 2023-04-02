import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = '34818216-83cfe1c4dc113fc342b3737b5';
const BASE_URL = 'https://pixabay.com/api/';


const lightbox = new SimpleLightbox('.gallery a', { 
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



const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}

refs.loadMoreBtn.classList.add('visually-hidden');


let searchQuery = '';
let currentPage = 1;



refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;

function onSearch(event){
resetPage();
event.preventDefault();
clearData();
  searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  refs.loadMoreBtn.classList.add('visually-hidden');
  
  // const url = axios.get(`${BASE_URL}?key = ${API_KEY}`, {
  //   params: {
  //     q: searchQuery,
  //     image_type: "photo",
  //     orientation: "horizontal",
  //     safesearch: "true",
  //     currentPage,
  //   }
  // });

const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
if (searchQuery === '') {
  refs.loadMoreBtn.classList.add('visually-hidden');
  Notiflix.Notify.info("Please, enter what you are looking for.");
}
else{
  fetchImage(url).then(cards => {
    if (cards.total === 0) {
      refs.loadMoreBtn.classList.add('visually-hidden');
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
else{
  Notiflix.Notify.success(`Hooray! We found ${cards.totalHits} images.`);
}
  })
}
}

async function fetchImage(url){
  try {
    const response = await axios(url);
    const cards = response.data;
    refs.gallery.insertAdjacentHTML('beforeend', createGalleryCards(cards));
    currentPage +=1;
    refs.loadMoreBtn.classList.remove('visually-hidden');
    lightbox.refresh();
    return cards;
  } catch{
    refs.loadMoreBtn.classList.add('visually-hidden');
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
}



function onLoadMore() {
  
  // const url = axios.get(`${BASE_URL}?key = ${API_KEY}`, {
  //   params: {
  //     q: searchQuery,
  //     image_type: "photo",
  //     orientation: "horizontal",
  //     safesearch: "true",
  //     currentPage,
  //   }
  // });

  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
  fetchImage(url);
}

function createGalleryCards(cards){
    return cards.hits.map(({webformatURL,largeImageURL,tags,likes,views,comments, downloads}) => {
return `
      <div class="photo-card">
      <a href = "${largeImageURL}">
        <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy"  data-src="${largeImageURL}" class="photo-card__image lazyload" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b>: ${likes}</p>
          <p class="info-item"><b>Views</b>: ${views}</p>
          <p class="info-item"><b>Comments</b>: ${comments}</p>
          <p class="info-item"><b>Downloads</b>: ${downloads}</p>
        </div>
      </div>
    `;
    }).join('')
}

function clearData(){
  refs.gallery.innerHTML ='';
}

function resetPage(){
  currentPage = 1;
}




















// import Notiflix from 'notiflix';
// import axios from "axios";
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const BASE_URL = 'https://pixabay.com/api/';

// const form = document.querySelector('#search-form');
// const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');


// let searchQuery = '';
// let page = 1;
// // let totalHits = 0;

// loadMoreBtn.classList.add('visually-hidden');

// form.addEventListener('submit', e => {
//   e.preventDefault();
//   searchQuery = e.target.elements.searchQuery.value.trim();
//   page = 1; 
//   gallery.innerHTML = ''; 
//   onSearchImages();
// });

// loadMoreBtn.addEventListener('click', onSearchImages);

// function onSearchImages() {
//   if (searchQuery === "") {
//         // console.log(data.hits)
//         loadMoreBtn.classList.add('visually-hidden');
//         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//         return;
//       }
 
//   axios.get(`${BASE_URL}`, {
//     params: {
//       key: '34818216-83cfe1c4dc113fc342b3737b5',
//       q: searchQuery,
//       image_type: "photo",
//       orientation: "horizontal",
//       safesearch: "true",
//       page,
//       per_page: '40',
//     }
//   })
//     .then(function (response) {
//       if (response.data.hits.length === 0) {
//         // loadMoreBtn.classList.add('visually-hidden');
//          gallery.innerHTML = ''
//       Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//       return;
//     }
//       // console.log(response.data.hits);
      
//       // return data.hits;
//       createGalleryCards(response.data.hits)
//       // console.log(data.hits)
//       const totalHits = response.data.totalHits;
//       Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
//       // const hits = data.totalHits;
//       // console.log(hits);
      
//       if (gallery.children.length < totalHits) {
//         loadMoreBtn.classList.remove('visually-hidden');
//       } else {
//          gallery.innerHTML = ''
//         loadMoreBtn.classList.add('visually-hidden');
//         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//       }

//       page += 1;
//     })
//     .catch(function (error) {
//       console.log(error);
//       Notiflix.Notify.failure('Oops, something went wrong. Please try again later.');
//     })
// }


// function createGalleryCards(images) {
//   const galleryCards = images.map(image => {
//     const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
//     return `
//       <div class="photo-card">
//       <a href = "${largeImageURL}">
//         <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy"  data-src="${largeImageURL}" class="photo-card__image lazyload" />
//         </a>
//         <div class="info">
//           <p class="info-item"><b>Likes</b>: ${likes}</p>
//           <p class="info-item"><b>Views</b>: ${views}</p>
//           <p class="info-item"><b>Comments</b>: ${comments}</p>
//           <p class="info-item"><b>Downloads</b>: ${downloads}</p>
//         </div>
//       </div>
//     `;
//   }).join('');
//   gallery.insertAdjacentHTML('beforeend', galleryCards);
//   simpleLightbox();
// }


// function simpleLightbox() {
//   let gallery = new SimpleLightbox('.photo-card a', {
//     overlayOpacity: 0.5,
//     captions: true,
//     captionSelector: 'img',
//     captionType: 'attr',
//     captionsData: 'alt',
//     captionPosition: 'bottom',
//     captionDelay: 250,
//     animationSpeed: 350,
//     fadeSpeed: 350,
//     enableKeyboard: true,
//   });
//   gallery.refresh();
// }

import Notiflix from 'notiflix';
import axios from "axios";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');


let searchQuery = '';
let page = 1;
// let totalHits = 0;

loadMoreBtn.classList.add('visually-hidden');

form.addEventListener('submit', e => {
  e.preventDefault();
  searchQuery = e.target.elements.searchQuery.value.trim();
  page = 1; 
  gallery.innerHTML = ''; 
  onSearchImages();
});

loadMoreBtn.addEventListener('click', onSearchImages);

function onSearchImages() {
  if (searchQuery === "") {
        // console.log(data.hits)
        // loadMoreBtn.classList.add('visually-hidden');
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        return;
      }
 
  axios.get(`${BASE_URL}`, {
    params: {
      key: '34818216-83cfe1c4dc113fc342b3737b5',
      q: searchQuery,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: "true",
      page,
      per_page: '20',
    }
  })
    .then(function (response) {
      if (response.data.hits.length === 0) {
      loadMoreBtn.classList.add('visually-hidden');
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      return;
    }
      // console.log(response.data.hits);
      
      // return data.hits;
      createGalleryCards(response.data.hits)
      // console.log(data.hits)
      const totalHits = response.data.totalHits;
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images on your request.`);
      // const hits = data.totalHits;
      // console.log(hits);
      
      if (gallery.children.length < totalHits) {
        loadMoreBtn.classList.remove('visually-hidden');
      } else {
        loadMoreBtn.classList.add('visually-hidden');
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      }

      page += 1;
    })
    .catch(function (error) {
      console.log(error);
      Notiflix.Notify.failure('Oops, something went wrong. Please try again later.');
    })
}


function createGalleryCards(images) {
  const galleryCards = images.map(image => {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
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
  }).join('');
  gallery.insertAdjacentHTML('beforeend', galleryCards);
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






// const BASE_URL = 'https://pixabay.com/api/';


// const form = document.querySelector('#search-form');
// form.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const gallery = document.querySelector('.gallery');
//   gallery.innerHTML = '';
//   const searchPhoto = document.querySelector('input').value.trim();
//   axios.get(`${BASE_URL}`, {
//     params: {
//       key: '34818216-83cfe1c4dc113fc342b3737b5',
//       q: searchPhoto,
//       image_type: "photo",
//       orientation: "horizontal",
//       safesearch: "true"
//     }
//   })
//     .then(function (response) {
//       // console.log(response.data.hits);

//       if (response.data.hits === 0) {
//         // console.log(data.hits)
//         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//         return;
//       }
     
//       // renderCollection(data.hits);
//       // return data.hits;
//       createPhoto(response.data.hits)
//       // console.log(data.hits)
//       const totalHits = response.data.totalHits;
//       Notiflix.Notify.success(`Hooray! We found ${totalHits} images on your request.`);
//       // const hits = data.totalHits;
//       // console.log(hits);
//     })
//     .catch(function (error) {
//       console.log(error);
//     })
//     // .finally(function () {
//     //   // always executed
//     // });
// });

  


// function createPhoto(collection) {
//     const gallery = document.querySelector('.gallery');
//     gallery.innerHTML = '';
   
// collection.forEach((image) => {
//   const card = document.createElement('div');
//   card.classList.add('photo-card');
//   card.innerHTML = `
//     <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
//     <div class="info">
//       <p class="info-item"><b>Likes:</b> ${image.likes}</p>
//       <p class="info-item"><b>Views:</b> ${image.views}</p>
//       <p class="info-item"><b>Comments:</b> ${image.comments}</p>
//       <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
//     </div>
//   `;
//   gallery.appendChild(card);
// });
// }










// const API_KEY = '34818216-83cfe1c4dc113fc342b3737b5';

// const BASE_URL = 'https://pixabay.com/api/';

// const form = document.querySelector('#search-form');
// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//      const gallery = document.querySelector('.gallery');
//     gallery.innerHTML = '';
//   const searchQuery = document.querySelector('input').value.trim();
//   const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;
//   fetch(url)
//     .then((response) => response.json())
//       .then((data) => {
//          if (data.hits === 0) {
//         console.log(data.hits)
//         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//         return;
//       }
     
//         // renderCollection(data.hits);
//         // return data.hits;
//         createPhoto(data.hits)
//           console.log(data.hits)
//             const totalHits = data.totalHits;
//       Notiflix.Notify.success(`Hooray! We found ${totalHits} images on your request.`);
// // const hits = data.totalHits;
// // console.log(hits);
//     })
//     .catch((error) => console.error(error));
// });


// function createPhoto(collection) {
//     const gallery = document.querySelector('.gallery');
//     gallery.innerHTML = '';
   
// collection.forEach((image) => {
//   const card = document.createElement('div');
//   card.classList.add('photo-card');
//   card.innerHTML = `
//     <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
//     <div class="info">
//       <p class="info-item"><b>Likes:</b> ${image.likes}</p>
//       <p class="info-item"><b>Views:</b> ${image.views}</p>
//       <p class="info-item"><b>Comments:</b> ${image.comments}</p>
//       <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
//     </div>
//   `;
//   gallery.appendChild(card);
// });

// }


// // Define a function to handle pagination
// function handlePagination(totalHits) {
// const totalPages = Math.ceil(totalHits / perPage);
// const pagination = document.getElementById('pagination');
// pagination.innerHTML = '';

// for (let i = 1; i <= totalPages; i++) {
// const button = document.createElement('button');
// button.textContent = i;
// if (i === currentPage) {
// button.classList.add('active');
// }
// button.addEventListener('click', () => {
// currentPage = i;
// searchImages(form.searchQuery.value, currentPage)
// .then((data) => {
// displayImages(data.hits);
// handlePagination(data.totalHits);
// });
// });
// pagination.appendChild(button);
// }
// }

// // Add an event listener to the search button
// const searchButton = document.querySelector('.search-button');
// searchButton.addEventListener('click', () => {
// currentPage = 1;
// const searchQuery = document.querySelector('input').value.trim();
// searchImages(searchQuery, currentPage)
// .then((data) => {
// displayImages(data.hits);
// handlePagination(data.totalHits);
// });
// });
// // Initial page load
// searchImages('sunset', currentPage)
// .then((data) => {
// displayImages(data.hits);
// handlePagination(data.totalHits);
// });

// function renderCollection(collection) {
//     const galleryBox = document.querySelector('.gallery');
//     galleryBox.innerHTML = '';
//     const images = collection.map(item => {
//         return `<div class="photo-card">
//         <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
//         <div class="info">
//           <p class="info-item">
//             <b>Likes</b> ${item.likes}
//           </p>
//           <p class="info-item">
//             <b>Views</b>  ${item.views}
//           </p>
//           <p class="info-item">
//             <b>Comments</b>  ${item.comments}
//           </p>
//           <p class="info-item">
//             <b>Downloads</b> ${item.downloads}
//           </p>
//         </div>
//       </div>`
//     }).join("");
//     galleryBox.insertAdjacentHTML('beforeend', images);
// }








// const form = document.querySelector('#search-form');
// form.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const searchQuery = event.target.elements.searchQuery.value;
//   const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`);
//   const data = await response.json();
//   if (data.hits.length === 0) {
//     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//     return;
//   }
//   // Use data.hits to display the images
//   createPhoto(data.hits);
// });

// function createPhoto(collection) {
//     const gallery = document.querySelector('.gallery');
//     gallery.innerHTML = '';
   
//     collection.forEach((image) => {
//       const card = document.createElement('div');
//       card.classList.add('photo-card');
//       card.innerHTML = `
//     <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
//     <div class="info">
//       <p class="info-item"><b>Likes:</b> ${image.likes}</p>
//       <p class="info-item"><b>Views:</b> ${image.views}</p>
//       <p class="info-item"><b>Comments:</b> ${image.comments}</p>
//       <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
//     </div>
//   `;
//       gallery.appendChild(card);
//     });
//   }



















// const searchForm = document.querySelector("#search-form");
// const gallery = document.querySelector(".gallery");

// searchForm.addEventListener("submit", (event) => {
// event.preventDefault();
// const searchQuery = event.target.elements.searchQuery.value.trim();
// if (!searchQuery) {
// return;
// }
// gallery.innerHTML = "";
// searchImages(searchQuery);
// });

// async function searchImages(query) {
// const url = 'https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true';
// try {
// const response = await fetch(url);
// if (!response.ok) {
// throw new Error("An error occurred while fetching the data.");
// }
// const data = await response.json();
// if (data.total === 0) {
// throw new Error("No images found matching the search query.");
// }
// const images = data.hits;
// renderImages(images);
// } catch (error) {
// console.log(error);
// Notiflix.Notify.failure(error.message);
// }
// }


// async function searchImages(query) {
//   if (query.trim() === "") {
//     return;
//   }

//   // Сховати кнопку "Load more"
//   hideLoadMoreBtn();

//   // Якщо це новий пошук, то повертаємо page до початкового значення
//   if (query !== currentQuery) {
//     currentQuery = query;
//     currentPage = 1;
//   }

//   // Виконуємо запит до API Pixabay
//   const response = await fetch(
//     `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
//       query
//     )}&image_type=photo&per_page=40&page=${currentPage}`
//   );
//   const data = await response.json();

//   // Якщо запит мав успішну відповідь, то додаємо зображення до галереї
//   if (response.ok) {
//     // Виводимо повідомлення про кількість знайдених зображень
//     showMessage(`Hooray! We found ${data.totalHits} images.`);

//     // Додати розмітку зображень до галереї
//     addImagesToGallery(data.hits);

//     // Показати кнопку "Load more", якщо загальна кількість зображень більше, ніж поточна кількість
//     if (data.totalHits > currentPage * 40) {
//       showLoadMoreBtn();
//     } else {
//       hideLoadMoreBtn();
//     }

//     // Збільшуємо значення сторінки page для наступного запиту
//     currentPage++;

//     // Викликаємо метод refresh() для SimpleLightbox
//     lightbox.refresh();

//     // Плавне прокручування до початку нових зображень
//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: "smooth",
//     });
//   } else {
//     // Якщо відповідь не успішна, виводимо повідомлення про помилку
//     showError("Failed to fetch images. Please try again.");
//   }
// }


// const loadMoreBtn = document.querySelector(".load-more");

// function showLoadMoreBtn() {
//   loadMoreBtn.style.display = "block";
// }

// function hideLoadMoreBtn() {
//   loadMoreBtn.style.display = "none";
// }

// function addLoadMoreBtnClickHandler() {
    
// };

// async function fetchImages(query, page = 1, perPage = 40) {
//   const response = await fetch(
//     `${BASE_URL}/?key=${API_KEY}&q=${query}&page=${page}&per_page=${perPage}`
//   );
//   const { hits, totalHits } = await response.json();
//   return { hits, totalHits };
// }


// let currentPage = 1;
// let currentQuery = "";

// async function handleFormSubmit(event) {
//   event.preventDefault();
//   const inputValue = event.currentTarget.elements.query.value.trim();
//   if (!inputValue) return;
//   galleryRef.innerHTML = "";
//   currentPage = 1;
//   currentQuery = inputValue;
//   const { hits, totalHits } = await fetchImages(currentQuery, currentPage);
//   renderGalleryItems(hits);
//   lightbox.refresh();
//   showLoadMoreButton();
//   showTotalHits(totalHits);
// }

// async function handleLoadMoreButtonClick() {
//   const { hits, totalHits } = await fetchImages(
//     currentQuery,
//     ++currentPage
//   );
//   renderGalleryItems(hits);
//   lightbox.refresh();
//   if (galleryRef.children.length >= totalHits) {
//     hideLoadMoreButton();
//     showEndMessage();
//   }
//   scrollToNextGalleryItems();
// }

// function showLoadMoreButton() {
//   loadMoreBtnRef.classList.remove("is-hidden");
// }

// function hideLoadMoreButton() {
//   loadMoreBtnRef.classList.add("is-hidden");
// }

// function showEndMessage() {
//   const endMessage = document.createElement("p");
//   endMessage.textContent = "We're sorry, but you've reached the end of search results.";
//   galleryRef.after(endMessage);
// }


// -------------------------------------------------
// import Notiflix from 'notiflix';
// import axios from 'axios';

// const API_KEY = '34776135-c2da03be0c2ba8614e7d82d4c';
// const BASE_URL = 'https://pixabay.com/api/';

// const refs = {
//     formEl: document.querySelector('#search-form'),
//     cardEl: document.querySelector('.gallery'),
//     loadMoreBtn: document.querySelector('.load-more')
// }

// let searchQuerry = '';
// let currentPage = 1;

// refs.formEl.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore)

// function onSearch(e){
// resetPage();
// e.preventDefault();
// clearContainer();
// searchQuerry = e.currentTarget.elements.searchQuery.value.trim();
// const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuerry}&type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
// if (searchQuerry === '') {
//   refs.loadMoreBtn.classList.add('is-hidden');
//   Notiflix.Notify.failure("Enter something.");
// }
// else{
//   fetchImage(url).then(cards => {
//     if (cards.total === 0) {
//       refs.loadMoreBtn.classList.add('is-hidden');
//       Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//     }
//   })
// }
// }
// // Ось це працює, але чим відрізняється від закоментованого нижче?
// async function fetchImage(url){
//   try {
//     const response = await axios(url);
//     const cards = response.data;
//     refs.cardEl.insertAdjacentHTML('beforeend', renderCards(cards));
//     currentPage +=1;
//     refs.loadMoreBtn.classList.remove('is-hidden');
//     return cards;
//   } catch{
//     refs.loadMoreBtn.classList.add('is-hidden');
//     Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
//   }
// }


// // ============================================================================================
// // 1_Питання: Чому ось це працює тільки коли на 75 стрічці повертаємо не просто response, а response.data,
// // звідки береться ця дата, але не працює кнопка loadmore????

// // function onSearch(e){
// // resetPage();
// // e.preventDefault();
// // clearContainer();
// // searchQuerry = e.currentTarget.elements.searchQuery.value.trim();
// // const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuerry}&type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
// // if (searchQuerry === '') {
// //   refs.loadMoreBtn.classList.add('is-hidden');
// //   Notiflix.Notify.failure("Enter something.");
// // }
// // else{
// //   fetchImage(url).then(cards => {
// //     if (cards.total === 0) {
// //       refs.loadMoreBtn.classList.add('is-hidden');
// //       Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
// //     }else{
// //     refs.cardEl.insertAdjacentHTML('beforeend', renderCards(cards));
// //     currentPage +=1;
// //     refs.loadMoreBtn.classList.remove('is-hidden');
// //     console.log(cards);
// //     }
// //   }).catch(()=>{
// //   refs.loadMoreBtn.classList.add('is-hidden');
// //   Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
// //   })
// //   }
// // }

// // const fetchImage = async (url) =>{
// //   const response = await axios.get(url);
// //   return response;
// // }
// // ==================================================================================================
// // 2_Питання: Чому ось це не працює???
// // const fetchImage = async (url) =>{
// //   const response = await axios.get(url);
// //   return response;
// // }
 
// // fetchImage().then(cards =>
// //   {
// //     refs.cardEl.insertAdjacentHTML('beforeend', renderCards(cards));
// //     currentPage +=1;
// //     refs.loadMoreBtn.classList.remove('is-hidden');
// //     console.log(cards)
// // }
// // ).catch(() => {
// //   refs.loadMoreBtn.classList.add('is-hidden');
// //   Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
// // })

// // ========================================================================================

// // Без асинхронної функції - працює!!!
// // function fetchImage(url){
// //   return fetch(url)
// //   .then(response => response.json())
// //   .then(cards =>
// //     {
// //       refs.cardEl.insertAdjacentHTML('beforeend', renderCards(cards));
// //       currentPage +=1;
// //       refs.loadMoreBtn.classList.remove('is-hidden');
// //       console.log(cards)
// //       return cards;
// // }
// //   )
// //   .catch(() => {
// //     refs.loadMoreBtn.classList.add('is-hidden');
// //     Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
// //   })
// // }

// function onLoadMore(){
//   const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuerry}&type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
//   fetchImage(url);
// }

// function renderCards(cards){
//     return cards.hits.map(({webformatURL,largeImageURL,tags,likes,views,comments, downloads}) => {
// return `<div class="photo-card">
// <img src="${webformatURL}" alt="${tags}" loading="lazy" width='360' height='260'/>
// <div class="info">
//   <p class="info-item">
//     <b>Likes:${likes}</b>
//   </p>
//   <p class="info-item">
//     <b>Views:${views}</b>
//   </p>
//   <p class="info-item">
//     <b>Comments:${comments}</b>
//   </p>
//   <p class="info-item">
//     <b>Downloads:${downloads}</b>
//   </p>
// </div>
// </div>`
//     }).join('')
// }

// function clearContainer(){
//   refs.cardEl.innerHTML ='';
// }

// function resetPage(){
//   currentPage = 1;
// }


// ======================================



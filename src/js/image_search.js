import Notiflix from 'notiflix';
import axios from "axios";


const API_KEY = '34818216-83cfe1c4dc113fc342b3737b5';
const BASE_URL = 'https://pixabay.com/api/';

const form = document.querySelector('#search-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
     const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
  const searchQuery = document.querySelector('input').value.trim();
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
     
        // renderCollection(data.hits);
        // return data.hits;
        createPhoto(data.hits)
    })
    .catch((error) => console.error(error));
});


function createPhoto(collection) {
    const gallery = document.querySelector('.gallery');
gallery.innerHTML = ''; 
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



























// const API_KEY = "ВАШ_УНІКАЛЬНИЙ_КЛЮЧ_ДОСТУПУ_ДО_API";

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

// function renderImages(images) {
//     images.forEach((image) => {
//         const photoCard = document.createElement("div");
//         photoCard.classList.add("photo-card");
//         const img = document.createElement("img");
//         img.classList.add("photo-card-img");
//         img.setAttribute("src", image.webformatURL);
//         img.setAttribute("alt", image.tags);
//         img.setAttribute("loading", "lazy");
//         const info = document.createElement("div");
//         info.classList.add("info");
//         const likes = document.createElement("p");
//         likes.classList.add("info-item");
//         likes.innerHTML = <b>Likes:</b> ${ image.likes };
//         const views = document.createElement("p");
//         views.classList.add("info-item");
//         views.innerHTML = <b>Views:</b> ${ image.views };
//         const comments = document.createElement("p");
//         comments.classList.add("info-item");
//         comments.innerHTML = <b>Comments:</b> ${ image.comments };
//         const downloads = document.createElement("p");
//         downloads.classList.add("info-item");
//         downloads.innerHTML = <b>Downloads:</b> ${ image.downloads };
//     });
// };


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

// function

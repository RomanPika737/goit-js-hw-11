import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
// let searchQuery = '';
// let page = 1;

function getPictures() {
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
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
        Notiflix.Notify.failure('Oops, something went wrong. Please try again later.');
    });
}
export { getPictures };
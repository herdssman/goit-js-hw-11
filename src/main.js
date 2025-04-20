import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery } from "./js/render-function.js";
import { clearGallery } from "./js/render-function.js";

const form = document.querySelector('.form');
const input = document.querySelector('input');
const loader = document.querySelector('.loader');

function showLoader() {
    loader.style.display = 'flex';
}
function hideLoader() {
    loader.style.display = 'none';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    showLoader();

    const query = input.value.trim();

    if (!query) {
        iziToast.warning({
            message: 'Please, enter a search query',
            color: 'yellow',
            position: 'topRight',
        })
        return;
    }

    getImagesByQuery(query)
        .then((data) => {
            if (data.hits.length === 0) {
                iziToast.warning({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    color: 'yellow',
                    position: 'topRight',
                })
                return;
            }

            clearGallery();
            createGallery(data.hits);
        })
        .catch((error) => {
            console.log(error)
            iziToast.error({
                message: 'Something went wrong :(',
                position: 'topRight',
            })
        })
        .finally(() => {
            hideLoader();
        });
})
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49829256-73c1564e94f64863eabbb2525';

export function getImagesByQuery(query) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    };

    return axios.get(BASE_URL, { params })
        .then((resp) => {
            return resp.data;
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
}
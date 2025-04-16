const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";
const API_URL_MOVIE = "https://api.themoviedb.org/3";
const IMG_MOVIE_PATH = "https://image.tmdb.org/t/p/w1280";

const API_URL_LATEST = `${API_URL_MOVIE}/movie/now_playing?api_key=${API_KEY}`;
const API_URL_TRENDING = `${API_URL_MOVIE}/trending/movie/week?api_key=${API_KEY}`;
const API_URL_TOPRATED = `${API_URL_MOVIE}/movie/top_rated?api_key=${API_KEY}`;
const API_URL_SEARCH = `${API_URL_MOVIE}/search/movie?api_key=${API_KEY}&query=`;

window.movieAPI = {
    API_KEY,
    API_URL_MOVIE,
    IMG_MOVIE_PATH,
    API_URL_LATEST,
    API_URL_TRENDING,
    API_URL_TOPRATED,
    API_URL_SEARCH
};

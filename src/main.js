// Axios
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    Headers: {
        'content-Type': 'aplication/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});


// lista de trending: manipulacion del DOM con get y forEach

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    movies.forEach(movie => {
        const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList')
                
        const movieContainer = document.createElement ('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(movieContainer);

        
    });
 }

 // lista de categoria: 
async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    
    categories.forEach(category => {
        const categoriesPreviewList = document.querySelector('#categoriesPreview .categoriesPreview-list')
        
        const categoryContainer = document.createElement ('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer);

        
    });
 }

/*async function getTrendingMoviesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();

    //e1cdc43dbcf841ff332cf38e3744ddb5

    //const movies = data.results; 
    console.log({ data, movies });
} */

/*getTrendingMoviesPreview(); ya no es necesario uarl la llamada en main se hace desde navigation.js
getCategoriesPreview();*/
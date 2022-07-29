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

// utils

function createMovies(movies, container) {
    container.innerHTML = '';

    movies.forEach(movie => {
        //const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList')
                
        const movieContainer = document.createElement ('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });  

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);

        
    });
}

function createCategories(categories, container) {
    container.innerHTML = "";

    categories.forEach(category => {
       
        
        const categoryContainer = document.createElement ('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        categoryTitle.addEventListener('click', () => {
            location.hash = '#category=' + category.id + '-' + category.name;
        });
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewList.appendChild(categoryContainer);

        
    });
}

// lista de trending: manipulacion del DOM con get y forEach

// llamados a API
async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    console.log(movies)

    createMovies(movies, trendingMoviesPreviewList);

   /* trendingMoviesPreviewList.innerHTML = "";

    movies.forEach(movie => {
        //const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList')
                
        const movieContainer = document.createElement ('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(movieContainer);

        
    }); */
 }

 // lista de categoria: 
async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

   
    createCategories(categories, categoriesPreviewList);

    //const categoriesPreviewList = document.querySelector('#categoriesPreview .categoriesPreview-list')
    
    
 }

 async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;

    createMovies(movies, genericSection);

  /*  genericSection.innerHTML = "";

    movies.forEach(movie => {
        //const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList')
                
        const movieContainer = document.createElement ('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        genericSection.appendChild(movieContainer);

        
    }); */
 }

 async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query,
        },
    });
    const movies = data.results;

    createMovies(movies, genericSection);

  
 }

 async function getTrendingMovies() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    createMovies(movies, genericSection);
 }

 async function getMovieById(id) {
    const { data: movie } = await api('movie/' + id);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    console.log(movieImgUrl)
    headerSection.style.background = 
    `linear-gradient(
        180deg, rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%), 
        url(${movieImgUrl})`;
    
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    
    createCategories(movie.genres, movieDetailCategoriesList);
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
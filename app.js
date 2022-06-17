const API_BASE_URL = 'https://api.giphy.com/v1/gifs/search';

const API_KEY = '7dIio8aKf8Xt8ecJJKTkSxFW55jY9di2';
const LIMIT = 25;
const RATING = 'g';

const searchBar = document.querySelector('#search-bar');
const searchButton = document.querySelector('#search-button');
const containerDiv = document.querySelector('.results');
const LoadMoreButton = document.querySelector("#load-more");

/**
 * getRequestParams combines search query with other default request parameters into an object
 * @param {string} query - search query
 * @returns request parameters object
 */
function getRequestParams(query) {
    return {
        'api_key': API_KEY,
        'query': query,
        'offset': 0,
        'limit': LIMIT,
        'rating': RATING,
    }
}

/**
 * createRequestLink makes a full link representing the request with parameters in given `params` object
 * @param {object} params - request parameters object
 * @returns string of full link to resource
 */
function createRequestLink(params) {
    return API_BASE_URL + `?api_key=${params.api_key}&q=${params.query}&limit=${params.limit}&rating=${params.rating}&offset=${params.offset}`;
}

/**
 * getResults asynchronously gets GIFs from the API matching the search query
 * @param {string} link - link representing request to API
 * @returns an array of GIF objects
 */
async function getResults(link) {
    const response = await fetch(link);
    const results = await response.json();

    for (let gif of results.data) {
        containerDiv.innerHTML += `<img src="${gif.url}" alt="${gif.title}"/>`
    }

    return results.data;
}

function updateOffset(params) {
    params.offset += LIMIT;

    return params;
}

function showResults(results) {
    console.log("things are pretty weird right now");
    for (let i = 0; i < results.length; i++) {
        containerDiv.innerHTML += `
        <img src="${results[i].images.downsized.url}" alt="${results[i].title}"/>`
    }
}

var params;

function addEventListeners() {
    searchButton.addEventListener('click', () => {
        if (searchBar.value != "") {
            params = getRequestParams(searchBar.value);
            results = getResults(createRequestLink(params));
            showResults(results);
        }
    });

    LoadMoreButton.addEventListener('click', () => {
        params = updateOffset(params);
        results = getResults(createRequestLink(params));
        showResults(results);
    });
}

window.onload = function() {
    addEventListeners();
}
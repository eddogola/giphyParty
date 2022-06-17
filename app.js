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
 * showResults asynchronously gets GIFs from the API matching the search query
 * and appends them to the main container div
 * @param {string} link - link representing request to API
 * @returns an array of GIF objects
 */
async function showResults(link) {
    const response = await fetch(link);
    const results = await response.json();

    for (let i = 0; i < results.data.length; i++) {
        console.log("are we here")
        containerDiv.innerHTML += `
        <img src="${results.data[i].images.downsized.url}" alt="${results.data[i].title}"/>`
    }
}

/**
 * updateOffset increments the offset value of the request parameters object
 * by the fixed LIMIT value to enable loading more items
 * @param {object} params - request parameters object
 * @returns new, updated parameters object
 */
function updateOffset(params) {
    params.offset += LIMIT;

    return params;
}

/**
 * addEventListeners listens for clicks on both the search and load more button
 * adding gif items to the container div accordingly
 */
function addEventListeners() {
    var params;

    searchButton.addEventListener('click', () => {
        if (searchBar.value != "") {
            params = getRequestParams(searchBar.value);
            showResults(createRequestLink(params));
        }
    });

    LoadMoreButton.addEventListener('click', () => {
        params = updateOffset(params);
        showResults(createRequestLink(params));
    });
}

window.onload = function() {
    addEventListeners();
}
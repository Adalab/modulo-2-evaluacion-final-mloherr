'use strict';
const searchButton = document.querySelector('.js-searchButton');
const inputSearch = document.querySelector('.js-inputSearch');
let showedAnimes = [];

const handleSearch = (event) => {
  event.preventDefault();
  listResults.innerHTML = '';
  const searchValue = inputSearch.value.toLowerCase();

  fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      showedAnimes = data.data;
      renderAnimeCompleteCard(showedAnimes, listResults);
    });
};

searchButton.addEventListener('click', handleSearch);

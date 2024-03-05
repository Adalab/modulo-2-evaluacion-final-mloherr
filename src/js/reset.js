const resetButton = document.querySelector('.js-resetButton');
const resetFavoritesButton = document.querySelector('.js-resetFavoritesButton');

const handleReset = (event) => {
  event.preventDefault();
  listResults.innerHTML = '';
  listFavorites.innerHTML = '';
  localStorage.removeItem('favoritesAnimes');
  inputSearch.value = null;
};
resetButton.addEventListener('click', handleReset);

const handleResetFavorites = (event) => {
  event.preventDefault;
  listFavorites.innerHTML = '';
  localStorage.removeItem('favoritesAnimes');
};

resetFavoritesButton.addEventListener('click', handleResetFavorites);

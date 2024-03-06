const resetButton = document.querySelector('.js-resetButton');
const resetFavoritesButton = document.querySelector('.js-resetFavoritesButton');

const handleReset = (event) => {
  event.preventDefault();
  listResults.innerHTML = '';
  listFavorites.innerHTML = '';
  localStorage.removeItem('favoritesAnimes');
  inputSearch.value = null;
  favoritesAnimes = [];
  sectionFavorites.classList.add('hidden');
};
resetButton.addEventListener('click', handleReset);

const handleResetFavorites = (event) => {
  event.preventDefault;
  listFavorites.innerHTML = '';
  localStorage.removeItem('favoritesAnimes');
  favoritesAnimes = [];
};

resetFavoritesButton.addEventListener('click', handleResetFavorites);

const handleClose = (event) => {
  event.preventDefault();
  const favoritesAnimesLocalStorage = JSON.parse(
    localStorage.getItem('favoritesAnimes')
  );
  const parentElementIndex = favoritesAnimesLocalStorage.findIndex((anime) => {
    return event.currentTarget.parentElement.id === anime.mal_id.toString();
  });
  favoritesAnimesLocalStorage.splice(parentElementIndex, 1);
  localStorage.setItem(
    'favoritesAnimes',
    JSON.stringify(favoritesAnimesLocalStorage)
  );
  listFavorites.innerHTML = '';
  renderFavAnimeCard(favoritesAnimesLocalStorage, listFavorites);
};

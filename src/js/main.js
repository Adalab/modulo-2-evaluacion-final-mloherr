const searchButton = document.querySelector('.js-searchButton');
const resetButton = document.querySelector('.js-resetButton');
const resetFavoritesButton = document.querySelector('.js-resetFavoritesButton');
const inputSearch = document.querySelector('.js-inputSearch');
const listResults = document.querySelector('.js-listResults');
const listFavorites = document.querySelector('.js-listFavorites');
let showedAnimes = [];
let favoritesAnimes = [];

const renderImageCard = (anime) => {
  const animeImage = document.createElement('img');
  if (anime.images.jpg.image_url) {
    animeImage.setAttribute('src', anime.images.jpg.image_url);
  } else {
    animeImage.setAttribute(
      'src',
      'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
    );
  }
  animeImage.setAttribute('alt', 'Portada anime');
  return animeImage;
};

const renderTextCard = (anime) => {
  const animeTitle = document.createElement('h2');
  const textTitle = document.createTextNode(anime.title);
  animeTitle.appendChild(textTitle);
  return animeTitle;
};

const renderAnimeCompleteCard = (array, listContainer) => {
  for (const anime of array) {
    const newLi = document.createElement('li');
    newLi.setAttribute('class', 'js-itemLi');
    newLi.setAttribute('id', anime.mal_id);
    const animeTitle = renderTextCard(anime);
    newLi.appendChild(animeTitle);
    const animeImage = renderImageCard(anime);
    newLi.appendChild(animeImage);
    listContainer.appendChild(newLi);
  }
  // Escucho aquí porque si me hago un return de liElements, lo uso como variable global e intento iterar sobre el array antes de pintar los li, me lo coge como array vacío y no funciona. Igual si la creo como let
  const liElements = document.querySelectorAll('.js-itemLi');
  for (const li of liElements) {
    li.addEventListener('click', handleAddFavorite);
  }
};

const handleSearch = (event) => {
  event.preventDefault();
  listResults.innerHTML = '';
  const searchValue = inputSearch.value.toLowerCase();

  fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      //accediendo al array data que contiene cada info de cada anime
      //muestro cards
      showedAnimes = data.data;
      renderAnimeCompleteCard(showedAnimes, listResults); //guardo valores en mi array showedAnimes
    });
};

const handleAddFavorite = (event) => {
  listFavorites.innerHTML = '';
  const clickedLi = event.currentTarget;
  clickedLi.classList.add('favoriteAnime');

  const animeSelected = showedAnimes.find((anime) => {
    return event.currentTarget.id === anime.mal_id.toString();
  });
  const indexFavoritesAnimes = favoritesAnimes.findIndex((favoriteAnime) => {
    return favoriteAnime.mal_id === event.currentTarget.id;
  }); // Si me devuelve -1, añado el elemento al array. Si no, no lo quiero añadir
  if (indexFavoritesAnimes === -1) {
    favoritesAnimes.push(animeSelected);
  }

  renderFavAnimeCard(favoritesAnimes, listFavorites);
  localStorage.setItem('favoritesAnimes', JSON.stringify(favoritesAnimes));
};

searchButton.addEventListener('click', handleSearch);

const renderFavImage = (anime) => {
  const animeFavImage = document.createElement('img');
  if (anime.images.jpg.image_url) {
    animeFavImage.setAttribute('src', anime.images.jpg.image_url);
  } else {
    animeFavImage.setAttribute(
      'src',
      'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
    );
  }
  animeFavImage.setAttribute('alt', 'Portada anime');
  return animeFavImage;
};

const renderFavTitle = (anime) => {
  const animeFavTitle = document.createElement('h2');
  const textFavTitle = document.createTextNode(anime.title);
  animeFavTitle.appendChild(textFavTitle);
  return animeFavTitle;
};

const renderFavAnimeCard = (array, container) => {
  for (const anime of array) {
    const animeFavImage = renderFavImage(anime);
    const animeFavTitle = renderFavTitle(anime);
    const closeButton = document.createElement('button');
    closeButton.setAttribute('class', 'js-closeButton');
    const textButton = document.createTextNode('X');
    closeButton.appendChild(textButton);
    const newLi = document.createElement('li');
    newLi.setAttribute('class', 'js-itemLi');
    newLi.setAttribute('id', anime.mal_id);
    newLi.appendChild(animeFavTitle);
    newLi.appendChild(animeFavImage);
    newLi.appendChild(closeButton);
    container.appendChild(newLi);
  }
};

const showFavAnimeCard = () => {
  const favoritesAnimesLocalStorage = JSON.parse(
    localStorage.getItem('favoritesAnimes')
  );

  if (favoritesAnimesLocalStorage !== null) {
    renderFavAnimeCard(favoritesAnimesLocalStorage, listFavorites);
  }
};

showFavAnimeCard();

const closeButtonElement = document.querySelectorAll('.js-closeButton');

for (const button of closeButtonElement) {
  button.addEventListener('click', handleClose);
}

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

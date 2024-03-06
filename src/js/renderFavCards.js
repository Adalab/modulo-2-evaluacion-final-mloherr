const listFavorites = document.querySelector('.js-listFavorites');
const sectionFavorites = document.querySelector('.js-sectionFavorites');
let favoritesAnimes = [];

const handleAddFavorite = (event) => {
  sectionFavorites.classList.remove('hidden');
  const favoritesAnimesLocalStorage = JSON.parse(
    localStorage.getItem('favoritesAnimes')
  );
  if (favoritesAnimesLocalStorage !== null) {
    favoritesAnimes = favoritesAnimesLocalStorage;
  }
  listFavorites.innerHTML = '';
  const clickedLi = event.currentTarget;
  clickedLi.classList.add('favoriteAnime');

  const animeSelected = showedAnimes.find((anime) => {
    return event.currentTarget.id === anime.mal_id.toString();
  });
  const indexFavoritesAnimes = favoritesAnimes.findIndex((favoriteAnime) => {
    return favoriteAnime.mal_id.toString() === event.currentTarget.id;
  });
  if (indexFavoritesAnimes === -1) {
    favoritesAnimes.push(animeSelected);
  }

  renderFavAnimeCard(favoritesAnimes, listFavorites);
  localStorage.setItem('favoritesAnimes', JSON.stringify(favoritesAnimes));
};

const renderFavImage = (anime) => {
  const animeFavImage = document.createElement('img');
  if (
    anime.images.jpg.image_url ===
    'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'
  ) {
    animeFavImage.setAttribute(
      'src',
      'https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
    );
  } else {
    animeFavImage.setAttribute('src', anime.images.jpg.image_url);
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
    newLi.setAttribute('class', 'itemLi');
    newLi.setAttribute('id', anime.mal_id);
    newLi.appendChild(animeFavImage);
    newLi.appendChild(animeFavTitle);
    newLi.appendChild(closeButton);
    container.appendChild(newLi);
    const closeButtonElement = document.querySelectorAll('.js-closeButton');
    for (const button of closeButtonElement) {
      button.addEventListener('click', handleClose);
    }
  }
};

const showFavAnimeCard = () => {
  const favoritesAnimesLocalStorage = JSON.parse(
    localStorage.getItem('favoritesAnimes')
  );

  if (favoritesAnimesLocalStorage !== null) {
    renderFavAnimeCard(favoritesAnimesLocalStorage, listFavorites);
  }
  sectionFavorites.classList.remove('hidden');
};

showFavAnimeCard();

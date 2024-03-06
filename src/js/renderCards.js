'use strict';
const listResults = document.querySelector('.js-listResults');

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

// Cuando hago la petición al servidor de las cartas NORMALES que se incluyen en SHOWED CARDS, si esa card ya está en favoritos, le pone por defecto la clase favorite no se que.

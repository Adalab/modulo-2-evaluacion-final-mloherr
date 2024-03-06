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
  const liElements = document.querySelectorAll('.js-itemLi');
  for (const li of liElements) {
    li.addEventListener('click', handleAddFavorite);
  }
};

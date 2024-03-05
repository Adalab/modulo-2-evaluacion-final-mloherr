const searchButton = document.querySelector('.js-searchButton');
const inputSearch = document.querySelector('.js-inputSearch');
const listResults = document.querySelector('.js-listResults');

/*
1. Esuchar el evento de click en el botón.
2. Cuando haga click, recoger el valor del input de búsqueda.
3. Hacer la petición al servidor, indicando como id de la URL el valor del input de búsqueda.
4. Recoger los datos con response y data
5. almacenar data en variable para pintar los resultados en la UL
*/

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

const handleSearch = (event) => {
  event.preventDefault();
  const searchValue = inputSearch.value.toLowerCase();

  fetch(`https://api.jikan.moe/v4/anime?q=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      const allAnimes = data.data; //accediendo al array data que contiene cada info de cada anime
      console.log(allAnimes);
      for (const anime of allAnimes) {
        // console.log(anime);
        const newLi = document.createElement('li');
        const animeTitle = document.createElement('h2');
        const textTitle = document.createTextNode(anime.title);
        animeTitle.appendChild(textTitle);
        newLi.appendChild(animeTitle);
        const animeImage = renderImageCard(anime);
        newLi.appendChild(animeImage);
        console.log(newLi);
        listResults.appendChild(newLi);
      }
    });
};

searchButton.addEventListener('click', handleSearch);

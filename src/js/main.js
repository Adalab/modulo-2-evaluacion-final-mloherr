const searchButton = document.querySelector('.js-searchButton');
const inputSearch = document.querySelector('.js-inputSearch');
const listResults = document.querySelector('.s-listResults');

/*
1. Esuchar el evento de click en el botón.
2. Cuando haga click, recoger el valor del input de búsqueda.
3. Hacer la petición al servidor, indicando como id de la URL el valor del input de búsqueda.
4. Recoger los datos con response y data
5. almacenar data en variable para pintar los resultados en la UL
*/

const handleSearch = (event) => {
  event.preventDefault();
  const searchValue = inputSearch.value.toLowerCase();

  fetch(`https://api.jikan.moe/v4/anime/?q=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('> data', data);
      const allAnimes = data.data; //accediendo al array data que contiene cada info de cada anime
    });
};

searchButton.addEventListener('click', handleSearch);

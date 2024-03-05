const closeButtonElement = document.querySelectorAll('.js-closeButton');

for (const button of closeButtonElement) {
  button.addEventListener('click', handleClose);
}

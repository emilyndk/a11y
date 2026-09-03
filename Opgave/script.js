const infoToggle = document.querySelector('#info-toggle');
const fitInformation = document.querySelector('#fit-information');

infoToggle.addEventListener('click', () => {
  const willOpen = fitInformation.hidden;
  fitInformation.hidden = !willOpen;
  infoToggle.textContent = willOpen
    ? 'Skjul tips om pasform'
    : 'Vis tips om pasform';
});

document.querySelectorAll('.favourite').forEach((button) => {
  button.addEventListener('click', () => {
    const isSelected = button.classList.toggle('is-selected');
    button.querySelector('.heart').textContent = isSelected ? '♥' : '♡';
  });
});

const cartCount = document.querySelector('#cart-count');
const cartStatus = document.querySelector('#cart-status');
let itemsInCart = 0;

document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productName = button.closest('[data-product]').dataset.product;
    itemsInCart += 1;
    cartCount.textContent = itemsInCart;
    cartStatus.textContent = `${productName} er lagt i kurven.`;
  });
});

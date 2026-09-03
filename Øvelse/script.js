const scriptedButton = document.querySelector('#scripted-button');
const activationResult = document.querySelector('#activation-result');

scriptedButton.addEventListener('click', () => {
  activationResult.textContent = 'Den scriptede kontrol modtog en click-event.';
});

const nameDemo = document.querySelector('#name-demo');
const nameMode = document.querySelector('#name-mode');

document.querySelector('[data-name-mode="contents"]').addEventListener('click', () => {
  nameDemo.removeAttribute('aria-label');
  nameDemo.removeAttribute('aria-labelledby');
  nameMode.textContent = 'Aktuel variant: Knappens eget indhold.';
});

document.querySelector('[data-name-mode="label"]').addEventListener('click', () => {
  nameDemo.removeAttribute('aria-labelledby');
  nameDemo.setAttribute('aria-label', 'Tilføj Nike Zoom Vomero 5');
  nameMode.textContent = 'Aktuel variant: aria-label overskriver knappens indhold.';
});

document.querySelector('[data-name-mode="labelledby"]').addEventListener('click', () => {
  nameDemo.removeAttribute('aria-label');
  nameDemo.setAttribute('aria-labelledby', 'name-demo product-title');
  nameMode.textContent = 'Aktuel variant: aria-labelledby sammensætter knappen og produktoverskriften.';
});

const visibilityResult = document.querySelector('#visibility-result');
const ordinaryTarget = document.querySelector('#ordinary-target');
let ordinaryPlaceholder = null;

document.querySelectorAll('[data-visibility]').forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.visibility;
    const kind = button.dataset.kind;
    const target = document.querySelector(`#${targetId}`);

    if (kind === 'hidden') {
      target.hidden = !target.hidden;
      button.innerHTML = target.hidden
        ? 'Fjern <code>hidden</code>'
        : 'Tilføj <code>hidden</code>';
      visibilityResult.textContent = `hidden er nu ${target.hidden ? 'tilføjet' : 'fjernet'}.`;
    }

    if (kind === 'display') {
      const isHidden = target.classList.toggle('display-none');
      button.innerHTML = isHidden
        ? 'Fjern <code>display: none</code>'
        : 'Tilføj <code>display: none</code>';
      visibilityResult.textContent = `display: none er nu ${isHidden ? 'tilføjet' : 'fjernet'}.`;
    }

    if (kind === 'aria-hidden') {
      const isHidden = target.getAttribute('aria-hidden') !== 'true';
      target.setAttribute('aria-hidden', String(isHidden));
      button.innerHTML = isHidden
        ? 'Fjern <code>aria-hidden</code>'
        : 'Tilføj <code>aria-hidden</code>';
      visibilityResult.textContent = `aria-hidden er nu ${isHidden ? 'true' : 'false'}.`;
    }

    if (kind === 'dom') {
      if (ordinaryTarget.isConnected) {
        ordinaryPlaceholder = document.createComment('ordinary-target var her');
        ordinaryTarget.replaceWith(ordinaryPlaceholder);
        button.textContent = 'Sæt tilbage i DOM’en';
        visibilityResult.textContent = 'Det almindelige element er fjernet fra DOM’en.';
      } else {
        ordinaryPlaceholder.replaceWith(ordinaryTarget);
        ordinaryPlaceholder = null;
        button.textContent = 'Fjern fra DOM’en';
        visibilityResult.textContent = 'Det almindelige element er sat tilbage i DOM’en.';
      }
    }
  });
});

const disclosureButton = document.querySelector('#disclosure-button');
const filterPanel = document.querySelector('#filter-panel');

disclosureButton.addEventListener('click', () => {
  const willOpen = disclosureButton.getAttribute('aria-expanded') === 'false';
  disclosureButton.setAttribute('aria-expanded', String(willOpen));
  disclosureButton.textContent = willOpen ? 'Skjul flere producenter' : 'Vis flere producenter';
  filterPanel.hidden = !willOpen;
});

const cartCount = document.querySelector('#cart-count');
const cartItems = document.querySelector('#cart-items');
const cartStatus = document.querySelector('#cart-status');
let itemCount = 0;

document.querySelector('#add-product').addEventListener('click', () => {
  itemCount += 1;
  cartCount.textContent = itemCount;

  const item = document.createElement('li');
  item.textContent = `Et par strømper, tilføjelse ${itemCount}`;
  cartItems.append(item);

  cartStatus.textContent = `Strømper er lagt i kurven. Kurven indeholder nu ${itemCount} ${itemCount === 1 ? 'vare' : 'varer'}.`;
});

const recommendation = document.querySelector('#recommendation');

document.querySelector('#load-recommendation').addEventListener('click', () => {
  const article = document.createElement('article');
  const heading = document.createElement('h4');
  const description = document.createElement('p');
  const link = document.createElement('a');

  heading.textContent = 'Anbefalet til dig';
  description.textContent = 'New Balance 9060 Sea Salt';
  link.href = '#recommendation';
  link.textContent = 'Se anbefalingen';

  article.append(heading, description, link);
  recommendation.replaceChildren(article);
});

document.querySelector('#reset-recommendation').addEventListener('click', () => {
  const emptyMessage = document.createElement('p');
  emptyMessage.textContent = 'Ingen anbefaling indlæst.';
  recommendation.replaceChildren(emptyMessage);
});

document.querySelector('#size-picker').addEventListener('click', (event) => {
  const size = event.target.closest('.size');
  if (!size) return;

  document.querySelectorAll('.size').forEach((button) => {
    button.classList.toggle('selected', button === size);
  });
});

document.querySelector('#broken-cart').addEventListener('click', () => {
  document.querySelector('#broken-result').textContent = 'Kurven ser nu ud til at være åben.';
});

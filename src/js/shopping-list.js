import { searchById } from './api';

import books from '../img/mob-img/shopping-list@1x.png';
import books_2x from '../img/mob-img/shopping-list@2x.png';
import amazon from '../img/services-png/image 1@1x.png';
import amazon_2x from '../img/services-png/image 1@2x.png';
import apple from '../img/services-png/image 2@1x.png';
import apple_2x from '../img/services-png/image 2@2x.png';
import bs from '../img/services-png/image 3@1x.png';
import bs_2x from '../img/services-png/image 3@2x.png';
import iconTrash from '../img/symbol-defs.svg';

// let shoppingStorage = [];
function addToShoppingListEl(e) {
  const id = e.target.dataset.id;
  const textSubmitEl = document.querySelector('.modal-submit-text');
  textSubmitEl.classList.remove('is-hidden');
  // let value = localStorage.getItem('bookinfo');
  // console.log(value);
  // let parsedValue = JSON.parse(value).id;
  const dataFromLS = JSON.parse(localStorage.getItem('shoppingData')) || [];
  if (dataFromLS.find(book => id === book._id)) {
    const newData = dataFromLS.filter(book => book._id !== id);
    localStorage.setItem('shoppingData', JSON.stringify(newData));
    e.target.textContent = 'ADD TO SHOPPING LIST';
    textSubmitEl.classList.add('is-hidden');
    return;
  } else {
    e.target.textContent = 'REMOVE FROM SHOPPING LIST';
    textSubmitEl.classList.remove('is-hidden');
  }

  searchById(id)
    .then(listData => {
      const {
        _id,
        author,
        book_image,
        title,
        list_name,
        description,
        buy_links,
      } = listData;

      const shoppingObject = {
        _id,
        author,
        book_image,
        title,
        list_name,
        description,
        buy_links,
      };
      const newData = JSON.stringify([...dataFromLS, shoppingObject]);

      localStorage.setItem('shoppingData', newData);
    })
    .catch(error => {
      console.log(error);
    });

  // shoppingStorage.push(shoppingObject);

  // renderShoppingList(shoppingStorage);
}

const shoppingListData = document.querySelector('.shopping-list-data');

function renderShoppingList() {
  const dataFromLS = JSON.parse(localStorage.getItem('shoppingData')) || [];
  if (!dataFromLS.length) {
    shoppingListData.innerHTML = `<div class="shopping-text-wrap">
            <p class="shopping-text">
              This page is empty, add some books and proceed to order.
            </p>
          </div>
          <div class="shopping-img-wrap">
            <img
              class="sl-img"
              src="${books}"
              srcset="
                ${books} 1x,
                ${books_2x} 2x
              "
              alt="books"
            />
          </div>`;
    return;
  }
  // ({ author, book_image, title, _id, list_name, description, buy_links })
  const getMarkup = array => `<div class="book-card-container">
${array
  .map(
    ({ author, book_image, title, _id, list_name, description, buy_links }) =>
      `<div class="sl-book-card">
                <div class="sl-book-image-wrap">
                    <img class="sl-book-image" src="${book_image}" alt="${title}">
                </div>
                <div class="sl-book-details">
                    <div class="sl-book-title">
                        ${title}
                    </div>
                    <div class="sl-book-category">
                        ${list_name}
                    </div>
                    <div class="sl-book-description">
                        ${description}
                    </div>
                    <div class="sl-author-wrap">
                        <div class="sl-book-author">
                            ${author}
                        </div>
                        <div class="sl-book-buy-link">
                            <a href="${buy_links[0].url}" target="_blank"><img class="sl-link-img-amazon" src="${amazon}" srcset="${amazon} 1x, ${amazon_2x} 2x" alt="amazon"/></a>
                            <a href="${buy_links[1].url}" target="_blank"><img class="sl-link-img-2" src="${apple}" srcset="${apple} 1x, ${apple_2x} 2x" alt="apple"/></a>
                            <a href="${buy_links[4].url}" target="_blank"><img class="sl-link-img-3" src="${bs}" srcset="${bs} 1x, ${bs_2x} 2x" alt="book-shop"/></a>
                        </div>
                    </div>
                    <button class="sl-book-cart-button" data-id=${_id}>
                        <svg class="sl-book-cart-button-icon" width="28" height="28">
                            <use href='${iconTrash}#icon-trash'></use>
                        </svg>
                    </button>
                </div>
            </div>`
  )
  .join('')}
            
        </div>`;
  shoppingListData.innerHTML = getMarkup(dataFromLS);

  shoppingListData.addEventListener('click', e => {
    if (!e.target.closest('.sl-book-cart-button')) {
      return;
    }
    const id = e.target.closest('.sl-book-cart-button').dataset.id;
    const newData = dataFromLS.filter(book => book._id !== id);
    localStorage.setItem('shoppingData', JSON.stringify(newData));
    renderShoppingList();
  });
}

export { renderShoppingList, addToShoppingListEl };

const currentPageURL = window.location.href;
if (
  currentPageURL ===
  'https://vern-gora.github.io/project-test-pr0ject/shopping-list.html'
) {
  renderShoppingList();
}
// renderShoppingList();
// const newData = dataFromLS.filter(book => book._id !== id);
// localStorage.setItem('shoppingData', JSON.stringify(newData));

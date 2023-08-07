import {
  searchTopBooks,
  searchAllCategory,
  searchById,
  searchCategory,
} from '../js/api.js';
import { addToShoppingListEl } from './shopping-list.js';

import amazon from '../img/services-png/image 1@1x.png';
import amazon_2x from '../img/services-png/image 1@2x.png';
import apple from '../img/services-png/image 2@1x.png';
import apple_2x from '../img/services-png/image 2@2x.png';
import bs from '../img/services-png/image 3@1x.png';
import bs_2x from '../img/services-png/image 3@2x.png';
import defImg116 from '../img/default-img/def-img-116.jpg';
import defImg180 from '../img/default-img/def-img-180.jpg';
import defImg218 from '../img/default-img/def-img-218.jpg';
import defImg335 from '../img/default-img/def-img-335.jpg';

const bookList = document.querySelector('.book-list');
const loader = document.querySelector('.loader');

if (bookList) {
  renderAll(bookList);

  const modalCloseBtn = document.querySelector('[data-modal-cls]');
  const modalEl = document.querySelector('[data-modal-El]');
  const imageEl = document.querySelector('.main-img');
  const titleEl = document.querySelector('.modal-title');
  const authorEl = document.querySelector('.modal-author');
  const descriptionEl = document.querySelector('.modal-description');
  const addToListBtn = document.querySelector('.modal-btn');

  const allColectionsList = document.querySelector('.book-list');
  const modalPopUpEl = document.querySelector('.modal-pop-up');
  // modalOpenBtn.forEach(btn =>

  allColectionsList.addEventListener('click', e => {
    const book = e.target.closest('[data-action="open-modal"]');

    // if (e.target.dataset.action === "open-modal") { }

    // const savedBookId = localStorage.getItem('bookinfo');
    // const parsedBookId = JSON.parse(savedBookId);
    if (book) {
      const bookId = book.dataset.id;
      searchById(bookId).then(data => {
        let include = false;
        const dataFromLS =
          JSON.parse(localStorage.getItem('shoppingData')) || [];
        if (dataFromLS.find(({ _id }) => bookId === _id)) {
          include = true;
        } else {
          include = false;
        }
        const markup = `<div class="modal-content-block">
  <img
    class="main-img"
    src='${data.book_image}'
    alt="${data.title}"
    width="287"
    height="408"
  />
  <div class="modal-text-block">
    <h2 class="modal-title">${data.title}</h2>
    <p class="modal-author">${data.author}</p>
    <p class="modal-description">
      ${data.description}
    </p>

    <ul class="modal-list list">
            <li class="modal-item">
              <div class="modal-icon black_v">
                <a href="${data.amazon_product_url}" target="_blank">
                  <img class="modal-icon-img"
                    src="${amazon}" srcset="${amazon} 1x, ${amazon_2x} 2x"
                    alt="amazon"
                    width="62"
                    height="19"
                  />
                </a>
              </div>
            </li>
            <li class="modal-item">
              <div class="modal-icon">
                <a href="${data.buy_links[1].url}" target="_blank">
                  <img class="modal-icon-img"
                    src="${apple}" srcset="${apple} 1x, ${apple_2x} 2x"
                    alt="apple books"
                    width="33"
                    height="32"
                  />
                </a>
              </div>
            </li>

            <li class="modal-item">
              <div class="modal-icon">
                <a href="${data.buy_links[4].url}" target="_blank">
                  <img class="modal-icon-img"
                    src="${bs}" srcset="${bs} 1x, ${bs_2x} 2x"
                    alt="book shop"
                    width="38"
                    height="36"
                  />
                </a>
              </div>
            </li>
          </ul>
  </div>
</div>

<button type="submit" class="modal-btn" data-id='${bookId}'>${
          include ? 'REMOVE FROM SHOPPING LIST' : 'ADD TO SHOPPING LIST'
        }</button>
<p class="modal-submit-text is-hidden">
  Сongratulations! You have added the book to the shopping list. To
  delete, press the button “Remove from the shopping list”.
</p>`;
        modalPopUpEl.innerHTML = markup;

        const btn = modalPopUpEl.querySelector('.modal-btn');
        btn.addEventListener('click', addToShoppingListEl);
        modalEl.classList.remove('is-hidden');
        document.body.classList.add('no-scroll');
      });
    }
    modalCloseBtn.addEventListener('click', () => {
      modalEl.classList.add('is-hidden');
      document.body.classList.remove('no-scroll');
      modalPopUpEl.innerHTML = '';
    });
  });

  document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') {
      modalEl.classList.add('is-hidden');
      document.body.classList.remove('no-scroll');
      modalPopUpEl.innerHTML = '';
}
  });

  modalEl.addEventListener('click', (event) => {
    if (event.target === modalEl) {
      modalEl.classList.add('is-hidden');
      document.body.classList.remove('no-scroll');
      modalPopUpEl.innerHTML = '';
    }
});
}

function renderAll() {
  searchTopBooks()
    .then(data => {
      renderBooks(data);
    })
    .catch(error => {
      console.log(error);
    });
}

function renderBooks(array) {
  loader.style.display = 'block';
  const markup = array
    .map(
      ({ list_name, books }) =>
        `<div class="home-bestseller-list">
        <h2 class="home-category-heading">${list_name}</h2>
        <div class="home-category-block">
          ${books
            .map(({ author, book_image, title, _id }) => {
              if (book_image) {
                return `
              <div class="home-book-card" data-id="${_id}" data-action="open-modal"> 
                <div class="home-book-image-container">
                  <img src="${book_image}" alt="${title}" class="home-book-image">
                      <div class="home-book-overlay">
                        <div class="home-book-content">Quick view</div>
                      </div>
                </div>
                <h2 class="home-book-title">${title}</h2>
                <h3 class="home-book-author">${author}</h3>
              </div>`;
              }
              return `<li class="home-book-card" data-id="${_id}" data-action="open-modal"> 
          <img srcset="
          ${defImg116} 116w,
          ${defImg180} 180w,
          ${defImg218} 218w,
          ${defImg335} 335w
              "
          sizes="
          (max-width: 375px) 116px,
          (max-width: 768px) 335px,
          (max-width: 1440px) 218px,
          180px
          "  alt="${title}" class="home-book-image">
          <h2 class="home-book-title">${title}</h2>
          <h3 class="home-book-author">${author}</h3>
        </li>`;
            })

            .join('')}
          <button class="see-more" data-category="${list_name}">See more</button>
        </div>
      </div>`
    )
    .join('');
  loader.style.display = 'none';

  // bookList.insertAdjacentHTML('beforeend', markup);
  // addToStorage();

  const markupNew = `<h2 class="home-bestsellers-heading" id="home-bestsellers-heading">
  Best Sellers<span class="books-design"> Books</span>
  </h2>${markup}`;
  bookList.innerHTML = markupNew;

  const buttons = document.querySelectorAll('.see-more');

  buttons.forEach(button => {
    button.addEventListener('click', e => {
      // e.preventDefault();
      const categoryButton = e.currentTarget;
      const categorySelected = categoryButton.dataset.category;

      searchCategory(categorySelected).then(data =>
        renderCategories(data, bookList, categorySelected)
      );
    });
  });

  return markup;
}

function renderCategories(array, container, categorySelected) {
  loader.style.display = 'block';
  const markup =
    `<h2 class="category-name-heading" id="category-heading">${categorySelected}</h2><div class="test">` +
    array
      .map(({ author, image, title, id }) => {
        if (image) {
          return `<div class="home-card" data-id="${id}"  data-action="open-modal">
                    <div class="home-book-image-container">
                      <img src="${image}" alt="${title}" class="home-book-image">
                        <div class="home-book-overlay">
                          <div class="home-book-content">Quick view</div>
                        </div>
                    </div>  
                    <h2 class="home-book-title">${title}</h2>
                    <h3 class="home-book-author">${author}</h3>
              </div>`;
        }

        return `<li class="home-card" data-id="${id}"  data-action="open-modal">
            <img  srcset="
            ${defImg116} 116w,
            ${defImg180} 180w,
            ${defImg218} 218w,
            ${defImg335} 335w
                "
            sizes="
            (max-width: 375px) 116px,
            (max-width: 768px) 335px,
            (max-width: 1440px) 218px,
            180px
            "
            src="${defImg335}"
            alt="${title}" class="home-book-image">
            <div class="home-book-overlay">
                        <div class="home-book-content">Quick view</div>
                      </div>
            <h2 class="home-book-title">${title}</h2>
            <h3 class="home-book-author">${author}</h3>
            </li>`;
      })
      .join('');
  +'</div>';

  container.innerHTML = markup;

  const heading = document.getElementById('category-heading');
  const words = heading.textContent.split(' ');
  const lastWord = words.pop();
  const reconstructedHeading =
    words.join(' ') + ' <span class="books-design">' + lastWord + '</span>';
  heading.innerHTML = reconstructedHeading;

  // addToStorage();
}

export { renderCategories, renderBooks, renderAll };
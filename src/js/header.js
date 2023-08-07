import { signOutHandler as mobsignOutHandler } from './header/profile-mobile';
import { signOutHandler } from './header/profile';

const menuOpenBtn = document.querySelector('button[data-menu-open]');
const menuCloseBtn = document.querySelector('button[data-menu-close]');
const mobMenuEl = document.querySelector('.mob-menu');
const lightLogoEl = document.querySelector('#logo-light');
const darkLogoEl = document.querySelector('#logo-dark');
const lightBagIcon = document.querySelector('#icon-bag');
const darkBagIcon = document.querySelector('#icon-bag-black');

const shoppingListLink = document.querySelector(
  '.header-nav-item-shopping-list'
);
const mobShoppingListLink = document.querySelector(
  '.mob-menu-nav-item-shopping-list'
);
const isActiveIcon = document.querySelector('#is-active-icon');
const mobLightIcon = document.querySelector('#mob-icon-light');
const isActiveMobIcon = document.querySelector('#is-active-mob-icon');

// const headerSignUpBtn = document.querySelector('.sign-up-btn');
// const headerLogOutBtn = document.querySelector('.header-log-out-btn');
const headerUserBtn = document.querySelector('.header-user-btn');
// const seeLogOutBtn = document.querySelector('.see-log-out');

// const mobMenuSignUpBtn = document.querySelector('.mob-menu-sign-up-btn');
const mobMenuLogOutBtn = document.querySelector('.mob-menu-log-out-btn');
// const mobMenuUserOutBtn = document.querySelector('.mob-menu-user-btn');
let localS = localStorage.getItem('theme');
if (localS === 'dark') {
  document.querySelector("body").setAttribute('data-theme', 'dark');
  if(document.querySelector('.body-shopping-list')){;
  document.querySelector(".body-shopping-list").setAttribute('data-theme', 'dark');
  };
}
if (localStorage.getItem('theme') === 'dark') {
  lightLogoEl.classList.add('is-hidden');
  darkLogoEl.classList.remove('is-hidden');
  lightBagIcon.classList.remove('visually-hidden');
  darkBagIcon.classList.add('visually-hidden');

} else {
  lightBagIcon.classList.add('visually-hidden');
  darkBagIcon.classList.remove('visually-hidden');
}

if (document.querySelector('.body-shopping-list')) {
  document.querySelector('.header-nav-item-home').classList.remove('is-active');
  document
    .querySelector('.header-nav-item-shopping-list')
    .classList.add('is-active');
  lightBagIcon.classList.add('null');
  darkBagIcon.classList.add('null');

  isActiveIcon.classList.remove('visually-hidden');
  document
    .querySelector('.mob-menu-nav-item-home')
    .classList.remove('is-active');
  mobShoppingListLink.classList.add('is-active');
  document.querySelector('#mob-icon-light').classList.add('visually-hidden');
  document
    .querySelector('#is-active-mob-icon')
    .classList.remove('visually-hidden');
}

// headerSignUpBtn.addEventListener('click', () => {
//   headerSignUpBtn.classList.add('is-hidden');
//   headerUserBtn.classList.remove('is-hidden');
//   document.querySelector('.sign-log').classList.remove('is-hidden');
// });
// seeLogOutBtn.addEventListener('click', () => {
//   document.querySelector('.sign-log').classList.remove('is-hidden');
//   headerLogOutBtn.classList.remove('is-hidden');
// });
// headerLogOutBtn.addEventListener('click', () => {
//   headerLogOutBtn.classList.add('is-hidden');
//   document.querySelector('.sign-log').classList.add('is-hidden');
//   headerSignUpBtn.classList.remove('is-hidden');
// });

// mobMenuSignUpBtn.addEventListener('click', () => {
//   mobMenuSignUpBtn.classList.add('is-hidden');
//   mobMenuUserOutBtn.classList.remove('is-hidden');
//   mobMenuLogOutBtn.classList.remove('is-hidden');
// });
mobMenuLogOutBtn.addEventListener('click', () => {
  signOutHandler();
  mobsignOutHandler();
});
// mobMenuLogOutBtn.addEventListener('click', () => {
//   mobMenuSignUpBtn.classList.remove('is-hidden');
//   mobMenuUserOutBtn.classList.add('is-hidden');
// });

menuOpenBtn.addEventListener('click', () => {
  mobMenuEl.classList.toggle('visually-hidden');
  menuCloseBtn.classList.toggle('visually-hidden');
  menuOpenBtn.classList.toggle('visually-hidden');
  document.body.classList.toggle('no-scroll');
});

menuCloseBtn.addEventListener('click', () => {
  mobMenuEl.classList.toggle('visually-hidden');
  menuCloseBtn.classList.toggle('visually-hidden');
  menuOpenBtn.classList.toggle('visually-hidden');
  document.body.classList.toggle('no-scroll');
});

const switchTheme = () => {
  const rootEl = document.querySelector('body');
  let dataTheme = rootEl.getAttribute('data-theme'),
    newTheme;
  newTheme = dataTheme === 'light' ? 'dark' : 'light';
  rootEl.setAttribute('data-theme', newTheme);
  lightLogoEl.classList.toggle('is-hidden');
  darkLogoEl.classList.toggle('is-hidden');
  lightBagIcon.classList.toggle('visually-hidden');
  darkBagIcon.classList.toggle('visually-hidden');
  localStorage.setItem('theme', newTheme);
};

document
  .querySelector('.theme-switcher')
  .addEventListener('click', switchTheme);

const homeShoppingListLink = document.querySelector('.header-nav-item-home');

// Get the current page URL
const currentPageURL = window.location.href;

// Check if the current page URL matches the shopping list page
if (currentPageURL.includes('shopping-list.html')) {
  shoppingListLink.classList.add('is-active');
  homeShoppingListLink.classList.remove('is-active');
} else {
  homeShoppingListLink.classList.add('is-active');
  shoppingListLink.classList.remove('is-active');
}

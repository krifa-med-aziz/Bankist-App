'use strict';
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = e => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
////////////////////////
// Scrolling btn
const scrollUp = document.querySelector('.ScrollUp');
const btnLearnMore = document.querySelector('.btn--scroll-to');
const nav = document.querySelector('.nav');
btnLearnMore.addEventListener('click', () =>
  document.querySelector('#section--1').scrollIntoView({ behavior: 'smooth' })
);
window.addEventListener('scroll', () => {
  if (window.scrollY >= 700) {
    scrollUp.classList.remove('hide');
    scrollUp.classList.add('show');
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
    scrollUp.classList.remove('show');
    scrollUp.classList.add('hide');
  }
});
scrollUp.addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('.header').scrollIntoView({ behavior: 'smooth' });
});
////////////////////////
// page navigation
const links = document.querySelectorAll('.nav__link');
links.forEach(el => {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
      const id = this.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });
});
////////////////////////
// OPERATIONS
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content ');

tabsContainer.addEventListener('click', function (e) {
  // tabs
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  // Content
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`)
    .classList.add('operations__content--active');
});
////////////////////////

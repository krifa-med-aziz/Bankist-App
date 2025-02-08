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
const scrollUp = document.querySelector('.scrollToTop');
const btnLearnMore = document.querySelector('.btn--scroll-to');
const nav = document.querySelector('.nav');
btnLearnMore.addEventListener('click', () =>
  document.querySelector('#section--1').scrollIntoView({ behavior: 'smooth' })
);
window.addEventListener('scroll', function () {
  if (window.scrollY >= 700) {
    scrollUp.classList.remove('hidden');
    nav.classList.add('sticky');
  } else {
    scrollUp.classList.add('hidden');
    nav.classList.remove('sticky');
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

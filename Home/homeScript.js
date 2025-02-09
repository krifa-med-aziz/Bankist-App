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
const initialCoords = document
  .querySelector('#section--1')
  .getBoundingClientRect();
const header = document.querySelector('.header');
btnLearnMore.addEventListener('click', () =>
  document.querySelector('#section--1').scrollIntoView({ behavior: 'smooth' })
);
const stickyNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    scrollUp.classList.remove('hide');
    scrollUp.classList.add('show');
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
    scrollUp.classList.remove('show');
    scrollUp.classList.add('hide');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
headerObserver.observe(header);
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
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');
    sibling.forEach(s => {
      if (s !== link) s.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
////////////////////////
// Revealing section on scroll
const allSection = document.querySelectorAll('.section');
const sectionScroll = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(sectionScroll, {
  root: null,
  threshold: 0.2,
});
allSection.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});
////////////////////////
// Lazy loading images
const imgsTargets = document.querySelectorAll('img[data-src]');
const lazyimg = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () =>
      entry.target.classList.remove('lazy-img')
    );
    observer.unobserve(entry.target);
  });
};
const imgObserver = new IntersectionObserver(lazyimg, {
  root: null,
  threshold: 0.5,
});
imgsTargets.forEach(img => {
  imgObserver.observe(img);
});
////////////////////////
// Silder
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
let currSlide = 0;
const maxSlides = slides.length;
const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);
const nextSlide = () => {
  if (currSlide === maxSlides - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide);
};
const prevSlide = () => {
  if (currSlide === 0) currSlide = maxSlides - 1;
  else {
    currSlide--;
  }
  goToSlide(currSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

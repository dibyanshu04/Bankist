'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1  ');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//////////////////////////////////////////////////////

// Button Scrolling
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////
// Page Navigation
// document.querySelectorAll('.nav__link').forEach(function (curEl) {
//   curEl.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     // console.log(id);
//     const el = document.querySelector(id);
//     el.scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add Event listener to common Parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    const el = document.querySelector(id);
    el.scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////////////////////////////////////

// Tabbed components

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  // console.log(clicked);

  // REmove Active Classes
  tabs.forEach(el => {
    el.classList.remove('operations__tab--active');
  });
  tabsContent.forEach(el => {
    el.classList.remove('operations__content--active');
  });

  // Activate content Area
  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
//////////////////////////////////////////////////////

// Sticky Navigation

// const section1Coords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   this.window.scrollY > section1Coords.top
//     ? nav.classList.add('sticky')
//     : nav.classList.remove('sticky');
// });

// Sticky Navigation : intersection observer
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting) nav.classList.remove('sticky');
  else nav.classList.add('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
//////////////////////////////////////////////////////
// Reveal Sections
// Our Job is to remove section--hidden class so that they could be visible only on scrolling

const allSections = document.querySelectorAll('.section');
// 2/
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); //entry.target id the current section
};
// 1.
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
// 3.
allSections.forEach(function (currSection) {
  currSection.classList.add('section--hidden');
  sectionObserver.observe(currSection);
});

//////////////////////////////////////////////////////
// Lazy Image Loader
const imgTarget = document.querySelectorAll('img[data-src]');

const loadImg = (entries, observer) => {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.getAttribute('data-src');

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 1,
});

imgTarget.forEach(img => imageObserver.observe(img));
//////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built');
});

window.addEventListener('load', function (e) {
  console.log('Page Fully Loaded', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault;
  console.log(e);
  e.returnValue = '';
});

//////////////////////////////////////////////////////

// Selection of elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);\
// console.log(allSections);

// const allbuttons = document.getElementsByTagName('button');
// console.log(allbuttons);

// const allBtns = document.getElementsByClassName('btn');
// console.log(allBtns);

// creating and inserting elements
const message = document.createElement('div');
message.innerHTML = `WE use Cookie for improved functionality and analytics. <button class="btn btn--close-cookie">GOT IT!</button>`;
header.append(message);
// header.prepend(message);
// header.append(message.cloneNode(true));
// header.before(message)
// header.after(message).

// Deleting elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

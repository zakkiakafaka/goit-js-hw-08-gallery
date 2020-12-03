import pictures from "./gallery-items.js";

const gallery = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalBtn = document.querySelector('.lightbox__button');
const modalImg = document.querySelector('.lightbox__image');
const overlay = document.querySelector('.lightbox__overlay');
let currentIndex = 0;

pictures.forEach (el => {
    gallery.insertAdjacentHTML('beforeend', 
    `<li class="gallery__item">
    <a class="gallery__link" href="${el.original}">
    <img class="gallery__image" src="${el.preview}" data-source="${el.original}" alt="${el.description}"/>
    </a>
    </li>
    `)
});

const openModal = function (event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') return;
    modal.classList.add('is-open');
    modalImg.src = event.target.dataset.source;
    console.log(modalImg.src);
    document.addEventListener('keydown', keyClose);
    modalBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
};

const closeModal = function () {
    modal.classList.remove('is-open')
    modalImg.src = ""
    document.removeEventListener('keydown', keyClose);
    modalBtn.removeEventListener('click', closeModal);
    overlay.removeEventListener('click', closeModal);
};

const previousImg = () => {
    if (currentIndex > 0 && currentIndex <= pictures.length - 1) {
        currentIndex -= 1;
        modalImg.src = pictures[currentIndex].original;
    } else if (currentIndex === 0) {
        currentIndex = pictures.length -1;
        modalImg.src = pictures[currentIndex].original;
    }
};

const nextImg = () => {
    if (currentIndex >= 0 && currentIndex < pictures.length - 1) {
      currentIndex += 1;
      modalImg.src = pictures[currentIndex].original;
    } else if ((currentIndex = pictures.length - 1)) {
      currentIndex = 0;
      modalImg.src = pictures[currentIndex].original;
    }
  };

const keyClose = (e) => {
    switch (e.key) {
        case "Escape":
            closeModal();
            break;
        case "ArrowLeft":
            previousImg();
            break;
        case "ArrowRight":
            nextImg();
            break;
        default:
            return;
    }
};

gallery.addEventListener('click', openModal);


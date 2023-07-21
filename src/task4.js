import './assets/scss/main.scss';

//<КНОПКА МЕНЮ>=========================================================================================================
const menu = document.querySelector('.header__item-group');
const burgerBtn = document.querySelector('.burger-button');
const crossBtn = document.querySelector('.cross-button');

burgerBtn.addEventListener('click', () => {
  menu.classList.add('active');
})

crossBtn.addEventListener('click', () => {
  menu.classList.remove('active');
})

//<СЛАЙДЕР>=============================================================================================================
const sliders = Array.from(document.querySelectorAll('.my-slider'));

sliders.forEach((slider) => {
  const slideWrapper = slider.querySelector('.my-slider__wrapper');
  const slides = Array.from(slideWrapper.children);
  const prevButton = slider.querySelector('.my-slider__button-prev');
  const nextButton = slider.querySelector('.my-slider__button-next');
  const pagination = slider.querySelector('.my-slider__pagination');

  let currentIndex = 0;

  function goToSlide(index) {
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }

    slideWrapper.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;

    updatePagination();
  }

  function goToPrevSlide() {
    goToSlide(currentIndex - 1);
  }

  function goToNextSlide() {
    goToSlide(currentIndex + 1);
  }

  function createPaginationItem(index) {
    const item = document.createElement('div');
    item.classList.add('my-slider__pagination-item');
    item.addEventListener('click', () => goToSlide(index));
    return item;
  }

  function updatePagination() {
    const paginationItems = Array.from(pagination.children);
    paginationItems.forEach((item, index) => {
      item.classList.toggle('active', index === currentIndex);
    });
  }

  prevButton.addEventListener('click', goToPrevSlide);
  nextButton.addEventListener('click', goToNextSlide);

  slides.forEach((slide, index) => {
    const paginationItem = createPaginationItem(index);
    pagination.appendChild(paginationItem);
  });

  updatePagination();
});
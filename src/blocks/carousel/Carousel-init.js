import Carousel from './Carousel';

$(document).ready(() => {
  const carousel = document.querySelectorAll('.js-carousel');
  const items = [];
  carousel.forEach(((val) =>{
    items.push(new Carousel(val));
  }));
});

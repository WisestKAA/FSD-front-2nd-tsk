import 'owl.carousel/dist/owl.carousel';

class Carousel {
  constructor(elem) {
    this.elem = elem;
    this.init();
  }

  init() {
    Carousel.initCarousel(this.elem.querySelector('.owl-carousel'));
    this.elem.querySelector('.owl-prev').getElementsByTagName('span')[0].textContent = 'keyboard_arrow_left';
    this.elem.querySelector('.owl-next').getElementsByTagName('span')[0].textContent = 'keyboard_arrow_right';
  }

  static initCarousel(owlCarousel) {
    $(owlCarousel).owlCarousel({
      loop: true,
      items: 1,
      mouseDrag: true,
      nav: true,
      dots: true
    });
  }
}

$(document).ready(() => {
  const carousel = document.querySelectorAll('.js-carousel');
  const items = [];
  carousel.forEach(((val) =>{
    items.push(new Carousel(val));
  }));
});

export default Carousel;

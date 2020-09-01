import 'owl.carousel/dist/owl.carousel';

class Carousel {
  constructor(elem) {
    this.elem = elem;
    this.init();
  }

  init() {
    this.initCarousel(this.elem.querySelector('.owl-carousel'));
    this.elem.querySelector('.owl-prev').getElementsByTagName('span')[0].textContent = 'keyboard_arrow_left';
    this.elem.querySelector('.owl-next').getElementsByTagName('span')[0].textContent = 'keyboard_arrow_right';
  }

  initCarousel(owlCarousel) {
    $(owlCarousel).owlCarousel({
      loop: true,
      items: 1,
      mouseDrag: true,
      nav: true,
      dots: true
    });
  }
}

export default Carousel;

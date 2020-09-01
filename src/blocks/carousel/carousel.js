import 'owl.carousel/dist/owl.carousel';

class Carousel {
  constructor(elem) {
    this._elem = elem;
    this._init();
  }

  _init() {
    this._initCarousel(this._elem.querySelector('.owl-carousel'));
    this._elem.querySelector('.owl-prev').getElementsByTagName('span')[0].textContent = 'keyboard_arrow_left';
    this._elem.querySelector('.owl-next').getElementsByTagName('span')[0].textContent = 'keyboard_arrow_right';
  }

  _initCarousel(owlCarousel) {
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

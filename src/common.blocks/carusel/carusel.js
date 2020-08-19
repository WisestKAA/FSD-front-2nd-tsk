import 'owl.carousel/dist/owl.carousel';

class Carusel {
  constructor (elem) {
    this.elem = elem;
    this.init();
  }

  init () {
    this.initCarusel();
    this.initCarusel(this.elem.querySelector('.owl-carousel'));
    this.elem.querySelector('.owl-prev').getElementsByTagName('span')[0].textContent = 'keyboard_arrow_left';
    this.elem.querySelector('.owl-next').getElementsByTagName('span')[0].textContent = 'keyboard_arrow_right';
  }

  initCarusel (owlcarusel) {
    $(owlcarusel).owlCarousel({
      'loop': true,
      'items': 1,
      'mouseDrag': true,
      'nav': true,
      'dots': true,
    });
  }
}

$(document).ready(() => {
  const carusel = document.querySelectorAll('.js-carusel');
  carusel.forEach(((val) =>{
    new Carusel(val);
  }));
});

export default Carusel;

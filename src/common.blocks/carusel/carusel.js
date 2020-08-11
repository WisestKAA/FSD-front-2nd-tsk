
import 'owl.carousel/dist/owl.carousel';

class Carusel {
  constructor (elem) {
    this.initCarusel(elem.querySelector('.owl-carousel'));
    elem.querySelector('.owl-prev').getElementsByTagName('span')[0].textContent = 'keyboard_arrow_left';
    elem.querySelector('.owl-next').getElementsByTagName('span')[0].textContent = 'keyboard_arrow_right';
    console.log(this.prev);
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

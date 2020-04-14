
import 'owl.carousel/dist/owl.carousel'

class Carusel{
    constructor(elem){
        this.initCarusel(elem.querySelector('.owl-carousel'));
    }

    initCarusel(owlcarusel){
        $(owlcarusel).owlCarousel({            
            loop: true,
            items: 1,
            mouseDrag: true,
            nav: true,            
        });
    }
}

$(document).ready(() => {
    const carusel = document.querySelectorAll('.carusel');
    carusel.forEach((val =>{
        new Carusel(val);              
    }));
});
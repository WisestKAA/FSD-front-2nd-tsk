class DropDown {
    constructor (element){
        this.dropdown = element;
        this.select = this.dropdown.querySelector('.dropdown__select');
        this.options = this.dropdown.querySelector('.dropdown__options');

        this.select.addEventListener('click', this.handleSelectClick.bind(this));

    }

    handleSelectClick(){ 
        if (this.dropdown.classList.contains('dropdown_active')) {
            this.hideDropdown();
          } else {
            this.showDropdown();
          } 
    }

    showDropdown(){
        this.dropdown.classList.add('dropdown_active');
        this.options.classList.add('dropdown__options_active');
    }

    hideDropdown(){
        this.dropdown.classList.remove('dropdown_active');
        this.options.classList.remove('dropdown__options_active');
    }
}

$(document).ready(() => {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach((val =>{
        new DropDown(val);
    }));
});
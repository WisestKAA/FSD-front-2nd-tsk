import DropdownOption from '../dropdown-option/dropdown-option.js'; 
import DropdownOptionButton from '../dropdown-option-button/dropdown-option-button.js';

class DropDown {
    constructor (element){
        this.dropdown = element;

        this.select = this.dropdown.querySelector('.dropdown__select');
        this.select.addEventListener('click', this.handleSelectClick.bind(this));

        this.selectText = this.select.querySelector('.dropdown__select_text');
        
        this.options = this.dropdown.querySelector('.dropdown__options');
        
        this.optionsList = this.options.querySelectorAll('.dropdown-option');
        this.optionsListObj = new Array();
        this.optionsList.forEach((val => {
            this.optionsListObj.push(new DropdownOption(val));
        }));
        this.options.addEventListener('DOMSubtreeModified', this.optionsModifed.bind(this));

        this.optionButton = this.options.querySelector('.dropdown-option-button');
        this.optionButtons = new DropdownOptionButton(this.optionButton, this.selectTextm, this.optionsListObj);
        
        this.optionsText = {
            guest : {
                ferst: " гость",
                second: " гостя",
                third: " гостей"
            }            
        };
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

    optionsModifed(){
        this.sum = 0;
        this.optionsList.forEach((val)=>{
            let num = val.querySelector('.dropdown-option__number');
            this.sum += parseInt(num.textContent, 10);
        });
        
        if(this.sum === 0){
            this.selectText.textContent = 'Сколько гостей';
            this.optionButtons.hideDrop();
            return;
        }
        else{
            this.optionButtons.checkHiden();
        }
        
        let newval = this.sum % 100;
        if (newval== 1){
            this.selectText.textContent = this.sum + this.optionsText.guest.ferst;
            return;
        }
        if(newval > 1 && newval <= 4){
            this.selectText.textContent = this.sum + this.optionsText.guest.second;
            return;
        }
        if (newval > 4 && newval <= 20){
            this.selectText.textContent = this.sum + this.optionsText.guest.third;
            return;
        }
        if (newval > 20){
            let val = this.sum % 10;
            if (val == 1){
                this.selectText.textContent = this.sum + this.optionsText.guest.ferst;
                return;
            }
            if(val > 1 && val <= 4){
                this.selectText.textContent = this.sum + this.optionsText.guest.second;
                return;
            }
        }        
        this.selectText.textContent = this.sum + this.optionsText.guest.third;
    }
}

$(document).ready(() => {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach((val =>{
        new DropDown(val);
    }));
});
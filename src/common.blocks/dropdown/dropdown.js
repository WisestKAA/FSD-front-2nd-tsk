import DropdownOption from '../dropdown-option/dropdown-option.js'; 
import DropdownOptionButton from '../dropdown-option-button/dropdown-option-button.js';

class DropDown {
    constructor (element, optionText, isShort = false){
        this.dropdown = element;
        this.isShort = isShort;
        this.optionText = optionText;

        this.select = this.dropdown.querySelector('.dropdown__select');
        this.select.addEventListener('click', this.handleSelectClick.bind(this));

        this.selectText = this.select.querySelector('.dropdown__select_text');
        if(isShort){
            this.defaultSelectText = '0 ' + optionText.bedroom.third + ' 0 ' + optionText.bed.third + ' 0 ' + optionText.bathroom.third;
            this.selectText.textContent = this.defaultSelectText;
        }
        else{
            this.defaultSelectText = this.selectText.textContent;
        }
        
        this.options = this.dropdown.querySelector('.dropdown__options');
        
        this.optionsList = this.options.querySelectorAll('.dropdown-option');
        this.optionsListObj = new Array();
        this.optionsList.forEach((val => {
            this.optionsListObj.push(new DropdownOption(val));
        }));
        this.options.addEventListener('DOMSubtreeModified', this.handleOptionsModifed.bind(this));

        this.optionButton = this.options.querySelector('.dropdown-option-button');
        this.optionButtons = new DropdownOptionButton(this.optionButton, this.selectTextm, this.optionsListObj);        
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

    handleOptionsModifed(){
        this.sum = 0;
        this.optionsList.forEach((val)=>{
            let num = val.querySelector('.dropdown-option__number');
            this.sum += parseInt(num.textContent, 10);
        });
        
        if(this.sum === 0){
            this.selectText.textContent = this.defaultSelectText;
            this.optionButtons.hideDrop();
            return;
        }
        else{
            this.optionButtons.checkHiden();
        }
        
        if(this.isShort){
            this.selectText.textContent = this.getRightTextShort(this.optionText)
        }
        else{
            this.selectText.textContent = this.getRightText(this.optionText.guest, this.sum);
        }
    }

    getRightText(optionText, sum){
        let newval = sum % 100;
        if (newval== 1){
            return sum + optionText.ferst;
        }
        if(newval > 1 && newval <= 4){
            return sum + optionText.second;
        }
        if (newval > 4 && newval <= 20){
            return sum + optionText.third;
        }
        if (newval > 20){
            let val = this.sum % 10;
            if (val == 1){
                return sum + optionText.ferst;
            }
            if(val > 1 && val <= 4){
                return sum + optionText.second;
            }
        }        
        return sum + optionText.third;
    }

    getRightTextShort(optionText){
        var nums = new Array();
        this.optionsList.forEach((val)=>{
            let num = val.querySelector('.dropdown-option__number');
            nums.push(parseInt(num.textContent, 10));
        });
        
        var finalText = '';
        finalText += this.getRightText(optionText.bedroom, nums[0])+' ';
        finalText += this.getRightText(optionText.bed, nums[1])+' ';
        finalText += this.getRightText(optionText.bathroom, nums[2]);
        return finalText;
    }

}

$(document).ready(() => {
    const optionText = {
        guest : {
            ferst: " гость",
            second: " гостя",
            third: " гостей"
        },
        bedroom : {
            ferst: ' спальня',
            second: ' спальни',
            third: ' спален',
        },
        bed : {
            ferst: ' кровать',
            second: ' кровати',
            third: ' кроватей',
        },
        bathroom : {
            ferst: ' ванная комната',
            second: ' ванные комнаты',
            third: ' ванных комнат',
        },
    }

    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach((val =>{
        if(val.classList.contains('dropdown_width-short')){
            new DropDown(val, optionText, true);
        } 
        else{
            new DropDown(val, optionText);
        }        
    }));
});
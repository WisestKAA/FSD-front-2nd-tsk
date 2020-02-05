class Checkbox{
    constructor(elem){
        this.checkbox = elem;

        this.mark = elem.querySelector('.checkbox__button__check-mark');
        
        this.button = elem.querySelector('.checkbox__button');
        this.button.addEventListener('click', this.handleButtonClick.bind(this));

    }

    handleButtonClick(){
        if(this.isChecked()){
            this.mark.classList.remove('checkbox__button__check-mark_display');
            this.button.classList.remove('checkbox__button_checked');
        }else{
            this.mark.classList.add('checkbox__button__check-mark_display');
            this.button.classList.add('checkbox__button_checked');
        }
    }

    isChecked(){
        if(this.mark.classList.contains('checkbox__button__check-mark_display')){
            return true;
        }else{
            return false;
        }

    }    
}

$(document).ready(() => {
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach((val =>{
        new Checkbox(val);
    }));
});
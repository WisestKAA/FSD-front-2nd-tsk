class DropdownOption {
    constructor(element){
        this.option = element;
        
        let buttons = this.option.querySelectorAll('.dropdown-option__circle');
        buttons.forEach(val => {
            if(val.textContent === '-'){
                this.minusButton = val;
            }
            if (val.textContent === '+'){
                this.plusButton = val;
            }
        });

        this.minusButton.addEventListener('click', this.handleMinusClick.bind(this));
        this.plusButton.addEventListener('click', this.handlePlusClick.bind(this));

        this.number = this.option.querySelector('.dropdown-option__number');
        this.value = parseInt(this.number.textContent, 10);
        if (this.value === '') this.value = 0;
        if (this.value === 0) this.disableMinus();
    }

    handleMinusClick(){
        if(this.value > 0){
            this.value -= 1;
        }
        
        if(this.value === 0){
            this.disableMinus();
        }

        this.number.textContent = this.value;
    }

    handlePlusClick(){        
        this.value += 1;
        this.number.textContent = this.value;
    }

    enableMinus(){
        this.minusButton.classList.remove('dropdown-option__circle_disable');
    }

    disableMinus(){
        this.minusButton.classList.add('dropdown-option__circle_disable');
    }
}

export default DropdownOption;
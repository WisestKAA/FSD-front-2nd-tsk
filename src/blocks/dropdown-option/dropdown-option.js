class DropdownOption {
  constructor(element) {
    this.option = element;
    this.init();
    this.addEvents();
  }

  addEvents() {
    this.minusButton.addEventListener('click', this.handleMinusClick.bind(this));
    this.plusButton.addEventListener('click', this.handlePlusClick.bind(this));
    this.number.addEventListener('DOMSubtreeModified', this.handleValueChanged.bind(this));
  }

  init() {
    this.initButtons();
    this.initNumber();
  }

  initButtons() {
    const buttons = this.option.querySelectorAll('.js-dropdown-option__circle');
    buttons.forEach((val) => {
      if (val.textContent === '-') {
        this.minusButton = val;
      }
      if (val.textContent === '+') {
        this.plusButton = val;
      }
    });
  }

  initNumber() {
    this.number = this.option.querySelector('.js-dropdown-option__number');
    this.value = parseInt(this.number.textContent, 10);
    if (this.value === '') this.value = 0;
    if (this.value === 0) this.disableMinus();
  }

  handleMinusClick() {
    if (this.value > 0) {
      this.value -= 1;
    }
    this.number.textContent = this.value;
  }

  handlePlusClick() {
    this.value += 1;
    this.number.textContent = this.value;
    if (this.minusButton.classList.contains('dropdown-option__circle_disable')) {
      this.enableMinus();
    }
  }

  enableMinus() {
    this.minusButton.classList.remove('dropdown-option__circle_disable');
  }

  disableMinus() {
    this.minusButton.classList.add('dropdown-option__circle_disable');
  }

  handleValueChanged() {
    if (this.value === 0) {
      this.disableMinus();
    }
  }

  clearValue() {
    this.number.textContent = 0;
    this.value = 0;
    this.disableMinus();
  }
}

export default DropdownOption;

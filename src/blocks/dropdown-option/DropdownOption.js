import { boundMethod } from 'autobind-decorator';

class DropdownOption {
  constructor(element) {
    this._option = element;
    this._init();
    this._addEvents();
  }

  _addEvents() {
    this._minusButton.addEventListener('click', this._handleMinusClick);
    this._plusButton.addEventListener('click', this._handlePlusClick);
    this._number.addEventListener('DOMSubtreeModified', this._handleValueChanged);
  }

  _init() {
    this._initButtons();
    this._initNumber();
  }

  _initButtons() {
    const buttons = this._option.querySelectorAll('.js-dropdown-option__circle');
    buttons.forEach((val) => {
      if (val.textContent === '-') {
        this._minusButton = val;
      }
      if (val.textContent === '+') {
        this._plusButton = val;
      }
    });
  }

  _initNumber() {
    this._number = this._option.querySelector('.js-dropdown-option__number');
    this._value = parseInt(this._number.textContent, 10);
    if (this._value === '') this._value = 0;
    if (this._value === 0) this._disableMinus();
  }

  @boundMethod
  _handleMinusClick() {
    if (this._value > 0) {
      this._value -= 1;
    }
    this._number.textContent = this._value;
  }

  @boundMethod
  _handlePlusClick() {
    this._value += 1;
    this._number.textContent = this._value;
    this._minusButton.classList.contains('dropdown-option__circle_disable') && this._enableMinus();
  }

  _enableMinus() {
    this._minusButton.classList.remove('dropdown-option__circle_disable');
  }

  _disableMinus() {
    this._minusButton.classList.add('dropdown-option__circle_disable');
  }

  @boundMethod
  _handleValueChanged() {
    if (this._value === 0) {
      this._disableMinus();
    }
  }

  clearValue() {
    this._number.textContent = 0;
    this._value = 0;
    this._disableMinus();
  }
}

export default DropdownOption;

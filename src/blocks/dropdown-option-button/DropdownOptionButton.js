
import { boundMethod } from 'autobind-decorator';

class DropdownOptionButton {
  constructor(element, selectText, optionsList, isHide = true) {
    this._buttons = element;
    this._selectText = selectText;
    this._optionsList = optionsList;
    this._init();
    this._addEvents();
    if (isHide) this.hideDrop();
  }

  _init() {
    this._drop = this._buttons.querySelector('.js-dropdown-option-button__drop');
    this._apply = this._buttons.querySelector('.js-dropdown-option-button__apply');
  }

  _addEvents() {
    this._drop.addEventListener('click', this._handleDropClick);
  }

  @boundMethod
  _handleDropClick() {
    this._optionsList.forEach((val)=>{
      val.clearValue();
    });
    this.hideDrop();
  }

  hideDrop() {
    this._drop.classList.add('dropdown-option-button__drop_hide');
  }

  _showDrop() {
    this._drop.classList.remove('dropdown-option-button__drop_hide');
  }

  checkHidden() {
    this._drop.classList.contains('dropdown-option-button__drop_hide') && this._showDrop();
  }
}

export default DropdownOptionButton;

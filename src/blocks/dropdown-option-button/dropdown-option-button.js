class DropdownOptionButton {
  constructor(element, selectText, optionsList, isHide = true) {
    this.buttons = element;
    this.selectText = selectText;
    this.optionsList = optionsList;
    this.init();
    this.addEvents();
    if (isHide) this.hideDrop();
  }

  init() {
    this.drop = this.buttons.querySelector('.js-dropdown-option-button__drop');
    this.apply = this.buttons.querySelector('.js-dropdown-option-button__apply');
  }

  addEvents() {
    this.drop.addEventListener('click', this.handleDropClick.bind(this));
    this.apply.addEventListener('click', DropdownOptionButton.handleApplyClick.bind(this));
  }

  handleDropClick() {
    this.optionsList.forEach((val)=>{
      val.clearValue();
    });
    this.hideDrop();
  }

  static handleApplyClick() {
    // todo action
  }

  hideDrop() {
    this.drop.classList.add('dropdown-option-button__drop_hide');
  }

  showDrop() {
    this.drop.classList.remove('dropdown-option-button__drop_hide');
  }

  checkHidden() {
    if (this.drop.classList.contains('dropdown-option-button__drop_hide')) this.showDrop();
  }
}

export default DropdownOptionButton;

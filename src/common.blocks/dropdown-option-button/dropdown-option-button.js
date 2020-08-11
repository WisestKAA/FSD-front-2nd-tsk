class DropdownOptionButton {
  constructor (element, selectText, optionsList, isHide = true) {
    this.buttons = element;
    this.selectText = selectText;
    this.optionsList = optionsList;

    this.drop = this.buttons.querySelector('.dropdown-option-button__drop');
    this.apply = this.buttons.querySelector('.dropdown-option-button__apply');

    this.drop.addEventListener('click', this.handleDropClick.bind(this));
    this.apply.addEventListener('click', this.handleApplyClick.bind(this));

    if (isHide) this.hideDrop();
  }

  handleDropClick () {
    this.optionsList.forEach((val)=>{
      val.clearValue();
    });
    this.hideDrop();
  }

  handleApplyClick () {
    //todo action
  }

  hideDrop () {
    this.drop.classList.add('dropdown-option-button__drop_hide');
  }

  showDrop () {
    this.drop.classList.remove('dropdown-option-button__drop_hide');
  }

  checkHiden () {
    if (this.drop.classList.contains('dropdown-option-button__drop_hide')) this.showDrop();
  }
}

export default DropdownOptionButton;

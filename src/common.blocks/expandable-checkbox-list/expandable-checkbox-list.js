class ExpandableCheckboxLst {
  constructor (elem) {
    this.elem = elem;
    this.init();
    this.addEvents();
  }

  init () {
    this.header = this.elem.querySelector('.js-expandable-checkbox-list__header');
    this.checkboxes = this.elem.querySelector('.js-expandable-checkbox-list__checkboxes');
  }

  addEvents () {
    this.header.addEventListener('click', this.handleEclClick.bind(this));
  }

  handleEclClick () {
    if (this.checkboxes.classList.contains('expandable-checkbox-list__checkboxes_display')) {
      this.checkboxes.classList.remove('expandable-checkbox-list__checkboxes_display');
    } else {
      this.checkboxes.classList.add('expandable-checkbox-list__checkboxes_display');
    }
  }
}

$(document).ready(() => {
  const ecl = document.querySelectorAll('.js-expandable-checkbox-list');
  ecl.forEach(((val) =>{
    new ExpandableCheckboxLst(val);
  }));
});

class ExpandableCheckboxLst {
  constructor (elem) {
    this.header = elem.querySelector('.expandable-checkbox-list__header');
    this.header.addEventListener('click', this.handleEclClick.bind(this));
    this.checkboxes = elem.querySelector('.expandable-checkbox-list__checkboxes');
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
  const ecl = document.querySelectorAll('.expandable-checkbox-list');
  ecl.forEach(((val) =>{
    new ExpandableCheckboxLst(val);
  }));
});

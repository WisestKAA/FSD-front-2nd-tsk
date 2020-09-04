
import { boundMethod } from 'autobind-decorator';

class ExpandableCheckboxList {
  constructor(elem) {
    this._elem = elem;
    this._init();
    this._addEvents();
  }

  _init() {
    this._header = this._elem.querySelector('.js-expandable-checkbox-list__header');
    this._checkboxes = this._elem.querySelector('.js-expandable-checkbox-list__checkboxes');
  }

  _addEvents() {
    this._header.addEventListener('click', this._handleEclClick);
  }

  @boundMethod
  _handleEclClick() {
    this._checkboxes.classList.contains('expandable-checkbox-list__checkboxes_display')
      ? this._checkboxes.classList.remove('expandable-checkbox-list__checkboxes_display')
      : this._checkboxes.classList.add('expandable-checkbox-list__checkboxes_display');
  }
}

export default ExpandableCheckboxList;

import { boundMethod } from 'autobind-decorator';

class DropDownMenu {
  constructor(elem) {
    this._elem = elem;
    this._$elem = $(elem);
    this._init();
    this._addEvents();
  }

  _init() {
    this._links = this._elem.querySelector('.js-dropdown-menu__links');
  }

  _addEvents() {
    this._elem.addEventListener('click', this._menuMouseOverHandler);
  }

  @boundMethod
  _menuMouseOverHandler() {
    document.addEventListener('click', this._documentClickHandler);
    this._showMenu();
  }

  @boundMethod
  _documentClickHandler(event) {
    if (this._$elem.has(event.target).length === 0) {
      this._hideMenu();
      document.removeEventListener('click', this._documentClickHandler);
    }
  }

  _showMenu() {
    this._links.classList.add('dropdown-menu__links_displayed');
  }

  _hideMenu() {
    this._links.classList.remove('dropdown-menu__links_displayed');
  }
}

export default DropDownMenu;

import { boundMethod } from 'autobind-decorator';

class DropDownMenu {
  constructor(elem) {
    this._elem = elem;
    this._init();
    this._addEvents();
  }

  _init() {
    this._links = this._elem.querySelector('.js-dropdown-menu__links');
  }

  _addEvents() {
    this._elem.addEventListener('mouseover', this._menuMouseOverHandler);

    this._elem.addEventListener('mouseout', this._menuMouseOutHandler);
  }

  @boundMethod
  _menuMouseOverHandler() {
    this._showMenu();
  }

  @boundMethod
  _menuMouseOutHandler() {
    this._hideMenu();
  }

  _showMenu() {
    this._links.classList.add('dropdown-menu__links_displayed');
  }

  _hideMenu() {
    this._links.classList.remove('dropdown-menu__links_displayed');
  }
}

export default DropDownMenu;

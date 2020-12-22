import DropDownMenu from './DropDownMenu';

$(document).ready(() => {
  const elems = document.querySelectorAll('.js-dropdown-menu');
  const dropDownMenus = [];

  elems.forEach((elem) => {
    dropDownMenus.push(new DropDownMenu(elem));
  });
});

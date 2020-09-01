import DateDropdown from './DateDropdown';

$(document).ready(() => {
  const dateDropdowns = document.querySelectorAll('.js-date-dropdown');
  const items = [];
  dateDropdowns.forEach(((val) =>{
    items.push(new DateDropdown(val));
  }));
});

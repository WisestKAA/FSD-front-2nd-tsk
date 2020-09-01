import Dropdown from './Dropdown';

$(document).ready(() => {
  const optionText = {
    guest: {
      first: ' гость',
      second: ' гостя',
      third: ' гостей'
    },
    bedroom: {
      first: ' спальня',
      second: ' спальни',
      third: ' спален'
    },
    bed: {
      first: ' кровать',
      second: ' кровати',
      third: ' кроватей'
    },
    bathroom: {
      first: ' ванная комната',
      second: ' ванные комнаты',
      third: ' ванных комнат'
    },
    baby: {
      first: ' младенец',
      second: ' младенца',
      third: ' младенцев'
    }
  };

  const dropdowns = document.querySelectorAll('.js-dropdown');
  const items = [];
  dropdowns.forEach(((val) =>{
    val.classList.contains('js-dropdown_width-short')
      ? items.push(new Dropdown(val, optionText, true))
      : items.push(new Dropdown(val, optionText));
  }));
});

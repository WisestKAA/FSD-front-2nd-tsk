import ExpandableCheckboxList from './ExpandableCheckboxList';

$(document).ready(() => {
  const ecl = document.querySelectorAll('.js-expandable-checkbox-list');
  const items = [];
  ecl.forEach(((val) =>{
    items.push(new ExpandableCheckboxList(val));
  }));
});

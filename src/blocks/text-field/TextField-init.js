import TextField from './TextField';

$(document).ready(() => {
  const filteredTextFields = document.querySelectorAll('js-text-field_masked');
  filteredTextFields.forEach((elem) => {
    new TextField(elem);
  });
});

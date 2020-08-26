import 'inputmask/dist/jquery.inputmask';

$(document).ready(() => {
  const $textFields = $('.js-text-field');
  $textFields.each((elem, val) => {
    const isMaskedTextField = $(val).hasClass('text-field_masked');
    if (isMaskedTextField) {
      $(val).inputmask({
        alias: 'datetime',
        inputFormat: 'dd.mm.yyyy',
        placeholder: 'ДД.ММ.ГГГГ'
      });
    }
  });
});

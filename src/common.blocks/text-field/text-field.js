
$(document).ready(() => {
    const $textFields = $('.text-field');
    console.log($textFields);
    $textFields.each((_, val) => {
        
        const isMaskedTextField = $(val).hasClass('text_field_masked');
        if(isMaskedTextField) {
            console.log(val);
            $(val).inputmask({
                alias: 'datetime',
                inputFormat: 'dd.mm.yyyy',
                placeholder: 'ДД.ММ.ГГГГ',
              });                        
        }
    });
});
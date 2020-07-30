
$(document).ready(() => {
    const $textFields = $(".text-field");
    $textFields.each((_, val) => {        
        const isMaskedTextField = $(val).hasClass("text-field_masked");
        if(isMaskedTextField) {
            $(val).inputmask({
                alias: "datetime",
                inputFormat: "dd.mm.yyyy",
                placeholder: "ДД.ММ.ГГГГ",
              });                        
        }
    });
});
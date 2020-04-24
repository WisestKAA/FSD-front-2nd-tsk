
class DateDropdown{
    constructor(elem){
        this.dateDropdown = elem;
        this.datePiker = elem.querySelector('.date-dropdown__input');

        this.isFiltred = this.datePiker.classList.contains('date-dropdown__input-filtred') ? true : false;
        if(this.isFiltred){
            this.dateDropdown.style.width='266px';
            this.datePikerInit(this.datePiker, this.dateDropdown);

        }else{
            this.dateDropdown.style.maxWidth='320px';
            this.inputFrom = elem.querySelector('.date-dropdown__input-from');          
            this.inputTo = elem.querySelector('.date-dropdown__input-to');
            this.inputTo.addEventListener('click', this.handleShowDatePiker.bind(this));
            this.datePikerInit(this.datePiker, this.dateDropdown, true, this.inputFrom, this.inputTo);
        }      
    }

    datePikerInit(datePiker, dateDropdown, isFiltred=false, inputFrom, inputTo){
        
        var dateForm = isFiltred ? 'dd.mm.yyyy' : 'dd M' ;

        $(datePiker).datepicker({
            minDate: new Date(),
            range: true,
            multipleDatesSeparator: ' - ',
            dateFormat: dateForm,
            clearButton: true,
            language: {
                days: ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
                daysShort: ['вос','пон','вто','сре','чет','пят','суб'],
                daysMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
                months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
                monthsShort: ['янв','фев','мар','апр','май','июн','июл','авг','сен','окт','ноя','дек'],
                today: 'Сегодня',
                clear: 'Очистить',
                dateFormat: 'dd.mm.yyyy',
                timeFormat: 'hh:ii',
                firstDay: 1
            },
            navTitles: {
                days: 'MM <i>yyyy</i>'
            },
            prevHtml: '<i class="date-dropdown__navigation">arrow_back</i>',
            nextHtml: '<i class="date-dropdown__navigation">arrow_forward</i>',
            onShow: function(inst, animationCompleted){
                const datePikerWidth = dateDropdown.clientWidth;
                const $datepikerContainer = $(datePiker).datepicker().data('datepicker').$datepicker;
                $datepikerContainer.css('width', datePikerWidth);
                if(isFiltred){
                    inputFrom.value = inputFrom.value.substring(0, 10);
                }
            },
            onSelect: function(formattedDate){
                if(isFiltred){ 
                    if (formattedDate.toString().length == 10){   
                        inputTo.value='';
                    }                
                    if (formattedDate.toString().length > 10){
                        inputFrom.value = formattedDate.substring(0, 10);
                        inputTo.value = formattedDate.substring(13, 23);
                    }
                }
            },
            onHide: function(){
                if(isFiltred){
                    inputFrom.value = inputFrom.value.substring(0, 10);
                }
            }
        });

        this.$buttonsContainer = $(this.datePiker).datepicker().data('datepicker').$datepicker.find('.datepicker--buttons');
        this.applyButton = $('<span>', {
            text: 'применить',
            class: 'date-dropdown__apply-button',
        }).appendTo(this.$buttonsContainer);
        this.applyButton[0].addEventListener('click', this.handleApplyButtonClick.bind(this));

        this.clearButton = $(this.datePiker).datepicker().data('datepicker').$datepicker.find('.datepicker--button');
        this.clearButton[0].addEventListener('click', this.handleClearButtonClick.bind(this));
    }

    handleApplyButtonClick() {
        $(this.datePiker).datepicker().data('datepicker').hide();
    }

    handleShowDatePiker(){
        $(this.datePiker).datepicker().data('datepicker').show();
    }

    handleClearButtonClick(){
        this.inputTo.value='';
    }
}

$(document).ready(() => {
    const dateDropdowns = document.querySelectorAll('.date-dropdown');
    dateDropdowns.forEach((val =>{
        new DateDropdown(val);
    }));
});

class DateDropdown{
    constructor(elem){
        this.dateDropdown = elem;
        this.datePiker = elem.querySelector('.date-dropdown__input');
        this.datePikerInit(this.datePiker)
    }

    datePikerInit(datePiker){
        
        $(datePiker).datepicker({
            minDate: new Date(),
            range: true,
            multipleDatesSeparator: ' - ',
            dateFormat: 'dd M',
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
        });

        datePiker.$el.datepicker({

        });

        
    }
}

$(document).ready(() => {
    const dateDropdowns = document.querySelectorAll('.date-dropdown');
    dateDropdowns.forEach((val =>{
        new DateDropdown(val);      
    }));
});
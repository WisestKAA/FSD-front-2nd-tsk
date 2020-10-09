import 'air-datepicker';

class DemoCalendar {
  constructor(elem) {
    this._elem = elem;
    this._init();
  }

  _init() {
    $(this._elem).datepicker({
      startDate: new Date(2019, 7, 8),
      range: true,
      dateFormat: 'dd M',
      clearButton: true,
      language: {
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        daysShort: ['вос', 'пон', 'вто', 'сре', 'чет', 'пят', 'суб'],
        daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthsShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
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
      'onShow'() {
        const datePikerWidth = this._elem.clientWidth;
        const $datePikerContainer = $(this._elem).datepicker()
          .data('datepicker').$datepicker;
        $datePikerContainer.css('width', datePikerWidth);
      }
    });

    const $buttonsContainer = $(this._elem).datepicker()
      .data('datepicker').$datepicker.find('.datepicker--buttons');
    this._$applyButton = $('<span>', {
      text: 'применить',
      class: 'date-dropdown__apply-button'
    }).appendTo($buttonsContainer);

    this._$clearButton = $(this._elem).datepicker()
      .data('datepicker').$datepicker.find('.datepicker--button');
  }
}

export default DemoCalendar;

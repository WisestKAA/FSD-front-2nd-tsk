import 'air-datepicker/dist/js/datepicker';

class DateDropdown {
  constructor(elem) {
    this.init(elem);
    this.addEvents();
  }

  init(elem) {
    this.dateDropdown = elem;

    this.isFiltered = $(this.dateDropdown).find('.js-date-dropdown__input-filtered').length !== 0;
    if (this.isFiltered) {
      this.datePiker = elem.querySelector('.js-date-dropdown__input-filtered');
      this.dateDropdown.style.width = '19rem';
      this.datePikerInit(this.datePiker, this.dateDropdown);
    } else {
      this.dateDropdown.style.maxWidth = '22.8571rem';
      this.inputFrom = elem.querySelector('.js-date-dropdown__input-from');
      this.datePiker = this.inputFrom;
      this.inputTo = elem.querySelector('.js-date-dropdown__input-to');
      this.datePikerInit(this.datePiker, this.dateDropdown, true, this.inputFrom, this.inputTo);
    }
  }

  addEvents() {
    if (!this.isFiltered) {
      this.inputTo.addEventListener('click', this.handleShowDatePiker.bind(this));
    }

    this.$applyButton[0].addEventListener('click', this.handleApplyButtonClick.bind(this));

    this.$clearButton[0].addEventListener('click', this.handleClearButtonClick.bind(this));
  }

  datePikerInit(datePiker, dateDropdown, isFiltered = false, inptFrom, inptTo) {
    const dateForm = isFiltered ? 'dd.mm.yyyy' : 'dd M';
    let inputFrom = inptFrom;
    let inputTo = inptTo;

    $(datePiker).datepicker({
      minDate: new Date(),
      range: true,
      multipleDatesSeparator: ' - ',
      dateFormat: dateForm,
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
      'onShow'(instMock, animationCompletedMock) {
        const datePikerWidth = dateDropdown.clientWidth;
        const $datePikerContainer = $(datePiker).datepicker()
          .data('datepicker').$datepicker;
        $datePikerContainer.css('width', datePikerWidth);
        if (isFiltered) {
          inputFrom.value = inputFrom.value.substring(0, 10);
        }
      },
      'onSelect'(formattedDate) {
        if (isFiltered) {
          if (formattedDate.toString().length === 10) {
            inputTo.value = '';
          }
          if (formattedDate.toString().length > 10) {
            inputFrom.value = formattedDate.substring(0, 10);
            inputTo.value = formattedDate.substring(13, 23);
          }
        }
      },
      'onHide'() {
        if (isFiltered) {
          inputFrom.value = inputFrom.value.substring(0, 10);
        }
      }
    });

    this.$buttonsContainer = $(this.datePiker).datepicker()
      .data('datepicker').$datepicker.find('.datepicker--buttons');
    this.$applyButton = $('<span>', {
      text: 'применить',
      class: 'date-dropdown__apply-button'
    }).appendTo(this.$buttonsContainer);

    this.$clearButton = $(this.datePiker).datepicker()
      .data('datepicker').$datepicker.find('.datepicker--button');
  }

  handleApplyButtonClick() {
    $(this.datePiker).datepicker()
      .data('datepicker')
      .hide();
  }

  handleShowDatePiker() {
    $(this.datePiker).datepicker()
      .data('datepicker')
      .show();
  }

  handleClearButtonClick() {
    if (!this.isFiltered) {
      this.inputTo.value = '';
    }
  }
}

$(document).ready(() => {
  const dateDropdowns = document.querySelectorAll('.js-date-dropdown');
  const items = [];
  dateDropdowns.forEach(((val) =>{
    items.push(new DateDropdown(val));
  }));
});

export default DateDropdown;

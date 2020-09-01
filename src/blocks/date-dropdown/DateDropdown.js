import 'air-datepicker/dist/js/datepicker';

class DateDropdown {
  constructor(elem) {
    this._init(elem);
    this._addEvents();
  }

  _init(elem) {
    this._dateDropdown = elem;

    this._isFiltered = $(this._dateDropdown).find('.js-date-dropdown__input-filtered').length !== 0;
    if (this._isFiltered) {
      this._datePiker = elem.querySelector('.js-date-dropdown__input-filtered');
      this._dateDropdown.style.width = '19rem';
      this._datePikerInit(this._datePiker, this._dateDropdown);
    } else {
      this._dateDropdown.style.maxWidth = '22.8571rem';
      this._inputFrom = elem.querySelector('.js-date-dropdown__input-from');
      this._datePiker = this._inputFrom;
      this._inputTo = elem.querySelector('.js-date-dropdown__input-to');
      this._datePikerInit(
        this._datePiker,
        this._dateDropdown,
        true, this._inputFrom,
        this._inputTo
      );
    }
  }

  _addEvents() {
    if (!this._isFiltered) {
      this._inputTo.addEventListener('click', this._handleShowDatePiker.bind(this));
    }

    this._$applyButton[0].addEventListener('click', this._handleApplyButtonClick.bind(this));

    this._$clearButton[0].addEventListener('click', this._handleClearButtonClick.bind(this));
  }

  _datePikerInit(datePiker, dateDropdown, isFiltered = false, inptFrom, inptTo) {
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

    const $buttonsContainer = $(this._datePiker).datepicker()
      .data('datepicker').$datepicker.find('.datepicker--buttons');
    this._$applyButton = $('<span>', {
      text: 'применить',
      class: 'date-dropdown__apply-button'
    }).appendTo($buttonsContainer);

    this._$clearButton = $(this._datePiker).datepicker()
      .data('datepicker').$datepicker.find('.datepicker--button');
  }

  _handleApplyButtonClick() {
    $(this._datePiker).datepicker()
      .data('datepicker')
      .hide();
  }

  _handleShowDatePiker() {
    $(this._datePiker).datepicker()
      .data('datepicker')
      .show();
  }

  _handleClearButtonClick() {
    if (!this._isFiltered) {
      this._inputTo.value = '';
    }
  }
}

export default DateDropdown;

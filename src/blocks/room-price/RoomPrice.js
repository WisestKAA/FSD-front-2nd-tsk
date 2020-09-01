import '../date-dropdown/DateDropdown-init';
import '../dropdown/Dropdown-init';
import { boundClass } from 'autobind-decorator';

@boundClass
class RoomPrice {
  constructor(value) {
    this._roomPrice = value;
    this._init();
    this._addEvents();
  }

  _init() {
    this._pricePerDay = this._getPrice(this._roomPrice);
    this._calculateContainer = this._roomPrice.querySelector('.js-room-price__calculate');

    this._initPrices();
    this._initDatePicker();
    this._initButtons();
  }

  _addEvents() {
    this._calculateContainer.addEventListener('DOMSubtreeModified', this._handleCalculateChanged);
    this._dateApplyButton.addEventListener('click', this._handleDatesChanged);
    this._dateClearButton.addEventListener('click', this._handleDatesClear);
  }

  _initPrices() {
    this._priceForRoomDescriptionContainer = this._roomPrice.querySelector('.js-room-price__for-room-description');
    this._priceForRoomPriceContainer = this._roomPrice.querySelector('.js-room-price__for-room-price');
    this._priceForServiceContainer = this._roomPrice.querySelector('.js-room-price__for-services-price');
    this._priceForAddServiceContainer = this._roomPrice.querySelector('.js-room-price__for-addservices-price');
    this._totalContainer = this._roomPrice.querySelector('.js-room-price__total-price');
  }

  _initDatePicker() {
    this._$datePikerObj = $(this._roomPrice.querySelector('.js-date-dropdown__input-from')).data('datepicker');
  }

  _initButtons() {
    this._dateApplyButton = this._$datePikerObj.$datepicker.find('.date-dropdown__apply-button')[0];
    this._dateClearButton = this._$datePikerObj.$datepicker.find('.datepicker--button')[0];
  }

  _getPrice(roomPrice) {
    const priceText = roomPrice.querySelector('.js-room-price__price-sum').textContent;
    return this._convertToNum(priceText);
  }

  _convertToNum(val) {
    return Number(val.substring(0, val.length - 1).replace(/\s+/g, ''));
  }

  _handleDatesChanged() {
    const days = (this._$datePikerObj.selectedDates[1]
      - this._$datePikerObj.selectedDates[0]) / 86400000;
    this._priceForRoomDescriptionContainer.textContent = `${this._getNumWithSpace(this._pricePerDay)}₽ x ${days} суток`;
    const sum = this._pricePerDay * days;
    this._priceForRoomPriceContainer.textContent = `${this._getNumWithSpace(sum)}₽`;
  }

  _handleDatesClear() {
    this._priceForRoomDescriptionContainer.textContent = `${this._getNumWithSpace(this._pricePerDay)}₽ x 0 суток`;
    this._priceForRoomPriceContainer.textContent = '0₽';
  }

  _getNumWithSpace(val) {
    return val.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, ' $1');
  }

  _handleCalculateChanged() {
    const roomPrice = this._convertToNum(this._priceForRoomPriceContainer.textContent);
    const servicePrice = this._convertToNum(this._priceForServiceContainer.textContent);
    const addServicePrice = this._convertToNum(this._priceForAddServiceContainer.textContent);
    const sum = roomPrice + servicePrice + addServicePrice;
    this._totalContainer.textContent = roomPrice !== 0 ? `${this._getNumWithSpace(sum)}₽` : '0₽';
  }
}

export default RoomPrice;

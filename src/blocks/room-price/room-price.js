import '../date-dropdown/date-dropdown';
import '../dropdown/dropdown';

class RoomPrice {
  constructor(value) {
    this.roomPrice = value;
    this.init();
    this.addEvents();
  }

  init() {
    this.pricePerDay = RoomPrice.getPrice(this.roomPrice);
    this.calculateContainer = this.roomPrice.querySelector('.js-room-price__calculate');

    this.initPrices();
    this.initDatePicker();
    this.initButtons();
  }

  addEvents() {
    this.calculateContainer.addEventListener('DOMSubtreeModified', this.handleCalculateChanged.bind(this));
    this.dateApplyButton.addEventListener('click', this.handleDatesChanged.bind(this));
    this.dateClearButton.addEventListener('click', this.handleDatesClear.bind(this));
  }

  initPrices() {
    this.priceForRoomDescriptionContainer = this.roomPrice.querySelector('.js-room-price__for-room-description');
    this.priceForRoomPriceContainer = this.roomPrice.querySelector('.js-room-price__for-room-price');
    this.priceForServiceContainer = this.roomPrice.querySelector('.js-room-price__for-services-price');
    this.priceForAddServiceContainer = this.roomPrice.querySelector('.js-room-price__for-addservices-price');
    this.totalContainer = this.roomPrice.querySelector('.js-room-price__total-price');
  }

  initDatePicker() {
    this.datePickerContainer = this.roomPrice.querySelector('.js-date-dropdown');
    this.$datePikerObj = $(this.roomPrice.querySelector('.js-date-dropdown__input')).data('datepicker');
  }

  initButtons() {
    this.dateApplyButton = this.$datePikerObj.$datepicker.find('.date-dropdown__apply-button')[0];
    this.dateClearButton = this.$datePikerObj.$datepicker.find('.datepicker--button')[0];
  }

  static getPrice(roomPrice) {
    const priceText = roomPrice.querySelector('.js-room-price__price-sum').textContent;
    return RoomPrice.convertToNum(priceText);
  }

  static convertToNum(val) {
    return Number(val.substring(0, val.length - 1).replace(/\s+/g, ''));
  }

  handleDatesChanged() {
    const days = (this.$datePikerObj.selectedDates[1]
      - this.$datePikerObj.selectedDates[0]) / 86400000;
    this.priceForRoomDescriptionContainer.textContent = `${RoomPrice.getNumWithSpace(this.pricePerDay)}₽ x ${days} суток`;
    const sum = this.pricePerDay * days;
    this.priceForRoomPriceContainer.textContent = `${RoomPrice.getNumWithSpace(sum)}₽`;
  }

  handleDatesClear() {
    this.priceForRoomDescriptionContainer.textContent = `${RoomPrice.getNumWithSpace(this.pricePerDay)}₽ x 0 суток`;
    this.priceForRoomPriceContainer.textContent = '0₽';
  }

  static getNumWithSpace(val) {
    return val.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, ' $1');
  }

  handleCalculateChanged() {
    const roomPrice = RoomPrice.convertToNum(this.priceForRoomPriceContainer.textContent);
    const servicePrice = RoomPrice.convertToNum(this.priceForServiceContainer.textContent);
    const addServicePrice = RoomPrice.convertToNum(this.priceForAddServiceContainer.textContent);
    const sum = roomPrice + servicePrice + addServicePrice;
    this.totalContainer.textContent = roomPrice !== 0 ? `${RoomPrice.getNumWithSpace(sum)}₽` : '0₽';
  }
}

$(document).ready(() => {
  const roomPrice = document.querySelectorAll('.js-room-price');
  const items = [];
  roomPrice.forEach(((val) =>{
    items.push(new RoomPrice(val));
  }));
});

export default RoomPrice;
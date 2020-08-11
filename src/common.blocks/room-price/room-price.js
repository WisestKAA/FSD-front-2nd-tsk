class RoomPrice {
  constructor (value) {
    this.roomPrice = value;
    this.pricePerDay = this.getPrice(value);

    this.calculateContainer = this.roomPrice.querySelector('.room-price__calculate');
    this.calculateContainer.addEventListener('DOMSubtreeModified', this.handleCalculateModifed.bind(this));
        
    this.priceForRoomDiscriptionContainer = this.roomPrice.querySelector('.room-price__for-room-discription');
    this.priceForRoomPriceContainer = this.roomPrice.querySelector('.room-price__for-room-price');
    this.priceForServiceContainer = this.roomPrice.querySelector('.room-price__for-services-price');
    this.priceForAddServiceContainer = this.roomPrice.querySelector('.room-price__for-addservices-price');
    this.totalPriceContainer = this.roomPrice.querySelector('.room-price__total-price');

    this.totalContainer = this.roomPrice.querySelector('.room-price__total-price');
        
    this.datePickerContainer = this.roomPrice.querySelector('.date-dropdown');
    this.$datePikerObj = $(this.roomPrice.querySelector('.date-dropdown__input')).data('datepicker');
        
    this.dateApplayButton = this.$datePikerObj.$datepicker.find('.date-dropdown__apply-button')[0];
    this.dateApplayButton.addEventListener('click', this.handleDatesModifed.bind(this));

    this.dateClearButton = this.$datePikerObj.$datepicker.find('.datepicker--button')[0];
    this.dateClearButton.addEventListener('click', this.handleDatesClear.bind(this));
  }

  getPrice (roomPrice) {
    const priceText  = roomPrice.querySelector('.room-price__price-sum').textContent;
    return this.convertToNum(priceText);
  }

  convertToNum (val) {
    return Number(val.substring(0, val.length - 1).replace(/\s+/g, ''));
  }

  handleDatesModifed () {
    const days = (this.$datePikerObj.selectedDates[1] -
      this.$datePikerObj.selectedDates[0]) / 86400000;
    this.priceForRoomDiscriptionContainer.textContent = `${this.getNumWithSpace(this.pricePerDay)}₽ x ${days} суток`;
    const sum = this.pricePerDay * days;
    this.priceForRoomPriceContainer.textContent = `${this.getNumWithSpace(sum)}₽`;
  }

  handleDatesClear () {
    this.priceForRoomDiscriptionContainer.textContent = `${this.getNumWithSpace(this.pricePerDay)}₽ x 0 суток`;
    this.priceForRoomPriceContainer.textContent = '0₽';
  }

  getNumWithSpace (val) {
    return val.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, ' $1');
  }

  handleCalculateModifed () {
    const roomPrice = this.convertToNum(this.priceForRoomPriceContainer.textContent);
    const servicePrice = this.convertToNum(this.priceForServiceContainer.textContent);
    const addServicePrice = this.convertToNum(this.priceForAddServiceContainer.textContent);
    const sum = roomPrice + servicePrice + addServicePrice;
    this.totalContainer.textContent = roomPrice !== 0 ? `${this.getNumWithSpace(sum)}₽` : '0₽';
  }
}


$(document).ready(() => {
  const roomPrice = document.querySelectorAll('.room-price');
  roomPrice.forEach(((val) =>{
    new RoomPrice(val);
  }));
});

import RoomPrice from './RoomPrice';

$(document).ready(() => {
  const roomPrice = document.querySelectorAll('.js-room-price');
  const items = [];
  roomPrice.forEach(((val) =>{
    items.push(new RoomPrice(val));
  }));
});

import LikeButton from './LikeButton';

$(document).ready(() => {
  const likeButtons = document.querySelectorAll('.js-like-button');
  const items = [];
  likeButtons.forEach(((val) =>{
    items.push(new LikeButton(val));
  }));
});

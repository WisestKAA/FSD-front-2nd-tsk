class LikeButton {
  constructor (elem) {
    this.likeButton = elem;
    this.init();
    this.addEvents();
  }

  init(){
    this.icon = this.likeButton.querySelector('.material-icons');
    this.num = this.likeButton.querySelector('.like-button__number');
  }

  addEvents(){
    this.likeButton.addEventListener('click', this.handleLikeButtonClick.bind(this));
  }

  handleLikeButtonClick () {
    let num;
    if (this.likeButton.classList.contains('like-button_active')) {
      this.likeButton.classList.remove('like-button_active');
      num = parseInt(this.num.textContent, 10);
      this.num.textContent = num - 1;
      this.icon.textContent = 'favorite_border';
    } else {
      this.likeButton.classList.add('like-button_active');
      num = parseInt(this.num.textContent, 10);
      this.num.textContent = num + 1;
      this.icon.textContent = 'favorite';
    }
  }
}

$(document).ready(() => {
  const likeButtons = document.querySelectorAll('.js-like-button');
  likeButtons.forEach(((val) =>{
    new LikeButton(val);
  }));
});

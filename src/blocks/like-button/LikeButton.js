class LikeButton {
  constructor(elem) {
    this._likeButton = elem;
    this._init();
    this._addEvents();
  }

  _init() {
    this._icon = this._likeButton.querySelector('.material-icons');
    this._num = this._likeButton.querySelector('.like-button__number');
  }

  _addEvents() {
    this._likeButton.addEventListener('click', this._handleLikeButtonClick.bind(this));
  }

  _handleLikeButtonClick() {
    let num;
    if (this._likeButton.classList.contains('like-button_active')) {
      this._likeButton.classList.remove('like-button_active');
      num = parseInt(this._num.textContent, 10);
      this._num.textContent = num - 1;
      this._icon.textContent = 'favorite_border';
    } else {
      this._likeButton.classList.add('like-button_active');
      num = parseInt(this._num.textContent, 10);
      this._num.textContent = num + 1;
      this._icon.textContent = 'favorite';
    }
  }
}

export default LikeButton;

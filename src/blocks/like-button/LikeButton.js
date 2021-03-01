import { boundMethod } from 'autobind-decorator';

class LikeButton {
  constructor(elem) {
    this._likeButton = elem;
    this._init();
    this._addEvents();
  }

  _init() {
    this._icon = this._likeButton.querySelector('.material-icons');
    this._num = this._likeButton.querySelector('.like-button__number');
    this._currentValue = parseInt(this._num.textContent, 10);
    this._num.textContent = this._getCorrectValue(this._currentValue);
  }

  _addEvents() {
    this._likeButton.addEventListener('click', this._handleLikeButtonClick);
  }

  @boundMethod
  _handleLikeButtonClick() {
    if (this._likeButton.classList.contains('like-button_active')) {
      this._likeButton.classList.remove('like-button_active');
      this._num.textContent = this._getCorrectValue(this._currentValue - 1);
      this._icon.textContent = 'favorite_border';
    } else {
      this._likeButton.classList.add('like-button_active');
      this._num.textContent = this._getCorrectValue(this._currentValue + 1);
      this._icon.textContent = 'favorite';
    }
  }

  _getCorrectValue(value) {
    let val = Number(value);
    const strVal = String(value);
    switch (true) {
      case val > 1000000000: {
        return `${strVal.slice(0, strVal.length - 9)}B+`;
      }
      case val > 1000000: {
        return `${strVal.slice(0, strVal.length - 6)}M+`;
      }
      case val > 1000: {
        return `${strVal.slice(0, strVal.length - 3)}K+`;
      }
      default: {
        return val;
      }
    }
  }
}

export default LikeButton;

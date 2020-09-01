import 'ion-rangeslider/js/ion.rangeSlider';

class RangeSlider {
  constructor(elem) {
    const $sliderContainer = $(elem);
    const $slider = $sliderContainer.find('.js-range-slider__slider');
    const $price = $sliderContainer.find('.js-range-slider__price');
    this._initSlider($slider, $price);
  }

  _initSlider($slider, $price) {
    const that = this;
    $slider.ionRangeSlider({
      onStart(data) {
        that._changePrice(data, $price);
      },
      onChange(data) {
        that._changePrice(data, $price);
      }
    });
  }

  _changePrice(data, $price) {
    const { from, to } = data;
    const fromVal = from.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, ' $1');
    const toVal = to.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, ' $1');
    $price.val(`${fromVal}₽ - ${toVal}₽`);
  }
}

export default RangeSlider;

import 'ion-rangeslider/js/ion.rangeSlider';

class RangeSlider {
  constructor(elem) {
    this.$sliderContainer = $(elem);
    this.$slider = this.$sliderContainer.find('.js-range-slider__slider');
    this.$price = this.$sliderContainer.find('.js-range-slider__price');
    this.initSlider();
  }

  initSlider() {
    const { $price } = this;
    this.$slider.ionRangeSlider({
      onStart(data) {
        const { from, to } = data;
        const fromVal = from.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, ' $1');
        const toVal = to.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, ' $1');
        $price.val(`${fromVal}₽ - ${toVal}₽`);
      },
      onChange(data) {
        const { from, to } = data;
        const fromVal = from.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, ' $1');
        const toVal = to.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, ' $1');
        $price.val(`${fromVal}₽ - ${toVal}₽`);
      }
    });
  }
}

export default RangeSlider;

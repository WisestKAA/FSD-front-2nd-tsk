import 'ion-rangeslider/js/ion.rangeSlider';

class RangeSlider{
    constructor(elem){
        this.$sliderContainer = $(elem);
        this.$slider = this.$sliderContainer.find(".range-slider__slider");
        this.$price = this.$sliderContainer.find(".range-slider__price");
        this.initSlider();
    }

    initSlider(){
        const { $price } = this;
        this.$slider.ionRangeSlider({
            onStart(data) {
                const { from, to } = data;
                var _from = from.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
                var _to = to.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
                $price.val(`${_from}₽ - ${_to}₽`);
            },
            onChange(data) {
                const { from, to } = data;
                var _from = from.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
                var _to = to.toString().replace(/(\d{1,3})(?=((\d{3})*)$)/g, " $1");
                $price.val(`${_from}₽ - ${_to}₽`);
            },
        });
    }

}

$(() => {
    const $sliders = $(".range-slider");
  
    $sliders.each((i, val) => {
      new RangeSlider(val);
    });
});
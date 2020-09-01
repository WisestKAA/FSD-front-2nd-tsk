import RangeSlider from './RangeSlider';

$(() => {
  const $sliders = $('.js-range-slider');
  const items = [];
  $sliders.each((iterator, val) => {
    items.push(new RangeSlider(val));
  });
});

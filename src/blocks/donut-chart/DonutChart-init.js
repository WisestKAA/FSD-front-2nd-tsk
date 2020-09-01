import DonutChart from './DonutChart';

$(document).ready(() => {
  const width = 124;
  const height = 120;
  const rating = {
    bad: 0,
    satisfactory: 260,
    normal: 260,
    good: 520
  };

  const donutChart = document.querySelectorAll('.js-donut-chart');
  const items = [];
  donutChart.forEach(((val) =>{
    items.push(new DonutChart(val, width, height, rating));
  }));
});

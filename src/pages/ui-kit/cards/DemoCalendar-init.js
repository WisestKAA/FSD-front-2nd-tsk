import DemoCalendar from './DemoCalendar';

$(document).ready(() => {
  const calendar = document.querySelector('.js-cards__calendar');
  new DemoCalendar(calendar);
});

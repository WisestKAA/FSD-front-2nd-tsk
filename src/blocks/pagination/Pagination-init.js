import Pagination from './Pagination';

$(document).ready(() => {
  let paginationList = document.querySelectorAll('.js-pagination');
  paginationList.forEach((elem) => {
    new Pagination(elem);
  });
});

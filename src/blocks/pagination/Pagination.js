import { boundMethod } from 'autobind-decorator';

class Pagination {
  constructor(elem) {
    this._elem = elem;
    this._$elem = $(elem);
    this._$container = this._$elem.find('.js-pagination__container');
    this._$caption = this._$elem.find('.js-pagination__caption');
    this._init();
    this._addEvents();
  }

  _init() {
    this._styleClasses = this._getStyleClasses();
    this._param = this._getParam();
    this._param.itemsCount = this._param.itemsOnPage * this._param.pageCount;
    this._current = 1;
    this._build();
  }

  _addEvents() {
    this._$pre.on('click', this._handlePreClick);
    this._$next.on('click', this._handleNextClick);
    this._$items.forEach(($item) => {
      $item.on('click', this._handleItemClick);
    });
  }

  _getStyleClasses() {
    return {
      container: 'pagination__container',
      item: 'pagination__item',
      itemHide: 'pagination__item_hide',
      activeItem: 'pagination__item_active',
      ellipses: 'pagination__ellipsis',
      ellipsesHide: 'pagination__ellipsis_hide',
      pre: 'pagination__pre',
      preHide: 'pagination__pre_hide',
      next: 'pagination__next',
      nextHide: 'pagination__next_hide',
      caption: 'pagination__caption'
    };
  }

  _getParam() {
    return {
      pageCount: this._$elem.data('pageCount'),
      itemsOnPage: this._$elem.data('itemsOnPage')
    };
  }

  _build() {
    this._$firstEllipses = $(`<li class="${this._styleClasses.ellipses} ${this._styleClasses.ellipsesHide}">...</li>`);
    this._$lastEllipses = $(`<li class="${this._styleClasses.ellipses}">...</li>`);
    this._$pre = $(`<li class="${this._styleClasses.pre} ${this._styleClasses.preHide}">arrow_back</li>`);
    this._$next = $(`<li class="${this._styleClasses.next}">arrow_forward</li>`);
    this._$items = this._getItems();

    let content = [];
    content.push(this._$pre);
    content.push(this._$items[0]);
    content.push(this._$firstEllipses);
    content = content.concat(this._$items.slice(1, this._$items.length - 1));
    content.push(this._$lastEllipses);
    content.push(this._$items[this._$items.length - 1]);
    content.push(this._$next);
    this._$container.append(content);

    this._changeCaption();
  }

  _getItems() {
    let $items = [];
    for (let i = 1; i <= this._param.pageCount; i += 1) {
      $items.push($(`<li class="${this._styleClasses.item} ${this._styleClasses.itemHide}">${i}</li>`));
    }

    $items[0].removeClass(this._styleClasses.itemHide);
    $items[0].addClass(this._styleClasses.activeItem);
    $items[1].removeClass(this._styleClasses.itemHide);
    $items[2].removeClass(this._styleClasses.itemHide);
    $items[$items.length - 1].removeClass(this._styleClasses.itemHide);
    return $items;
  }

  _rebuild() {
    this._clearState();
    if (this._current === 1 || this._current === 2) {
      this._$items[this._current - 1].addClass(this._styleClasses.activeItem);
      this._$items[0].removeClass(this._styleClasses.itemHide);
      this._$items[1].removeClass(this._styleClasses.itemHide);
      this._$items[2].removeClass(this._styleClasses.itemHide);
      this._$lastEllipses.removeClass(this._styleClasses.ellipsesHide);
      this._$next.removeClass(this._styleClasses.nextHide);
      if (this._current === 2) {
        this._$pre.removeClass(this._styleClasses.preHide);
      }
    } else if (this._current === this._param.pageCount
      || this._current === this._param.pageCount - 1) {
      this._$pre.removeClass(this._styleClasses.preHide);
      this._$firstEllipses.removeClass(this._styleClasses.ellipsesHide);
      this._$items[this._param.pageCount - 1].removeClass(this._styleClasses.itemHide);
      this._$items[this._param.pageCount - 2].removeClass(this._styleClasses.itemHide);
      this._$items[this._param.pageCount - 3].removeClass(this._styleClasses.itemHide);
      if (this._current === this._param.pageCount) {
        this._$items[this._current - 1].addClass(this._styleClasses.activeItem);
      } else {
        this._$items[this._current - 1].addClass(this._styleClasses.activeItem);
        this._$next.removeClass(this._styleClasses.nextHide);
      }
    } else {
      this._$pre.removeClass(this._styleClasses.preHide);
      this._$firstEllipses.removeClass(this._styleClasses.ellipsesHide);
      this._$items[this._current - 2].removeClass(this._styleClasses.itemHide);
      this._$items[this._current - 1].removeClass(this._styleClasses.itemHide);
      this._$items[this._current - 1].addClass(this._styleClasses.activeItem);
      this._$items[this._current].removeClass(this._styleClasses.itemHide);
      this._$lastEllipses.removeClass(this._styleClasses.ellipsesHide);
      this._$next.removeClass(this._styleClasses.nextHide);
      if (this._current === 3) {
        this._$firstEllipses.addClass(this._styleClasses.ellipsesHide);
      } else if (this._current === this._param.pageCount - 2) {
        this._$lastEllipses.addClass(this._styleClasses.ellipsesHide);
      }
    }
    this._changeCaption();
  }

  _clearState() {
    this._$pre.addClass(this._styleClasses.preHide);
    this._$firstEllipses.addClass(this._styleClasses.ellipsesHide);
    this._$items.forEach(($item) => {
      $item.addClass(this._styleClasses.itemHide);
      $item.removeClass(this._styleClasses.activeItem);
    });
    this._$items[0].removeClass(this._styleClasses.itemHide);
    this._$items[this._$items.length - 1].removeClass(this._styleClasses.itemHide);
    this._$lastEllipses.removeClass(this._styleClasses.itemHide);
    this._$lastEllipses.addClass(this._styleClasses.ellipsesHide);
    this._$next.addClass(this._styleClasses.nextHide);
  }

  _changeCaption() {
    const to = (this._param.itemsOnPage * this._current);
    const from = to - this._param.itemsOnPage + 1;
    const count = this._param.itemsCount > 100 ? '100+' : this._param.itemsCount;
    this._$caption.html(`${from} – ${to} из ${count} вариантов аренды`);
  }

  @boundMethod
  _handlePreClick() {
    this._current -= 1;
    this._rebuild();
  }

  @boundMethod
  _handleNextClick() {
    this._current += 1;
    this._rebuild();
  }

  @boundMethod
  _handleItemClick(e) {
    this._current = Number(e.currentTarget.textContent);
    this._rebuild();
  }
}

export default Pagination;

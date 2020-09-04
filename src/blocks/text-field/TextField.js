import 'inputmask/dist/jquery.inputmask';

class TextField {
  constructor(elem) {
    this.elem = elem;
    this._init();
  }

  _init() {
    $(this.elem).inputmask({
      alias: 'datetime',
      inputFormat: 'dd.mm.yyyy',
      placeholder: 'ДД.ММ.ГГГГ'
    });
  }
}

export default TextField;

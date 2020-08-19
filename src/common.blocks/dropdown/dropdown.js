import DropdownOption from '../dropdown-option/dropdown-option';
import DropdownOptionButton from '../dropdown-option-button/dropdown-option-button';

class DropDown {
  constructor (element, optionText, isShort = false) {
    this.dropdown = element;
    this.isShort = isShort;
    this.optionText = optionText;
    this.init();
    this.addEvents();
  }

  init () {
    this.initSelect();
    this.initOptions();
    this.initOptionButtons();
    this.arrow = this.dropdown.querySelector('.js-material-icons');
  }

  addEvents () {
    this.select.addEventListener('click', this.handleSelectClick.bind(this));
    this.options.addEventListener('DOMSubtreeModified', this.handleOptionsModifed.bind(this));
  }

  initSelect () {
    this.select = this.dropdown.querySelector('.js-dropdown__select');
    this.selectText = this.select.querySelector('.js-dropdown__text');
    if (this.isShort) {
      this.defaultSelectText = `0 ${this.optionText.bedroom.third} 0 ${this.optionText.bed.third} 0 ${this.optionText.bathroom.third}`;
      this.selectText.textContent = this.defaultSelectText;
    } else {
      this.defaultSelectText = this.selectText.textContent;
    }
  }

  initOptions () {
    this.options = this.dropdown.querySelector('.js-dropdown__options');
    this.optionsList = this.options.querySelectorAll('.js-dropdown-option');
    this.optionsListObj = [];
    this.optionsList.forEach(((val) => {
      this.optionsListObj.push(new DropdownOption(val));
    }));
  }

  initOptionButtons () {
    this.optionButton = this.options.querySelector('.js-dropdown-option-button');
    if (this.optionButton !== null) {
      this.optionButtons = new DropdownOptionButton(
        this.optionButton,
        this.selectText,
        this.optionsListObj
      );
    }
  }

  handleSelectClick () {
    if (this.select.classList.contains('dropdown__select_active')) {
      this.hideDropdown();
    } else {
      this.showDropdown();
    }
  }

  showDropdown () {
    this.select.classList.add('dropdown__select_active');
    this.options.classList.add('dropdown__options_active');
        
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    document.addEventListener('click', this.handleDocumentClick);

    this.arrow.textContent = 'keyboard_arrow_up';
  }

  hideDropdown () {
    this.select.classList.remove('dropdown__select_active');
    this.options.classList.remove('dropdown__options_active');

    document.removeEventListener('click', this.handleDocumentClick);

    this.arrow.textContent = 'keyboard_arrow_down';
  }

  handleOptionsModifed () {
    this.sum = 0;
    let babys = 0;
    this.optionsList.forEach((val)=>{
      const num = val.querySelector('.js-dropdown-option__number');
      if (val.querySelector('.js-dropdown-option__text').textContent === 'младенцы') {
        babys = num.textContent;
      } else {
        this.sum += parseInt(num.textContent, 10);
      }
    });
        
    if (this.sum === 0) {
      this.selectText.textContent = this.defaultSelectText;
      if (this.optionButtons) {
        this.optionButtons.hideDrop();
      }
      return;
    } else {
      if (this.optionButtons) {
        this.optionButtons.checkHiden();
      }
    }
        
    if (this.isShort) {
      this.selectText.textContent = this.getRightTextShort(this.optionText);
    } else {
      this.selectText.textContent = babys === 0 ?
        this.getRightText(this.optionText.guest, this.sum) :
        `${this.getRightText(this.optionText.guest, this.sum)}, ${this.getRightText(this.optionText.baby, babys)}` ;
    }
  }

  getRightText (optionText, sum) {
    const newval = sum % 100;
    if (newval === 1) {
      return sum + optionText.ferst;
    }
    if (newval > 1 && newval <= 4) {
      return sum + optionText.second;
    }
    if (newval > 4 && newval <= 20) {
      return sum + optionText.third;
    }
    if (newval > 20) {
      const val = this.sum % 10;
      if (val === 1) {
        return sum + optionText.ferst;
      }
      if (val > 1 && val <= 4) {
        return sum + optionText.second;
      }
    }
    return sum + optionText.third;
  }

  getRightTextShort (optionText) {
    const nums = [];
    this.optionsList.forEach((val)=>{
      const num = val.querySelector('.js-dropdown-option__number');
      nums.push(parseInt(num.textContent, 10));
    });
        
    let finalText = '';
    finalText += `${this.getRightText(optionText.bedroom, nums[0])} `;
    finalText += `${this.getRightText(optionText.bed, nums[1])} `;
    finalText += this.getRightText(optionText.bathroom, nums[2]);
    return finalText;
  }

  handleDocumentClick (event) {
    const { target } = event;
    const itsDropdown = target === this.dropdown || this.dropdown.contains(target);
    if (!itsDropdown) {
      this.hideDropdown(event);
    }
  }
}

$(document).ready(() => {
  const optionText = {
    'guest': {
      'ferst': ' гость',
      'second': ' гостя',
      'third': ' гостей',
    },
    'bedroom': {
      'ferst': ' спальня',
      'second': ' спальни',
      'third': ' спален',
    },
    'bed': {
      'ferst': ' кровать',
      'second': ' кровати',
      'third': ' кроватей',
    },
    'bathroom': {
      'ferst': ' ванная комната',
      'second': ' ванные комнаты',
      'third': ' ванных комнат',
    },
    'baby': {
      'ferst': ' младенец',
      'second': ' младенца',
      'third': ' младенцев',
    },
  };

  const dropdowns = document.querySelectorAll('.js-dropdown');
  dropdowns.forEach(((val) =>{
    if (val.classList.contains('js-dropdown_width-short')) {
      new DropDown(val, optionText, true);
    } else {
      new DropDown(val, optionText);
    }
  }));
});

export default DropDown;

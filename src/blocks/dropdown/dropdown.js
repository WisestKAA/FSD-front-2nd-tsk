import DropdownOption from '../dropdown-option/DropdownOption';
import DropdownOptionButton from '../dropdown-option-button/DropdownOptionButton';

class Dropdown {
  constructor(element, optionText, isShort = false) {
    this._dropdown = element;
    this._isShort = isShort;
    this._optionText = optionText;
    this._init();
    this._addEvents();
  }

  _init() {
    this._initSelect();
    this._initOptions();
    this._initOptionButtons();
    this._arrow = this._dropdown.querySelector('.js-material-icons');
  }

  _addEvents() {
    this._select.addEventListener('click', this._handleSelectClick.bind(this));
    this._options.addEventListener('DOMSubtreeModified', this._handleOptionsModified.bind(this));
  }

  _initSelect() {
    this._select = this._dropdown.querySelector('.js-dropdown__select');
    this._selectText = this._select.querySelector('.js-dropdown__text');
    if (this._isShort) {
      this._defaultSelectText = `0 ${this._optionText.bedroom.third} 0 ${this._optionText.bed.third} 0 ${this._optionText.bathroom.third}`;
      this._selectText.textContent = this._defaultSelectText;
    } else {
      this._defaultSelectText = this._selectText.textContent;
    }
  }

  _initOptions() {
    this._options = this._dropdown.querySelector('.js-dropdown__options');
    this._optionsList = this._options.querySelectorAll('.js-dropdown-option');
    this._optionsListObj = [];
    this._optionsList.forEach(((val) => {
      this._optionsListObj.push(new DropdownOption(val));
    }));
  }

  _initOptionButtons() {
    const optionButton = this._options.querySelector('.js-dropdown-option-button');
    if (optionButton !== null) {
      this._optionButtons = new DropdownOptionButton(
        optionButton,
        this._selectText,
        this._optionsListObj
      );
    }
  }

  _handleSelectClick() {
    if (this._select.classList.contains('dropdown__select_active')) {
      this._hideDropdown();
    } else {
      this._showDropdown();
    }
  }

  _showDropdown() {
    this._select.classList.add('dropdown__select_active');
    this._options.classList.add('dropdown__options_active');

    this._handleDocumentClick = this._handleDocumentClick.bind(this);
    document.addEventListener('click', this._handleDocumentClick);

    this._arrow.textContent = 'keyboard_arrow_up';
  }

  _hideDropdown() {
    this._select.classList.remove('dropdown__select_active');
    this._options.classList.remove('dropdown__options_active');

    document.removeEventListener('click', this._handleDocumentClick);

    this._arrow.textContent = 'keyboard_arrow_down';
  }

  _handleOptionsModified() {
    this._sum = 0;
    let babies = 0;
    this._optionsList.forEach((val)=>{
      const num = val.querySelector('.js-dropdown-option__number');
      if (val.querySelector('.js-dropdown-option__text').textContent === 'младенцы') {
        babies = num.textContent;
      } else {
        this._sum += parseInt(num.textContent, 10);
      }
    });

    if (this._sum === 0) {
      this._selectText.textContent = this._defaultSelectText;
      if (this._optionButtons) {
        this._optionButtons.hideDrop();
      }
      return;
    } if (this._optionButtons) {
      this._optionButtons.checkHidden();
    }

    if (this._isShort) {
      this._selectText.textContent = this._getRightTextShort(this._optionText);
    } else {
      this._selectText.textContent = babies === 0
        ? this._getRightText(this._optionText.guest, this._sum)
        : `${this._getRightText(this._optionText.guest, this._sum)}, ${this._getRightText(this._optionText.baby, babies)}`;
    }
  }

  _getRightText(optionText, sum) {
    const newValue = sum % 100;
    if (newValue === 1) {
      return sum + optionText.first;
    }
    if (newValue > 1 && newValue <= 4) {
      return sum + optionText.second;
    }
    if (newValue > 4 && newValue <= 20) {
      return sum + optionText.third;
    }
    if (newValue > 20) {
      const val = this._sum % 10;
      if (val === 1) {
        return sum + optionText.first;
      }
      if (val > 1 && val <= 4) {
        return sum + optionText.second;
      }
    }
    return sum + optionText.third;
  }

  _getRightTextShort(optionText) {
    const numbers = [];
    this._optionsList.forEach((val)=>{
      const num = val.querySelector('.js-dropdown-option__number');
      numbers.push(parseInt(num.textContent, 10));
    });

    let finalText = '';
    finalText += `${this._getRightText(optionText.bedroom, numbers[0])} `;
    finalText += `${this._getRightText(optionText.bed, numbers[1])} `;
    finalText += this._getRightText(optionText.bathroom, numbers[2]);
    return finalText;
  }

  _handleDocumentClick(event) {
    const { target } = event;
    const itsDropdown = target === this._dropdown || this._dropdown.contains(target);
    if (!itsDropdown) {
      this._hideDropdown(event);
    }
  }
}

export default Dropdown;

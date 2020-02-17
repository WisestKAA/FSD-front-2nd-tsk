function importAll(val) {
    val.keys().forEach(val);
  }

importAll(require.context('./img', true, /\.(jpg|png|svg|png)$/));
importAll(require.context('./', true, /\.(js)$/));
importAll(require.context('./common.blocks', true, /\.(js)$/));
importAll(require.context('./js', true, /\.(js)$/));

import './style.scss';

// import './common.blocks/text-field/text-field.js';
// import './js/jquery.inputmask';
// import './common.blocks/dropdown/dropdown.js';
// import './common.blocks/expandable-checkbox-list/expandable-checkbox-list.js';
// import './common.blocks/like-button/like-button.js'
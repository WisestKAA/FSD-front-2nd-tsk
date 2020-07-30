function importAll(val) {
    val.keys().forEach(val);
  }

importAll(require.context("./", true, /\.(jpg|png|svg|png)$/));
importAll(require.context("./", true, /\.(js)$/));
importAll(require.context("./common.blocks", true, /\.(js)$/));
importAll(require.context("./library.blocks", true, /\.(js)$/));
importAll(require.context("./js", true, /\.(js)$/));

import "./style.scss";
import "air-datepicker/dist/js/datepicker";
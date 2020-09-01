const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: './src',
  uiKit: './src/pages/ui-kit',
  wsPages: './src/pages/website-pages'
};

class PagesData {
  constructor() {
    this._data = [
      {
        name: 'index',
        jsPath: `${PATHS.src}/index.js`,
        stylePath: `${PATHS.src}/style.scss`,
        template: `${PATHS.src}/index.pug`,
        filename: './index.html',
        chunks: ['index']
      },
      {
        name: 'cards',
        jsPath: `${PATHS.uiKit}/cards/cards.js`,
        stylePath: `${PATHS.uiKit}/cards/cards.scss`,
        template: `${PATHS.uiKit}/cards/cards.pug`,
        filename: './cards.html',
        chunks: ['cards']
      },
      {
        name: 'colors-and-type',
        stylePath: './src/pages/ui-kit/colors-and-type/colors-and-type.scss',
        template: './src/pages/ui-kit/colors-and-type/colors-and-type.pug',
        filename: './colors-and-type.html',
        chunks: ['colors-and-type']
      },
      {
        name: 'form-elements',
        jsPath: `${PATHS.uiKit}/form-elements/form-elements.js`,
        stylePath: `${PATHS.uiKit}/form-elements/form-elements.scss`,
        template: `${PATHS.uiKit}/form-elements/form-elements.pug`,
        filename: './form-elements.html',
        chunks: ['form-elements']
      },
      {
        name: 'headers-and-footers',
        jsPath: `${PATHS.uiKit}/headers-and-footers/headers-and-footers.js`,
        stylePath: `${PATHS.uiKit}/headers-and-footers/headers-and-footers.scss`,
        template: `${PATHS.uiKit}/headers-and-footers/headers-and-footers.pug`,
        filename: './headers-and-footers.html',
        chunks: ['headers-and-footers']
      },
      {
        name: 'landing',
        jsPath: `${PATHS.wsPages}/landing/landing.js`,
        stylePath: `${PATHS.wsPages}/landing/landing.scss`,
        template: `${PATHS.wsPages}/landing/landing.pug`,
        filename: './landing.html',
        chunks: ['landing']
      },
      {
        name: 'registration',
        jsPath: `${PATHS.wsPages}/registration/registration.js`,
        stylePath: `${PATHS.wsPages}/registration/registration.scss`,
        template: `${PATHS.wsPages}/registration/registration.pug`,
        filename: './registration.html',
        chunks: ['registration']
      },
      {
        name: 'room-details',
        jsPath: `${PATHS.wsPages}/room-details/room-details.js`,
        stylePath: `${PATHS.wsPages}/room-details/room-details.scss`,
        template: `${PATHS.wsPages}/room-details//room-details.pug`,
        filename: './room-details.html',
        chunks: ['room-details']
      },
      {
        name: 'search-room',
        jsPath: `${PATHS.wsPages}/search-room/search-room.js`,
        stylePath: `${PATHS.wsPages}/search-room/search-room.scss`,
        template: `${PATHS.wsPages}/search-room/search-room.pug`,
        filename: './search-room.html',
        chunks: ['search-room']
      },
      {
        name: 'sign-in',
        jsPath: `${PATHS.wsPages}/sign-in/sign-in.js`,
        stylePath: `${PATHS.wsPages}/sign-in/sign-in.scss`,
        template: `${PATHS.wsPages}/sign-in/sign-in.pug`,
        filename: './sign-in.html',
        chunks: ['sign-in']
      }
    ];
  }

  get entry() {
    let result = {};
    this._data.forEach((val) => {
      if (!val.jsPath) {
        result[val.name] = val.stylePath;
      } else if (!val.stylePath) {
        result[val.name] = val.jsPath;
      } else {
        result[val.name] = [
          val.jsPath,
          val.stylePath
        ];
      }
    });
    return result;
  }

  get HTMLPlugins() {
    let plugins = [];
    this._data.forEach((val) => {
      plugins.push(
        new HtmlWebpackPlugin({
          template: val.template,
          filename: val.filename,
          inject: true,
          chunks: val.chunks
        })
      );
    });
    return plugins;
  }
}

module.exports = new PagesData();

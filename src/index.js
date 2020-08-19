import './style.scss';

const importAll = function (val) {
  const value = val;
  value.keys().forEach(value);
};

importAll(require.context('./', true, /\.(jpg|png|svg|png)$/));
importAll(require.context('./favicons/', true, /\.(svg|png|ico|xml|json|webmanifest)$/));
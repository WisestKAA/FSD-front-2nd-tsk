import './style.scss';

function importAll(val) {
  const value = val;
  value.keys().forEach(value);
}

importAll(require.context('./', true, /\.(jpg|png|svg|png)$/));
importAll(require.context('./favicons/', true, /\.(svg|png|ico|xml|json|webmanifest)$/));

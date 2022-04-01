window._ANTOURAGE = new EventTarget();

const w = window;
const d = document;
const attach = function () {
  const script = d.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src =
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_WIDGET_URL
      : process.env.WIDGET_URL;
  const firstScript = d.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);
};
if (w.attachEvent) {
  w.attachEvent('onload', attach);
} else {
  w.addEventListener('load', attach, false);
}

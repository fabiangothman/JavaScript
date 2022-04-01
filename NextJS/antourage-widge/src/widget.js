import 'regenerator-runtime/runtime';
import 'core-js/stable';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

window._ANTOURAGE.hide = function () {
  this.dispatchEvent(new Event('requestHide'));
};

window._ANTOURAGE.show = function () {
  this.dispatchEvent(new Event('requestShow'));
};

const div = document.createElement('DIV');
document.body.appendChild(div);
ReactDOM.render(<App antourage={window._ANTOURAGE} />, div);

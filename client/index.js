import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import store from './redux/reducer';

const app = document.querySelector('#app');

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  app,
)
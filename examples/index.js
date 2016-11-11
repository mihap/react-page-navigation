import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Example from './main';

import store from './store';

const DCL = 'DOMContentLoaded';

const onDomReady = () => {
  document.removeEventListener(DCL, onDomReady);

  ReactDOM.render(
    <Provider store={ store }>
      <Example />
    </Provider>,
    document.getElementById('root')
  );
};

document.addEventListener(DCL, onDomReady);

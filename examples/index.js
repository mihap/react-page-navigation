import React from 'react';
import ReactDOM from 'react-dom';

import Example from './main';

const DCL = 'DOMContentLoaded';

const onDomReady = () => {
  document.removeEventListener(DCL, onDomReady);

  ReactDOM.render(
    React.createElement(Example),
    document.getElementById('root')
  );
};

document.addEventListener(DCL, onDomReady);

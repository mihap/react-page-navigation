import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import Classes from './styles.sass';


class SimpleExample extends Component {
  static displayName = 'SimpleExample';

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div className={ Classes.root }>
        TODO: Example
      </div>
    );
  }
}


export default SimpleExample;

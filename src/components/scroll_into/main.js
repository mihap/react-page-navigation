import React, { Component, PropTypes as T } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { simulate } from '../navigation/api';


class ScrollInto extends Component {
  static displayName = 'ScrollInto';
  static propTypes = {
    id: T.string.isRequired,
    children: T.node
  };

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleClick() {
    simulate(this.props.id);
  }

  render() {
    return (
      <span onClick={ this.handleClick } >
        { this.props.children }
      </span>
    );
  }
}

export default ScrollInto;

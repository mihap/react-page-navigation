import React, { PureComponent } from 'react';
import T from 'prop-types';
import { simulate } from '../navigation/api';


class ScrollInto extends PureComponent {
  static displayName = 'ScrollInto';
  static propTypes = {
    id: T.string.isRequired,
    children: T.node
  };

  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
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

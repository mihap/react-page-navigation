import React, { Component, createElement, PropTypes as T } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

class Link extends Component {
  static propTypes = {
    childFactory: T.func.isRequired,
    onClick:      T.func.isRequired,
    id:           T.string.isRequired,
    active:       T.bool.isRequired,
    childProps:   T.object // eslint-disable-line react/forbid-prop-types
  }

  constructor() {
    super(...arguments);

    this.createOrUpdateInstance(this.props);
    this.onClick = this.onClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUpdate(nextProps) {
    this.createOrUpdateInstance(nextProps);
  }

  onClick() {
    this.props.onClick(this.props.id);
  }

  createOrUpdateInstance({ childFactory, id, active, childProps }) {
    this.wrappedInstance = createElement(
      childFactory, { id, active, ...childProps }
    );
  }

  render() {
    return (
      <div onClick={ this.onClick }>
        { this.wrappedInstance }
      </div>
    );
  }
}

export default Link;

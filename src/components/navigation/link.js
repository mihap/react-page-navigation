import React, { Component, createElement, PropTypes as T } from 'react';


class Link extends Component {
  static propTypes = {
    childFactory: T.func.isRequired,
    onClick:      T.func.isRequired,
    id:           T.string.isRequired,
    active:       T.bool.isRequired
  }

  constructor() {
    super(...arguments);

    this.createOrUpdateInstance(this.props);
    this.onClick = this.onClick.bind(this);
  }

  componentWillUpdate(nextProps) {
    this.createOrUpdateInstance(nextProps);
  }

  onClick() {
    this.props.onClick(this.props.id);
  }

  createOrUpdateInstance({ childFactory, id, active }) {
    this.wrappedInstance = createElement(
      childFactory, { id, active }
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

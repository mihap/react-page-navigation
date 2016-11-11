import React, { Component, PropTypes as T } from 'react';


class Anchor extends Component {
  static displayName = 'Anchor';
  static propTypes = {
    registerAnchor: T.func.isRequired,
    unregisterAnchor: T.func.isRequired
  };

  constructor() {
    super();

    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    this.props.registerAnchor(this.getParentElementId());
  }

  componentWillUnmount() {
    this.props.unregisterAnchor(this.getParentElementId());
  }

  getParentElementId() {
    return this.ref.parentElement.id;
  }

  setRef(ref) {
    this.ref = ref;
  }

  render() {
    return (
      <div ref={ this.setRef } />
    );
  }
}

export default Anchor;

import React, { PureComponent } from 'react';
import T from 'prop-types';


class Anchor extends PureComponent {
  static displayName = 'Anchor';
  static propTypes = {
    registerAnchor: T.func.isRequired,
    unregisterAnchor: T.func.isRequired,
    offsetTop: T.number,
    offsetBottom: T.number,
    disabled: T.bool,
    ownProps: T.shape({})
  };

  static defaultProps = {
    offsetTop: 0,
    offsetBottom: 0
  };

  constructor() {
    super();

    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    const { offsetTop, offsetBottom } = this.props;

    this.props.registerAnchor(
      this.getParentElementId(),
      this.props.ownProps,
      { offsetTop, offsetBottom }
    );
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

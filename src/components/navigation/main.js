import React, { Component, PropTypes as T } from 'react';
import Link from './link';

const findActiveAnchor = (position, anchors) => (
  anchors.find(a => {
    const
      node = document.getElementById(a),
      { top, bottom } = node.getBoundingClientRect();

    return top <= position && bottom >= position;
  })
);


class Navigation extends Component {
  static displayName = 'Navigation';
  static propTypes = {
    childFactory: T.func.isRequired,
    anchors:      T.arrayOf(T.string).isRequired,
    className:    T.string,
    offset:       T.number
  };

  static defaultProps = {
    offset: 100
  };

  constructor() {
    super(...arguments);
    this.ticking = false;

    this.state = {
      activeAnchor: null
    };

    this.recalculate      = this.recalculate.bind(this);
    this.handleScroll     = this.handleScroll.bind(this);
    this.handleLinkClick  = this.handleLinkClick.bind(this);
    this.renderLink       = this.renderLink.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.recalculate);
    this.recalculate();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.anchors !== nextProps.anchors) {
      this.recalculate();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.recalculate);
  }

  getOffset() {
    return this.props.offset;
  }

  handleLinkClick(id) {
    const element = document.getElementById(id);

    window.scroll({
      top: element.offsetTop - this.props.offset,
      behavior: 'smooth'
    });
  }

  handleScroll() {
    const activeAnchor =
      findActiveAnchor(
        this.getOffset(),
        this.props.anchors
      );

    if (this.state.activeAnchor && !activeAnchor) {
      this.setState({ activeAnchor: null });
    } else if (activeAnchor && this.state.activeAnchor !== activeAnchor) {
      this.setState({ activeAnchor });
    }

    this.ticking = false;
  }

  recalculate() {
    if (!this.ticking) {
      window.requestAnimationFrame(this.handleScroll);
    }

    this.ticking = true;
  }

  renderLink(id) {
    return (
      <Link
        id={ id }
        key={ id }
        active={ id === this.state.activeAnchor }
        onClick={ this.handleLinkClick }
        childFactory={ this.props.childFactory }
      />
    );
  }

  render() {
    const { className, anchors } = this.props;

    return (
      <div className={ className }>
        { anchors.map(this.renderLink) }
      </div>
    );
  }
}

export default Navigation;

import React, { Component, PropTypes as T } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Link from './link';

const findActiveAnchor = (position, anchors) => (
  anchors.find(a => {
    const
      node = document.getElementById(a.parentId),
      { top, bottom } = node.getBoundingClientRect();

    return top <= position && bottom >= position;
  })
);


class Navigation extends Component {
  static displayName = 'Navigation';
  static propTypes = {
    childFactory: T.func,
    anchors:      T.arrayOf(T.shape({
      parentId: T.string.isRequired,
      props:    T.shape({})
    })).isRequired,
    className:    T.string,
    offset:       T.number,
    behavior:     T.oneOf(['auto', 'smooth']),
    onScroll:     T.func,
    onEnter:      T.func,
    onLeave:      T.func
  };

  static defaultProps = {
    offset: 0,
    behavior: 'smooth'
  };

  constructor() {
    super(...arguments);
    this.ticking = false;

    this.state = {
      activeAnchor: null
    };

    this.recalculate      = this.recalculate.bind(this);
    this.handleEvent      = this.handleEvent.bind(this);
    this.handleLinkClick  = this.handleLinkClick.bind(this);
    this.renderLink       = this.renderLink.bind(this);

    this.onScroll = this.onScroll.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.recalculate, false);
    window.addEventListener('resize', this.recalculate, false);
    this.recalculate();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.anchors !== nextProps.anchors) {
      this.recalculate();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('scroll', this.recalculate);
    window.removeEventListener('resize', this.recalculate);
  }

  onEnter(current, previous) {
    this.onLeave(previous);
    if (typeof this.props.onEnter === 'function') {
      const { parentId, props } = current;
      this.props.onEnter({ id: parentId, props: { ...props } });
    }
  }

  onScroll() {
    if (typeof this.props.onScroll === 'function') {
      this.props.onScroll(window.scrollY);
    }
  }

  onLeave(previous) {
    if (typeof this.props.onLeave === 'function' && previous !== null) {
      const { parentId, props } = previous;
      this.props.onLeave({ id: parentId, props: { ...props } });
    }
  }

  getOffset() {
    return this.props.offset;
  }

  handleLinkClick(id) {
    const element = document.getElementById(id);
    window.scroll({
      top: element.offsetTop - this.props.offset,
      behavior: this.props.behavior
    });
  }

  handleEvent() {
    const
      previous = this.state.activeAnchor,
      activeAnchor =
        findActiveAnchor(
          this.getOffset(),
          this.props.anchors
        );

    if (this.state.activeAnchor && !activeAnchor) {
      this.setState({ activeAnchor: null }, () => {
        this.onLeave(previous);
      });
    } else if (activeAnchor && this.state.activeAnchor !== activeAnchor) {
      this.setState({ activeAnchor }, () => {
        this.onEnter(activeAnchor, previous);
      });
    }

    this.onScroll();
    this.ticking = false;
  }

  recalculate() {
    if (!this.ticking) {
      this.raf = window.requestAnimationFrame(this.handleEvent);
    }

    this.ticking = true;
  }

  renderLink(anchor) {
    const { parentId, props } = anchor;

    return (
      <Link
        id={ parentId }
        key={ parentId }
        active={ this.state.activeAnchor === anchor }
        onClick={ this.handleLinkClick }
        childFactory={ this.props.childFactory }
        childProps={ props }
      />
    );
  }

  render() {
    const { className, anchors, childFactory } = this.props;

    return (
      <span className={ className }>
        { childFactory ? anchors.map(this.renderLink) : null }
      </span>
    );
  }
}

export default Navigation;

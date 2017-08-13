import React, { PureComponent } from 'react';
import T from 'prop-types';
import MutationObserver from 'mutation-observer';
import { mount, unmount } from './api';
import Link from './link';

const noop = () => {};
const MUTATION_CONFIG = { attributes: true, childList: true, characterData: false, subtree: true };

const findActiveAnchor = (position, anchors) => (
  anchors.find(({ parentId, configuration: { offsetTop, offsetBottom } }) => {
    const
      node = document.getElementById(parentId),
      { top, bottom } = node.getBoundingClientRect();

    return Math.round(top) <= position + offsetTop && Math.round(bottom) > position - offsetBottom;
  }) || null
);

const getAnchorOwnProps = (anchor) => {
  const { parentId, props } = anchor;
  return { parentId, props };
};

class Navigation extends PureComponent {
  static displayName = 'Navigation';
  static propTypes = {
    childFactory: T.func,
    anchors:      T.arrayOf(T.shape({
      parentId: T.string.isRequired,
      props:    T.shape({}),
      configuration: T.shape({
        offsetTop: T.number.isRequired,
        offsetBottom: T.number.isRequired,
        disabled: T.bool
      })
    })).isRequired,
    className:    T.string,
    offset:       T.number,
    behavior:     T.oneOf(['auto', 'smooth']),
    onScroll:     T.func,
    onEnter:      T.func,
    onLeave:      T.func,
    onChange:     T.func
  };

  static defaultProps = {
    offset: 0,
    behavior: 'smooth',
    onScroll: noop,
    onEnter: noop,
    onLeave: noop,
    onChange: noop
  };

  constructor() {
    super(...arguments);
    this.ticking = false;

    this.state = {
      activeAnchor: null
    };

    this.recalculate      = this.recalculate.bind(this);
    this.handleEvent      = this.handleEvent.bind(this);
    this.handleMutation   = this.handleMutation.bind(this);
    this.handleLinkClick  = this.handleLinkClick.bind(this);
    this.renderLink       = this.renderLink.bind(this);

    this.onScroll = this.onScroll.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  componentDidMount() {
    mount(this);
    this.mutationObserver = new MutationObserver(this.handleMutation);
    this.mutationObserver.observe(document.body, MUTATION_CONFIG);

    window.addEventListener('scroll', this.recalculate, false);
    window.addEventListener('resize', this.recalculate, false);
    this.recalculate();

    if (this.props.anchors.length !== 0) {
      this.props.onChange(this.props.anchors.map(getAnchorOwnProps));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prev = prevState.activeAnchor;
    const next = this.state.activeAnchor;

    if (prev && prev !== next) {
      this.onLeave(prev);
    }

    if (next && next !== prev) {
      this.onEnter(next);
    }

    if (this.props.anchors !== prevProps.anchors) {
      this.recalculate();
      this.props.onChange(this.props.anchors.map(getAnchorOwnProps));
    }
  }

  componentWillUnmount() {
    unmount();
    this.mutationObserver.disconnect();
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('scroll', this.recalculate);
    window.removeEventListener('resize', this.recalculate);
  }

  onEnter(current) {
    const { parentId, props } = current;
    this.props.onEnter({ id: parentId, props: { ...props } });
  }

  onLeave(previous) {
    const { parentId, props } = previous;
    this.props.onLeave({ id: parentId, props: { ...props } });
  }

  onScroll() {
    this.props.onScroll(window.scrollY || window.pageYOffset, this.state.activeAnchor);
  }

  handleLinkClick(id) {
    const anchor = this.props.anchors.find(a => a.parentId === id);

    if (!anchor.configuration.disabled) {
      const element = document.getElementById(id);

      window.scroll({
        top: element.offsetTop - this.props.offset - anchor.configuration.offsetTop,
        behavior: this.props.behavior
      });
    }
  }

  handleMutation() {
    this.recalculate();
  }

  handleEvent() {
    const activeAnchor = findActiveAnchor(
        this.props.offset,
        this.props.anchors
      );

    this.setState({ activeAnchor });

    this.ticking = false;
    this.mutationObserver.observe(document.body, MUTATION_CONFIG);
    this.onScroll();
  }

  recalculate() {
    if (!this.ticking) {
      this.mutationObserver.disconnect();
      this.raf = window.requestAnimationFrame(this.handleEvent);
    }

    this.ticking = true;
  }

  renderLink(anchor) {
    const { parentId, props } = getAnchorOwnProps(anchor);

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

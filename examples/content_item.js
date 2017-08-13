import React, { PureComponent } from 'react';
import T from 'prop-types';
import { Anchor } from 'react-page-navigation';
import { contentItemMargin } from 'assets/variables.scss';

import Classes from './styles.sass';

const offset = parseInt(contentItemMargin, 10);


const getRandomInt = (min, max) => (
  Math.floor(Math.random() * (max - min)) + min
);


class ContentItem extends PureComponent {
  static displayName = 'ContentItem';
  static propTypes = {
    id: T.string.isRequired,
    label: T.string
  }

  constructor() {
    super();

    this.state = {
      innerElementHeight: getRandomInt(0, 1000),
      loaded: false
    };

    this.updateChildrenElementHeight = this.updateChildrenElementHeight.bind(this);
  }

  componentDidMount() {
    // simutale async load of content
    setTimeout(this.updateChildrenElementHeight, getRandomInt(5 * 100, 15 * 100));
  }

  updateChildrenElementHeight() {
    this.setState({
      innerElementHeight: getRandomInt(0, 1500),
      loaded: true
    });
  }

  render() {
    const { id, label } = this.props;

    return (
      <div className={ Classes.contentItem } id={ id }>
        <div style={ { minHeight: this.state.innerElementHeight } } />
        <Anchor label={ label } offsetTop={ offset } />
        { this.state.loaded ? label : 'loading...' }
      </div>
    );
  }
}

export default ContentItem;

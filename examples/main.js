import React, { PureComponent } from 'react';
import T from 'prop-types';
import { Navigation } from 'react-page-navigation';
import { navHeight } from 'assets/variables.scss';
import ContentItem from './content_item';

import Classes from './styles.sass';

const navigationHeight = parseInt(navHeight, 10);
const ITEMS = [
  { id: 'content-item-first',   label: 'First' },
  { id: 'content-item-second',  label: 'Second' },
  { id: 'content-item-third',   label: 'Third' },
  { id: 'content-item-fourth',  label: 'Fourth' }
];

const linkRenderer = ({ active, label }) => {
  const className = `
    ${ Classes.link }
    ${ active ? Classes.active : '' }
  `;

  return (
    <div className={ className }>
      { label }
    </div>
  );
};
linkRenderer.propTypes = {
  id: T.string.isRequired,
  active: T.bool,
  label: T.string
};

const renderItem = (item) => <ContentItem { ...item } key={ item.id } />;


class SimpleExample extends PureComponent {
  static displayName = 'SimpleExample';

  constructor() {
    super();
    this.state = { scrolledInto: false };
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll(scrollY) {
    if (scrollY < navigationHeight && this.state.scrolledInto) {
      this.setState({ scrolledInto: false });
    } else if (scrollY >= navigationHeight && !this.state.scrolledInto) {
      this.setState({ scrolledInto: true });
    }
  }

  render() {
    const navClassname = `
      ${ Classes.navigation }
      ${ this.state.scrolledInto ? Classes.withShadow : '' }
    `;
    return (
      <div className={ Classes.root }>
        <Navigation
          childFactory={ linkRenderer }
          className={ navClassname }
          offset={ navigationHeight + 10 }
          onScroll={ this.onScroll }
        />

        <div className={ Classes.content }>
          { ITEMS.map(renderItem) }
        </div>
      </div>
    );
  }
}


export default SimpleExample;

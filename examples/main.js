import React, { Component, PropTypes as T } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { Anchor, Navigation } from 'react-page-navigation';

import Classes from './styles.sass';


const linkRenderer = ({ id, active }) => {
  const className = `
    ${ Classes.link }
    ${ active ? Classes.active : '' }
  `;

  return (
    <div className={ className }>
      { id }
    </div>
  );
};
linkRenderer.propTypes = {
  id: T.string.isRequired,
  active: T.bool
};


class SimpleExample extends Component {
  static displayName = 'SimpleExample';

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div className={ Classes.root }>
        <Navigation childFactory={ linkRenderer } className={ Classes.navigation } />

        <div className={ Classes.content }>
          <div className={ Classes.contentItem } id="content-item-first">
            <Anchor />

            first
          </div>

          <div className={ Classes.contentItem } id="content-item-second">
            <Anchor />

            second
          </div>

          <div className={ Classes.contentItem } id="content-item-third">
            <Anchor />

            third
          </div>

          <div className={ Classes.contentItem } id="content-item-fourth">
            <Anchor />

            fourth
          </div>
        </div>
      </div>
    );
  }
}


export default SimpleExample;

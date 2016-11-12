import React, { Component, PropTypes as T } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { Anchor, Navigation } from 'react-page-navigation';

import Classes from './styles.sass';


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


class SimpleExample extends Component {
  static displayName = 'SimpleExample';

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <div className={ Classes.root }>
        <Navigation childFactory={ linkRenderer } className={ Classes.navigation } offset={ 80 } />

        <div className={ Classes.content }>
          <div className={ Classes.contentItem } id="content-item-first">
            <Anchor label="First" />

            first
          </div>

          <div className={ Classes.contentItem } id="content-item-second">
            <Anchor label="Second" />

            second
          </div>

          <div className={ Classes.contentItem } id="content-item-third">
            <Anchor label="Third" />

            third
          </div>

          <div className={ Classes.contentItem } id="content-item-fourth">
            <Anchor label="Fourth" />

            fourth
          </div>
        </div>
      </div>
    );
  }
}


export default SimpleExample;

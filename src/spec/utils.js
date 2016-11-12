import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  navigationReducer,
  Anchor,
  Navigation as ConnectedNavigation
} from 'react-page-navigation';


// Reducer

export const getStore = () => {
  const rootReducer = combineReducers({
    navigation: navigationReducer
  });

  return createStore(rootReducer);
};

// Fixtures

export const setup = (store, children) => (
  <Provider store={ store }>
    { children }
  </Provider>
);

export const getSection = (parentAttrs = {}, anchorProps = {}) => (
  <section { ...parentAttrs }>
    <Anchor { ...anchorProps } />
  </section>
);

export const getNavigation = (props = {}) => (
  <ConnectedNavigation
    childFactory={ ({ label, id }) => (<div name={ id } className="nav-link">{ label }</div>) }
    behavior="auto"
    { ...props }
  />
);

export const getSections = (prefix, sectionStyle = {}, anchorProps = {}) => (
  [1, 2, 3, 4, 5].map(i => (
    getSection({ id: `${ prefix }-${ i }`, style: sectionStyle, key: i }, anchorProps)
  ))
);

export class Stub extends React.Component {
  componentDidMount() {}
  componentWillReceiveProps() {}
  render() {
    return <div />;
  }
}

// DOM static markup

const NAV_ELEMENT_ID = 'nav-element';
const CONTENT_ELEMENT_ID = 'content-element';

export const prepareDOM = () => {
  const
    navElement = document.createElement('div'),
    contentElement = document.createElement('div');

  navElement.id = NAV_ELEMENT_ID;
  contentElement.id = CONTENT_ELEMENT_ID;

  document.body.appendChild(navElement);
  document.body.appendChild(contentElement);
  document.body.style.height = '10000px';

  return { nav: navElement, content: contentElement };
};

export const cleanDOM = () => {
  const
    navElement = document.getElementById(NAV_ELEMENT_ID),
    contentElement = document.getElementById(CONTENT_ELEMENT_ID);

  document.body.removeChild(navElement);
  document.body.removeChild(contentElement);
};

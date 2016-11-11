import React from 'react';
import { combineReducers, createStore } from 'redux';
import { navigationReducer } from 'react-page-navigation';
import { Provider } from 'react-redux';

export const getStore = () => {
  const rootReducer = combineReducers({
    navigation: navigationReducer
  });

  return createStore(rootReducer);
};

export const setup = (store, children) => (
  <Provider store={ store }>
    { children }
  </Provider>
);

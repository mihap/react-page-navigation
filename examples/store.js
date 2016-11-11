import { combineReducers, createStore } from 'redux';
import { navigationReducer } from 'react-page-navigation';


const rootReducer = combineReducers({
  navigation: navigationReducer
});

const store = createStore(rootReducer);

export default store;

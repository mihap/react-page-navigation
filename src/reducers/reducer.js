
import { Constants } from 'actions/actions';


const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }

  return state;
};


const getInitialState = () => ({
  anchors: []
});

const reducer = createReducer(getInitialState(), {
  [Constants.REGISTER](state, action) {
    const anchors = [...state.anchors, action.payload];
    return { ...state, anchors };
  },

  [Constants.UNREGISTER](state, action) {
    const anchors = state.anchors.filter(a => a !== action.payload);
    return { ...state, anchors };
  }
});

export default reducer;

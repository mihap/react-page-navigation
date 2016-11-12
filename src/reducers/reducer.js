
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
    const
      { parentId, props } = action.payload,
      anchors = [...state.anchors, { parentId, props }];

    return { ...state, anchors };
  },

  [Constants.UNREGISTER](state, action) {
    const anchors = state.anchors.filter(a => a.parentId !== action.payload.parentId);
    return { ...state, anchors };
  },

  [Constants.UPDATE](state, action) {
    const
      { parentId, props } = action.payload,
      index = state.anchors.findIndex(a => a.parentId === parentId);

    if (index !== -1) {
      const anchors = [...state.anchors];
      anchors[index] = { parentId, props };
      return { ...state, anchors };
    }

    return state;
  }
});

export default reducer;

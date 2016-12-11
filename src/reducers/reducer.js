
import { Constants } from '../actions/actions';


const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }

  return state;
};

const sort = (anchors) => {
  const scrollY = window.scrollY || window.pageYOffset;

  /* eslint-disable no-param-reassign */
  const offsets = anchors.reduce((out, a) => {
    const el = document.getElementById(a.parentId);

    if (el) {
      out[a.parentId] = el.getBoundingClientRect().top + scrollY;
    }
    return out;
  }, {});
  /* eslint-enable no-param-reassign */

  return anchors.sort((a, b) => (
    offsets[a.parentId] - offsets[b.parentId]
  ));
};


const getInitialState = () => ({
  anchors: []
});

const reducer = createReducer(getInitialState(), {
  [Constants.REGISTER](state, action) {
    const
      { parentId, props, configuration } = action.payload,
      anchors = sort([...state.anchors, { parentId, props, configuration }]);

    return { ...state, anchors };
  },

  [Constants.UNREGISTER](state, action) {
    const anchors = state.anchors.filter(a => a.parentId !== action.payload.parentId);
    return { ...state, anchors };
  },

  [Constants.UPDATE](state, action) {
    const
      { parentId, props, configuration } = action.payload,
      index = state.anchors.findIndex(a => a.parentId === parentId);

    if (index !== -1) {
      const anchors = [...state.anchors];
      anchors[index] = { parentId, props, configuration };
      return { ...state, anchors: sort(anchors) };
    }

    return state;
  }
});

export default reducer;

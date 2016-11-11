

export const Constants = {
  REGISTER:   '@@navigation:anchor:register',
  UNREGISTER: '@@navigation:anchor:unregister'
};

const updateAnchors = (action) =>
  (component) => ({
    type: Constants[action],
    payload: component
  });

export const registerAnchor = updateAnchors('REGISTER');
export const unregisterAnchor = updateAnchors('UNREGISTER');



export const Constants = {
  REGISTER:   '@@navigation:anchor:register',
  UNREGISTER: '@@navigation:anchor:unregister',
  UPDATE:     '@@navigation:anchor:update'
};

const updateAnchors = (action) =>
  (parentId, props, configuration) => ({
    type: Constants[action],
    payload: { parentId, props, configuration }
  });

export const registerAnchor = updateAnchors('REGISTER');
export const unregisterAnchor = updateAnchors('UNREGISTER');
export const updateAnchorWithNewProps = updateAnchors('UPDATE');

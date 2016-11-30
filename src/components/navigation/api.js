
const api = { instance: null };

api.mount = (instance) => { api.instance = instance; };
api.unmount = () => { api.instance = null; };
api.simulate = (id) => {
  if (api.instance) {
    api.instance.handleLinkClick(id);
  }
};


const { mount, unmount, simulate } = api;
export { mount, unmount, simulate };

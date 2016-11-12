import jasmineEnzyme from 'jasmine-enzyme';
import { Anchor } from 'react-page-navigation';
import { mount } from 'enzyme';

import {
  getStore,
  setup,
  prepareDOM,
  cleanDOM,
  getSection
} from './utils';


describe('<Anchor />', () => {
  let store;

  beforeAll(() => {
    prepareDOM();
  });

  afterAll(() => {
    cleanDOM();
  });

  beforeEach(() => {
    jasmineEnzyme();
    store = getStore();
  });


  it('should work', () => {
    spyOn(Anchor.prototype, 'componentDidMount');
    const section = getSection({ id: 'section' });

    mount(setup(store, section));
    expect(Anchor.prototype.componentDidMount).toHaveBeenCalled();
  });

  it('should register anchor on mount', () => {
    expect(store.getState().navigation.anchors).toEqual([]);
    const section = getSection({ id: 'section' });

    mount(setup(store, section));
    expect(store.getState().navigation.anchors).toEqual(['section']);
  });

  it('should unregister anchor on unmount', () => {
    const section = getSection({ id: 'section' });
    const mounted = mount(setup(store, section));

    expect(store.getState().navigation.anchors).toEqual(['section']);
    mounted.unmount();
    expect(store.getState().navigation.anchors).toEqual([]);
  });
});

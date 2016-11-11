import React from 'react';
import jasmineEnzyme from 'jasmine-enzyme';
import { Anchor } from 'react-page-navigation';
import { mount } from 'enzyme';

import { getStore, setup } from './utils';

let store;

const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

describe('<Anchor />', () => {
  beforeEach(() => {
    jasmineEnzyme();
    store = getStore();
  });


  it('should work', () => {
    spyOn(Anchor.prototype, 'componentDidMount');

    const subject = (
      <div id="subject">
        <Anchor />
      </div>
    );
    mount(setup(store, subject), { attachTo: rootElement });
    expect(Anchor.prototype.componentDidMount).toHaveBeenCalled();
  });

  it('should register anchor on mount', () => {
    const subject = (
      <div id="subject">
        <Anchor />
      </div>
    );
    mount(setup(store, subject), { attachTo: rootElement });
    expect(store.getState().navigation.anchors).toEqual(['subject']);
  });

  it('should unregister anchor on unmount', () => {
    const subject = (
      <div id="subject">
        <Anchor />
      </div>
    );
    const mounted = mount(setup(store, subject), { attachTo: rootElement });
    expect(store.getState().navigation.anchors).toEqual(['subject']);
    mounted.unmount();
    expect(store.getState().navigation.anchors).toEqual([]);
  });
});

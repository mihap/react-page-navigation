/* eslint-disable react/prop-types */
import React from 'react';
import jasmineEnzyme from 'jasmine-enzyme';
import { mount } from 'enzyme';

import Link from '../components/navigation/link';


const props = {
  childFactory: ({ id }) => (<div id={ id } />),
  onClick: () => {},
  id: 'foo',
  active: false
};

describe('<Link />', () => {
  beforeEach(() => {
    jasmineEnzyme();
  });

  it('should work', () => {
    if (typeof Link.prototype.componentDidMount !== 'function') {
      Link.prototype.componentDidMount = () => {};
    }
    spyOn(Link.prototype, 'componentDidMount');

    mount(<Link { ...props } />);
    expect(Link.prototype.componentDidMount).toHaveBeenCalled();
  });

  it('should create wrapped instance', () => {
    const wrapper = mount(<Link { ...props } />);

    expect(wrapper.find(`div#${ props.id }`)).toBePresent();
  });

  it('should update created wrapped instance', () => {
    const wrapper = mount(<Link { ...props } />);
    wrapper.setProps({ id: 'bar' });

    expect(wrapper.find('div#bar')).toBePresent();
    expect(wrapper.find('div#foo')).not.toBePresent();
  });
});


/* eslint-disable react/prop-types */
import React from 'react';
import jasmineEnzyme from 'jasmine-enzyme';
import { Navigation as ConnectedNavigation } from 'react-page-navigation';
import { mount } from 'enzyme';

import Navigation from '../components/navigation/main';
import {
  getStore,
  setup,
  prepareDOM,
  cleanDOM,
  getNavigation,
  getSections
} from './utils';


describe('<Navigation />', () => {
  let
    store,
    dom;

  beforeAll(() => {
    dom = prepareDOM();
  });

  afterAll(() => {
    cleanDOM();
  });

  beforeEach(() => {
    jasmineEnzyme();
    store = getStore();
  });

  it('should work', () => {
    spyOn(Navigation.prototype, 'componentDidMount');
    const subject = getNavigation();

    mount(setup(store, subject));
    expect(Navigation.prototype.componentDidMount).toHaveBeenCalled();
  });

  describe('async rendering', () => {
    let wrapper;

    beforeEach(done => {
      spyOn(Navigation.prototype, 'setState');

      const subject = (
        <div>
          { getNavigation({ offset: 200 }) }
          { getSections('section', { height: 600 }) }
        </div>
      );

      wrapper = mount(setup(store, subject), { attachTo: dom.nav });
      done();
    });

    afterEach((done) => {
      window.scrollTo(0, 0);
      window.requestAnimationFrame(() => {
        done();
      });
    });

    it('should have links equal to sections count', (done) => {
      expect(wrapper.find(ConnectedNavigation).find('.nav-link').length).toEqual(5);
      done();
    });

    it('should render active link on mount', (done) => {
      window.requestAnimationFrame(() => {
        expect(Navigation.prototype.setState).toHaveBeenCalledTimes(1);
        expect(Navigation.prototype.setState).toHaveBeenCalledWith({ activeAnchor: 'section-1' });
        done();
      });
    });

    it('should handle scroll', (done) => {
      const element = document.getElementById('section-2');
      element.scrollIntoView();

      window.requestAnimationFrame(() => {
        expect(Navigation.prototype.setState).toHaveBeenCalledTimes(1);
        expect(Navigation.prototype.setState).toHaveBeenCalledWith({ activeAnchor: 'section-2' });
        done();
      });
    });

    it('should handle link click', (done) => {
      wrapper.find(ConnectedNavigation).find('[name="section-2"]').simulate('click');

      window.requestAnimationFrame(() => {
        const section = document.getElementById('section-2');
        const isScrolled = (window.scrollY === section.offsetTop - 200);
        expect(isScrolled).toEqual(true);
        done();
      });
    });
  });
});


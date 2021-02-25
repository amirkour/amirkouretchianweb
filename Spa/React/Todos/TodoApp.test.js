import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoApp from './TodoApp';

configure({ adapter: new Adapter() });

describe('TodoApp', () => {

    test('has a textbox w/ focus', () => {
        const wrapper = mount(<TodoApp />);

        // NOTE: whether I 'autofocus' and/or call focus() on this textbox
        // in the TodoApp component, it doesn't matter.  The following selector
        // is always returning
        expect(wrapper.find('input:focus')).toBeDefined();
    })

});
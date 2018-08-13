import React, { Component } from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('App component', () => {
    describe('Initial State', () => {
        const wrapper = shallow(<App />);
        const { input } = wrapper.state();

        it('starts with a input equals to null', () => {
            expect(input).toEqual("");
        })

        it('starts with a error message not rendered', () => {
            let errorElem = wrapper.find('span.error-message');
            expect(errorElem.exists()).toEqual(false);
        })
    });

    describe('User interaction', () => {

        it('user is able to input value', () => {
            const wrapper = shallow(<App />);

            // Simulate keyboard input
            let inputElem = wrapper.find('input');
            inputElem.simulate('change', {target: {value: 'a'}});

            // Get state
            const { input } = wrapper.state();

            expect(input).toEqual('a');
        })
    });
});
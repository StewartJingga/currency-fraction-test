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

        it('starts with result box not rendered', () => {
            let resultElem = wrapper.find('#result');
            expect(resultElem.exists()).toEqual(false);
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

        it('inputting invalid value will show error', () => {
            const wrapper = shallow(<App />);

            // Simulate keyboard input
            let inputElem = wrapper.find('input');
            inputElem.simulate('change', {target: {value: 'Rp. 1000,50'}});

            let errorElem = wrapper.find('span.error-message');
            expect(errorElem.exists()).toEqual(true);
        })

        it('inputting valid value will not show error', () => {
            const wrapper = shallow(<App />);

            // Simulate keyboard input
            let inputElem = wrapper.find('input');
            inputElem.simulate('change', {target: {value: 'Rp. 1000,00'}});

            let errorElem = wrapper.find('span.error-message');
            expect(errorElem.exists()).toEqual(false);
        })

        it('pressing enter on invalid value will not show result', () => {
            const wrapper = shallow(<App />);

            // Simulate keyboard input
            let inputElem = wrapper.find('input');
            inputElem.simulate('change', {target: {value: 'Rp. 1000.0,0'}});

            let formElem = wrapper.find('form');
            formElem.simulate('keypress', {which: 13, preventDefault: () => {}});

            let resultElem = wrapper.find("#result");
            expect(resultElem.exists()).toEqual(false);
        })

        it('pressing enter on valid value will show result', () => {
            const wrapper = shallow(<App />);

            // Simulate keyboard input
            let inputElem = wrapper.find('input');
            inputElem.simulate('change', {target: {value: 'Rp. 1000'}});

            let formElem = wrapper.find('form');
            formElem.simulate('keypress', {which: 13, preventDefault: () => {}});

            let resultElem = wrapper.find("#result");
            expect(resultElem.exists()).toEqual(true);
        })
    });
});
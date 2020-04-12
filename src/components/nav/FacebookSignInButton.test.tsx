import React from 'react';
import ReactDOM from 'react-dom';
import { Auth } from 'aws-amplify';
import FacebookSignInButton from './FacebookSignInButton';
import { act } from 'react-dom/test-utils';

describe('<FacebookSignInButton/>', () => {
    const currentSessionSpy = jest.spyOn(Auth, 'federatedSignIn');

    let container: Element;

    beforeEach(() => {
        currentSessionSpy.mockImplementation();

        container = document.createElement('div');
        document.body.appendChild(container);
        
        act(() => {
            ReactDOM.render(<FacebookSignInButton/>, container)
        });
    });

    afterEach(() => {
        currentSessionSpy.mockClear();

        document.body.removeChild(container);
    });

    it('will call get federated sign on when the button is pressed', () => {
        const button = container.querySelector('button');

        act(() => {
            button?.dispatchEvent(new MouseEvent('click', undefined));
        });

        expect(currentSessionSpy).toHaveBeenCalledTimes(1);
    });
});

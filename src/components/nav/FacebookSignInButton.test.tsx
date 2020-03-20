import React from 'react';
import { shallow } from 'enzyme';
import { Auth } from 'aws-amplify';
import FacebookSignInButton from './FacebookSignInButton';

describe('<FacebookSignInButton />', () => {
    const wrapper = shallow(<FacebookSignInButton/>);

    jest.mock('aws-amplify');

    it('renders a button that will sign on click', () =>{
        wrapper.find('button').simulate('click');

        expect(Auth.federatedSignIn).toBeCalledTimes(1);
    });
});

import React from 'react';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib-esm/types';

interface Props {
  largeBtn: boolean
};

export default function FacebookSignInButton(props: Props) {
    const signIn = async () => {
        Auth.federatedSignIn({
          provider: CognitoHostedUIIdentityProvider.Facebook
        });
    }

    return (
      <div>
        {props.largeBtn ? <button className="btn Facebook btn-lg" onClick={signIn} >
          Continue with Facebook
        </button> : <button className="btn Facebook" onClick={signIn} >
          Continue with Facebook
        </button>}
      </div>
    )    
}
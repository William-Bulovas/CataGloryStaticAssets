import React from 'react';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib-esm/types';

export default function FacebookSignInButton() {
    const signIn = async () => {
        Auth.federatedSignIn({
          provider: CognitoHostedUIIdentityProvider.Facebook
        });
    }

    return (
      <div>
        <button className="btn Facebook" onClick={signIn} >
          Continue with Facebook
        </button>
      </div>
    )    
}
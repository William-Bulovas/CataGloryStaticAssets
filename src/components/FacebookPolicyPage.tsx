import React from 'react';
import { Auth } from 'aws-amplify';

interface Props {
    loginState: boolean
};

export default function FacebookPolicyPage(props: Props) {
    const signOut = () => {
        Auth.signOut();
    };

    return (
        <div>
            <h2>
                Our Privacy Policy
            </h2>
            <br/>
            <h4>
                Personal Data
            </h4>
            <br/>
            <p>
                Cataglory only collects the miinimum amount of data from you to perform the service. Keeping your privacy is extremely
                to our team and we only ask for things that are needed. We collect your Facebook Email and Facebook Name to show to your
                opponents.
            </p>

            { props.loginState &&
                <button className="btn Facebook" onClick={signOut} >
                    Sign out of Facebook
                </button>
            }
        </div>
    )
}

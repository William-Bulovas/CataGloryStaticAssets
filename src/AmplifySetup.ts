import Amplify, {Auth, API} from 'aws-amplify';

export default function AmplifySetup() {
    Amplify.Logger.LOG_LEVEL = 'DEBUG';
    Auth.configure({
        region: "us-west-2",
        userPoolId: "us-west-2_GbZzqEa8I",
        clientId: "258qmlhuh1a2h2h2a8d5qg82q6",
        userPoolWebClientId: "258qmlhuh1a2h2h2a8d5qg82q6",

        mandatorySignIn: false,

        cookieStorage: {
            domain: "d30igcs3iq7430.cloudfront.net",
            secure: false
        },

        oauth: {
            domain: "cataglory.auth.us-west-2.amazoncognito.com",
            scope: ["openid"],
            redirectSignIn: "https://d30igcs3iq7430.cloudfront.net/",
            redirectSignOut: "https://d30igcs3iq7430.cloudfront.net/",
            responseType: "code"
        }
    });
    
    API.configure({
        endpoints: [
            {
                name: "CataGloryBackEnd",
                endpoint: "https://z1riua6sa6.execute-api.us-west-2.amazonaws.com/prod",
                region: "us-west-2"
            }
        ]
    });
}

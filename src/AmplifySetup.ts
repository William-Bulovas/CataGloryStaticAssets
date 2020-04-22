import Amplify, {Auth, API} from 'aws-amplify';
import {APIConfig} from './EnvConfig';

export default function AmplifySetup() {
    let apiConfig: APIConfig = new APIConfig();

    Amplify.Logger.LOG_LEVEL = 'DEBUG';
    Auth.configure({
        region: "us-west-2",
        userPoolId: apiConfig.getCognitoUserPoolId(),
        clientId: apiConfig.getCognitoClientId(),
        userPoolWebClientId: apiConfig.getCognitoUserPoolWebClientId(),

        mandatorySignIn: false,

        cookieStorage: {
            domain: "localhost", 
            secure: false
        },

        oauth: {
            domain: apiConfig.getOathDomain(),
            scope: ["openid"],
            // redirectSignIn: "https://"+ apiConfig.getCloudfrontDomain() +"/",
            // redirectSignOut: "https://"+ apiConfig.getCloudfrontDomain() +"/",
            redirectSignIn: "http://localhost:3000/",
            redirectSignOut: "http://localhost:3000/",
            responseType: "code"
        }
    });
    
    API.configure({
        endpoints: [
            {
                name: "CataGloryBackEnd",
                endpoint: apiConfig.getApiEndpoint(),
                region: "us-west-2"
            }
        ]
    });
}

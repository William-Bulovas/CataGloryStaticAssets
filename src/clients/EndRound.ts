import BasicBackendCall from './BasicBackEndCall';
import { Auth } from 'aws-amplify';


export default async function EndRound(gameId: string): Promise<void> {
    return Auth.currentSession()
    .then(session => {
        const userId = session.getIdToken().payload["cognito:username"];
        
        const resourcePath = 'ROUND/' + userId + "/" + gameId;

        return BasicBackendCall.call('POST', resourcePath);
    }).then();
};

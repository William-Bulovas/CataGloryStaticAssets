import { Auth } from "aws-amplify";
import BasicBackendCall from './BasicBackEndCall';



export default function StartGame(gameId: string): Promise<void> {
    return Auth.currentSession()
    .then(session => {
        const userId = session.getIdToken().payload["cognito:username"];
        
        const resourcePath = 'START/' + userId + '/' + gameId;

        return BasicBackendCall.call('PUT', resourcePath);
    })
    .then();
}

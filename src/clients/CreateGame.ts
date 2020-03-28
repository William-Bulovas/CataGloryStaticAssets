import { Auth } from "aws-amplify";
import BasicBackendCall from './BasicBackEndCall';

export interface CreateGameResponse {
    gameId: string
}

export default function CreateGame() {
    return Auth.currentSession()
    .then(session => 
        BasicBackendCall.call('POST', 'GAME', JSON.stringify({
            userId: session.getIdToken().payload["cognito:username"]
    })))
    .then(response => response.text())
    .then(text => JSON.parse(text))
    .then(json => json as unknown as CreateGameResponse)
}

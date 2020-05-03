import { Auth } from "aws-amplify";
import BasicBackendCall from './BasicBackEndCall';

export interface CreateGameResponse {
    gameId: string
}

export default function CreateGame(nickname: string) {
    return Auth.currentSession()
        .then(session => 
            BasicBackendCall.call('POST', 'GAME', JSON.stringify({
                userId: session.getIdToken().payload["cognito:username"],
                nickname: nickname
        })))
        .then(json => json as CreateGameResponse)
}

import { Auth } from "aws-amplify";
import BasicBackendCall from './BasicBackEndCall';

export interface JoinGameResponse {
    gameId: string
}

export default function JoinGame(gameId: string): Promise<JoinGameResponse> {
    return Auth.currentSession().then(session => 
        BasicBackendCall.call('PUT', 'GAME', JSON.stringify({
            userId: session.getIdToken().payload["cognito:username"],
            gameId: gameId
        })))
        .then(response => response.json())
        .then(json => json as unknown as JoinGameResponse);
}

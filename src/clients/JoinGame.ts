import { Auth } from "aws-amplify";
import BasicBackendCall from './BasicBackEndCall';

export interface JoinGameResponse {
    gameId: string,
    userId: string
}

export default function JoinGame(gameId: string, nickname: string): Promise<JoinGameResponse> {
    return Auth.currentSession().then(session => 
        BasicBackendCall.call('PUT', 'GAME', JSON.stringify({
            userId: session.getIdToken().payload["cognito:username"],
            gameId: gameId,
            nickname: nickname
        })))
        .then(response => response.json())
        .then(response => {
            console.log(JSON.stringify)
            return response;
        })
        .then(json => json as unknown as JoinGameResponse);
}

import { Auth } from "aws-amplify";
import BasicBackendCall from './BasicBackEndCall';

export interface BasicGameInfo {
    userId: string,
    gameId: string
}

export interface GetGamesResponse {
    games: BasicGameInfo[]
}

export default function GetGames(state?: string): Promise<GetGamesResponse> {
    return Auth.currentSession()
    .then(session => {
        const userId = session.getIdToken().payload["cognito:username"];
        
        const resourcePath = 'GAMES/' + userId + (state ? '/' + state : '');

        return BasicBackendCall.call('GET', resourcePath);
    })
    .then(response => response.text())
    .then(text => {
        console.log(text);
        return JSON.parse(text);
    })
    .then(json => {
        console.log(JSON.stringify(json));
        return json;
    })
    .then(json => json as unknown as GetGamesResponse);
}

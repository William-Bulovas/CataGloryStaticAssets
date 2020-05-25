import { Auth } from "aws-amplify";
import BasicBackendCall from './BasicBackEndCall';
import { GameStates } from "./GetGame";

export interface Score {
    userId: string,
    nickname: string,
    score: number
}

export interface GameScore {
    scores: Score[]
}

export interface BasicGameInfo {
    userId: string,
    gameId: string,
    round: number,
    state: string,
    scores: GameScore,
    isHost: boolean
}

export interface GetGamesResponse {
    games: BasicGameInfo[]
}

export default function GetGames(state?: GameStates): Promise<GetGamesResponse> {
    return Auth.currentSession()
    .then(session => {
        const userId = session.getIdToken().payload["cognito:username"];
        
        const resourcePath = 'GAMES/' + userId + (state ? '/' + state : '');

        return BasicBackendCall.call('GET', resourcePath);
    })
    .then(json => json as GetGamesResponse);
}

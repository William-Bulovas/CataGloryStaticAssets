import BasicBackendCall from './BasicBackEndCall';

export enum GameStates {
    Created = "CREATED",
    Pending = "PENDING",
    Waiting = "WAITING",
    Completed = "COMPLETED"
  };
  
export interface PlayerGameData {
    userId: string,
    score: number,
    nickname: string
};

export interface Player {
    userId: string,
    nickname: string
};

export interface GetGameResponse {
    gameId: string,
    host: Player,
    players: PlayerGameData[],
    score: number
};

export default function GetGame(gameId: string): Promise<GetGameResponse> {
    return BasicBackendCall.call("GET", "GAME/" + gameId)
        .then(json => json as GetGameResponse);
};

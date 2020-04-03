import BasicBackendCall from './BasicBackEndCall';

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
        .then(response => response.json())
        .then(json => {
            console.log(JSON.stringify(json));
            return json;
        })
        .then(json => json as unknown as GetGameResponse);
};

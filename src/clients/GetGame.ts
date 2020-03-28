import BasicBackendCall from './BasicBackEndCall';

export interface Player {
    userId: string,
    score: number
}

export interface GetGameResponse {
    gameId: string,
    hostUserId: string,
    players: Player[],
    score: number
}

export default function GetGame(gameId: string): Promise<GetGameResponse> {
    return BasicBackendCall.call("GET", "GAME/" + gameId)
        .then(response => response.json())
        .then(json => {
            console.log(JSON.stringify(json));
            return json;
        })
        .then(json => json as unknown as GetGameResponse);
}

import BasicBackendCall from './BasicBackEndCall';

export interface GetGameResponse {
    gameId: string,
    host: string,
    players: string[]
}

export default function GetGame(gameId: string): Promise<GetGameResponse> {
    const getGameBody = JSON.stringify({
        gameId: gameId
    });

    return BasicBackendCall.call("GET", "GAME", getGameBody)
        .then(response => response.json())
        .then(json => json as unknown as GetGameResponse);
}

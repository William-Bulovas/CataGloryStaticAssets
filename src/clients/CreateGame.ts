import { Auth } from "aws-amplify";

interface CreateGameRequest {
    userId: string,
    gameId: string,
    roundNum: number
}

export interface CreateGameResponse {

}

export default function CreateGame(gameId: string, roundNum: number): Promise<CreateGameResponse> {
    return Auth.currentSession().then(session => 
         fetch("https://z1riua6sa6.execute-api.us-west-2.amazonaws.com/prod/GAME", {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': "'*'",
              'Content-Type': 'application/json',
              'Authorization': session.getIdToken().getJwtToken()
            },
            body: JSON.stringify({
                userId: session.getIdToken().payload["cognito:username"]
            })
        })).then(response => response as CreateGameResponse);
}

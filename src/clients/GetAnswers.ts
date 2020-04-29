import BasicBackendCall from './BasicBackEndCall';

export interface GetAnswersResponse {
    answers: []
}

export interface UserAnswer {
    questionNumber: number,
    userId: string,
    answer: string
}

export default function GetAnswers(gameId: string, round: number): Promise<GetAnswersResponse> {
    return BasicBackendCall.call("GET", "ANSWERS/" + gameId + "/" + round) 
        .then(response => response.json())
        .then(json => {
            // console.log(JSON.stringify(json));
            return json;
        })
        .then(json => json as unknown as GetAnswersResponse);
};

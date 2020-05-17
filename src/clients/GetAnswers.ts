import BasicBackendCall from './BasicBackEndCall';

export interface GetAnswersResponse {
    answers: UserAnswer[]
}

export interface UserAnswer {
    questionNumber: number,
    userId: string,
    answer: string,
    nickname: string,
    strikes: string[]
}

export default function GetAnswers(gameId: string, round: number): Promise<GetAnswersResponse> {
    return BasicBackendCall.call("GET", "ANSWERS/" + gameId + "/" + round) 
        .then(json => json as GetAnswersResponse);
};

import BasicBackendCall from './BasicBackEndCall';

export interface Category {
    QuestionNumber: number,
    Category: string
};

export interface GetQuestionsResponse {
    gameId: string,
    round: number,
    categories: Category[],
    letter: string
};

export function GetQuestions(gameId: string, round: number): Promise<GetQuestionsResponse> {
    return BasicBackendCall.call("GET", "QUESTIONS/" + gameId + "/" + round)
        .then(response => response.json())
        .then(json => {
            // console.log(JSON.stringify(json));
            return json;
        })
        .then(json => json as unknown as GetQuestionsResponse);
};

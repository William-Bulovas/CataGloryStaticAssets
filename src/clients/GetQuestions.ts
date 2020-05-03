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

export async function GetQuestions(gameId: string, round: number): Promise<GetQuestionsResponse> {
    return BasicBackendCall.call("GET", "QUESTIONS/" + gameId + "/" + round)
        .then(json => json as GetQuestionsResponse);
};

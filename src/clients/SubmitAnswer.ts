import { Auth } from "aws-amplify";
import BasicBackendCall from './BasicBackEndCall';

export async function SubmitAnswer(gameId: string, round: number, answer: string, questionNumber: number): Promise<void> {
    return Auth.currentSession().then(session => 
        BasicBackendCall.call('PUT', 'ANSWER', JSON.stringify({
            userId: session.getIdToken().payload["cognito:username"],
            gameId: gameId,
            round: round,
            answer: answer,
            questionNumber: questionNumber
        }))).then();
}

import { Auth } from "aws-amplify";
import BasicBackendCall from './BasicBackEndCall';
import { GameStates } from "./GetGame";


export default function ReportAnswer(violatedUserId: string, gameId: string, round: number, questionNumber: number): Promise<void> {
    return Auth.currentSession()
    .then(session => {
        const userId = session.getIdToken().payload["cognito:username"];
        
        const resourcePath = 'ANSWERSTRIKE/' + userId + '/' + violatedUserId + '/' + gameId + '/' + round + '/' + questionNumber;

        return BasicBackendCall.call('PUT', resourcePath);
    })
    .then(() => {});
}

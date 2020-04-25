import BasicBackendCall from './BasicBackEndCall';
import GetAnswers from './GetAnswers';

describe('GetAnswers', () => {
    const sampleGameId = "sampleGameId";
    const sampleRound = 1;

    const basicBackendCallSpy = jest.spyOn(BasicBackendCall, 'call');

    beforeEach(() => {
        const mockFetchPromise = Promise.resolve(new Response(JSON.stringify({answers: [{
            questionNumber: 1,
            answer: "horse",
            userId: "fred"
        }]})));
    
        basicBackendCallSpy.mockImplementation((requestType: string, resource: string, requestBody?: string) => mockFetchPromise);
    })

    it('calls basic backend call with the correct params', async () => {
        await GetAnswers(sampleGameId, sampleRound);
       
        expect(basicBackendCallSpy).toHaveBeenCalledWith('GET', 'ANSWERS/' + sampleGameId + "/" + sampleRound);
    });

    it('returns the correct return val', async() => {
        const response = await GetAnswers(sampleGameId, sampleRound);

        expect("answers" in response).toBeTruthy;
        expect(response.answers[0].questionNumber).toBe(1);
        expect(response.answers[0].userId).toBe("fred");
        expect(response.answers[0].answer).toBe("horse");
    });
});
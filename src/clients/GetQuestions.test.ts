import BasicBackendCall from './BasicBackEndCall';
import { GetQuestions, Category } from './GetQuestions';

describe('GetQuestions', () => {
    const sampleGameId = "sampleGameId";
    const sampleRound = 1;
    const sampleLetter = 'a';
    const sampleCategories: Category[] = [
        {
            QuestionNumber: 1,
            Category: 'movie'
        },
        {
            QuestionNumber: 2,
            Category: 'tv show'
        }
    ];

    const basicBackendCallSpy = jest.spyOn(BasicBackendCall, 'call');

    beforeEach(() => {
        const mockFetchPromise = Promise.resolve({
            gameId: sampleGameId,
            round: sampleRound,
            letter: sampleLetter,
            categories: sampleCategories
        });
    
        basicBackendCallSpy.mockImplementation((requestType: string, resource: string, requestBody?: string) => mockFetchPromise);
    })

    it('calls basic backend call with the correct params', async () => {
        await GetQuestions(sampleGameId, sampleRound);
       
        expect(basicBackendCallSpy).toHaveBeenCalledWith('GET', 'QUESTIONS/' + sampleGameId + "/" + sampleRound);
    });

    it('returns the correct return val', async() => {
        const response = await GetQuestions(sampleGameId, sampleRound);

        expect(response.gameId).toBe(sampleGameId);
        expect(response.round).toBe(sampleRound);
        expect(response.letter).toBe(sampleLetter);
        expect(response.categories).toStrictEqual(sampleCategories);
    });
});

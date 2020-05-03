import BasicBackendCall from './BasicBackEndCall';
import GetGame from './GetGame';

describe('GetGame', () => {
    const sampleGameId = "sampleGameId";
    const host = "rbbasin";
    const players = [ "William", "Ronnie", "Nancy" ];
    const basicBackendCallSpy = jest.spyOn(BasicBackendCall, 'call');

    beforeEach(() => {
        const mockFetchPromise = Promise.resolve({
            gameId: sampleGameId,
            host: host,
            players: players
        });
    
        basicBackendCallSpy.mockImplementation((requestType: string, resource: string, requestBody?: string) => mockFetchPromise);
    })

    it('calls basic backend call with the correct params', async () => {
        await GetGame(sampleGameId);
       
        expect(basicBackendCallSpy).toHaveBeenCalledWith('GET', 'GAME/' + sampleGameId);
    });

    it('returns the correct return val', async() => {
        const response = await GetGame("sampleGameId");

        expect(response.gameId).toBe(sampleGameId);
    });
});

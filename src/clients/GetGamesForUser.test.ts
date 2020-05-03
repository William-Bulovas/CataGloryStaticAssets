import BasicBackendCall from './BasicBackEndCall';
import { Auth } from 'aws-amplify';
import { CognitoUserSession, CognitoAccessToken,  CognitoIdToken, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import GetGames, { GetGamesResponse } from './GetGamesForUser';

describe('GetGames', () => {
    const userId = "rbbasin";
    const gameId = "game1";
    const gameId2 = "game2";
    const state = "PENDING";
    const round = 1;

    const currentSessionSpy = jest.spyOn(Auth, 'currentSession');
    const basicBackendCallSpy = jest.spyOn(BasicBackendCall, 'call');

    const expectedResponse: GetGamesResponse = {
        games: [
            {
                userId: userId,
                gameId: gameId,
                state: state,
                round: round,
                scores: {
                    scores: []
                }
            },
            {
                userId: userId,
                gameId: gameId2,
                state: state,
                round: round,
                scores: {
                    scores: []
                }
            }
        ]
    };

    beforeEach(() => {
        setupAuthMock();

        const mockFetchPromise = Promise.resolve(expectedResponse);

        basicBackendCallSpy.mockImplementation((requestType: string, resource: string, requestBody?: string) => mockFetchPromise);
    });

    it('calls basic backend call with the correct params', async () => {
        await GetGames();
       
        expect(basicBackendCallSpy).toHaveBeenCalledWith('GET', 'GAMES/' + userId);
    });

    it('calls basic backend call with the correct params', async () => {
        await GetGames(state);
       
        expect(basicBackendCallSpy).toHaveBeenCalledWith('GET', 'GAMES/' + userId) + "/" + state;
    });

    it('returns the correct return val', async () => {
        const response = await GetGames("sampleGameId");

        expect(response).toStrictEqual(expectedResponse);
    });

    const setupAuthMock = () => {
        const cognitoUserIdToken = new CognitoIdToken({IdToken: 'token'});
        cognitoUserIdToken.payload = {
            "cognito:username": userId
        }
    
        const mockUserSession = new CognitoUserSession({
            IdToken: cognitoUserIdToken,
            AccessToken: new CognitoAccessToken({ AccessToken: "" }),
            RefreshToken: new CognitoRefreshToken({ RefreshToken: "" })
        });
    
        const mockCurrentSessionPromise = Promise.resolve(mockUserSession);
    
        currentSessionSpy.mockImplementation(() => mockCurrentSessionPromise);
    };
});

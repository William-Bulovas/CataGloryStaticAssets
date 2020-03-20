import { Auth } from 'aws-amplify';
import { CognitoUserSession, CognitoAccessToken,  CognitoIdToken, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import BasicBackendCall from './BasicBackEndCall';
import JoinGame from './JoinGame';

describe('CreateGame', () => {
    const sampleGameId = "sampleGameId";

    const currentSessionSpy = jest.spyOn(Auth, 'currentSession');
    const basicBackendCallSpy = jest.spyOn(BasicBackendCall, 'call');

    beforeEach(() => {
        setupAuthMock();

        const mockFetchPromise = Promise.resolve(new Response(JSON.stringify({
            gameId: sampleGameId
        })));
    
        basicBackendCallSpy.mockImplementation((requestType: string, resource: string, requestBody: string) => mockFetchPromise);
    })

    it('calls basic backend call with the correct params', async () => {
        await JoinGame(sampleGameId);
       
        expect(basicBackendCallSpy).toHaveBeenCalledWith('PUT', 'GAME', JSON.stringify({
            userId: 'user',
            gameId: sampleGameId
        }));
    });

    it('returns the correct return val', async() => {
        const response = await JoinGame(sampleGameId);

        expect(response.gameId).toBe(sampleGameId);
    });

    const setupAuthMock = () => {
        const cognitoUserIdToken = new CognitoIdToken({IdToken: 'token'});
        cognitoUserIdToken.payload = {
            "cognito:username": "user"
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

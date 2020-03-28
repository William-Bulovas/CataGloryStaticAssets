import CreateGame from './CreateGame';
import { Auth } from 'aws-amplify';
import { CognitoUserSession, CognitoAccessToken,  CognitoIdToken, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import BasicBackendCall from './BasicBackEndCall';

describe('CreateGame', () => {
    const sampleGameId = "sampleGameId";


    const currentSessionSpy = jest.spyOn(Auth, 'currentSession');
    const basicBackendCallSpy = jest.spyOn(BasicBackendCall, 'call');

    beforeEach(() => {
        setupAuthMock();

        const mockFetchPromise = Promise.resolve(new Response(JSON.stringify({
            gameId: sampleGameId
        })));
    
        basicBackendCallSpy.mockImplementation((requestType: string, resource: string, requestBody?: string) => mockFetchPromise);
    })

    it('calls basic backend call with the correct params', async () => {
        await CreateGame();
       
        expect(basicBackendCallSpy).toHaveBeenCalledWith('POST', 'GAME', JSON.stringify({
            userId: 'user'
        }));
    });

    it('returns the correct return val', async() => {
        const response = await CreateGame();

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

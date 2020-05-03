import CreateGame from './CreateGame';
import { Auth } from 'aws-amplify';
import { CognitoUserSession, CognitoAccessToken,  CognitoIdToken, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import BasicBackendCall from './BasicBackEndCall';

describe('CreateGame', () => {
    const sampleGameId = "sampleGameId";
    const nickname = 'Willy';
    const userId = 'user';
    
    const currentSessionSpy = jest.spyOn(Auth, 'currentSession');
    const basicBackendCallSpy = jest.spyOn(BasicBackendCall, 'call');

    beforeEach(() => {
        setupAuthMock();

        const mockFetchPromise = Promise.resolve({
            gameId: sampleGameId
        });
    
        basicBackendCallSpy.mockImplementation((requestType: string, resource: string, requestBody?: string) => mockFetchPromise);
    })

    it('calls basic backend call with the correct params', async () => {
        await CreateGame(nickname);
       
        expect(basicBackendCallSpy).toHaveBeenCalledWith('POST', 'GAME', JSON.stringify({
            userId: userId,
            nickname: nickname
        }));
    });

    it('returns the correct return val', async() => {
        const response = await CreateGame(nickname);

        expect(response.gameId).toBe(sampleGameId);
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

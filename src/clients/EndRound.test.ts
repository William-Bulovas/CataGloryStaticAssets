import BasicBackendCall from './BasicBackEndCall';
import { Auth } from 'aws-amplify';
import { CognitoUserSession, CognitoAccessToken,  CognitoIdToken, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import EndRound from './EndRound';

describe('GetGames', () => {
    const userId = "rbbasin";
    const gameId = "game1";

    const currentSessionSpy = jest.spyOn(Auth, 'currentSession');
    const basicBackendCallSpy = jest.spyOn(BasicBackendCall, 'call');

    beforeEach(() => {
        setupAuthMock();

        const mockFetchPromise = Promise.resolve();

        basicBackendCallSpy.mockImplementation((requestType: string, resource: string, requestBody?: string) => mockFetchPromise);
    });


    it('calls basic backend call with the correct params', async () => {
        await EndRound(gameId);
       
        expect(basicBackendCallSpy).toHaveBeenCalledWith('POST', 'ROUND/' + userId + "/" + gameId);
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

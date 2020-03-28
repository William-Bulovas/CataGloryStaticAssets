import { Auth } from 'aws-amplify';
import { CognitoUserSession, CognitoAccessToken,  CognitoIdToken, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import BasicBackendCall from './BasicBackEndCall';

describe('BasicBackEndCall', () => {
    const ID_TOKEN = "Token2";

    const sampleResponse = new Response(JSON.stringify({
        gameId: "sampleGameId"
    }));

    const fetchSpy = jest.spyOn(window, 'fetch');
    const currentSessionSpy = jest.spyOn(Auth, 'currentSession');

    beforeEach(() => {
        setupFetchMock();
        setupAuthMock();
    })

    it('calls backend with the correct params', async () => {
        const requestType = 'POST';
        const resourseName = 'GAME';
        const requestBody = 'body';
        const expectedUrl = "https://z1riua6sa6.execute-api.us-west-2.amazonaws.com/prod/GAME";


        const response = await BasicBackendCall.call(requestType, resourseName, requestBody);

        expect(fetchSpy).toHaveBeenCalledWith(expectedUrl, {
            method: requestType,
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': ID_TOKEN
            },
            body: requestBody
        });

        expect(response).toBe(sampleResponse)
    });

    const setupFetchMock = () => {
        const mockFetchPromise = Promise.resolve(sampleResponse);    

        fetchSpy.mockImplementation((url: RequestInfo, options?: RequestInit) => mockFetchPromise);
    };

    const setupAuthMock = () => {
        const cognitoUserIdToken = new CognitoIdToken({IdToken: ID_TOKEN});
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

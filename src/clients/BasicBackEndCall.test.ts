import { Auth } from 'aws-amplify';
import { CognitoUserSession, CognitoAccessToken,  CognitoIdToken, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import BasicBackendCall from './BasicBackEndCall';

describe('BasicBackEndCall', () => {
    const ID_TOKEN = "Token2";
    const SAMPLE_BASE64 = "eyJnYW1lcyI6W119";
    const SAMPLE_RESPONSE_OBJECT = {
        games: []
    };
    const SAMPLE_NON_BASE_64 = JSON.stringify(SAMPLE_RESPONSE_OBJECT);
    const REQUEST_TYPE = 'POST';
    const RESOURCE_NAME = 'GAME';
    const REQUEST_BODY = 'body';

    const fetchSpy = jest.spyOn(window, 'fetch');
    const currentSessionSpy = jest.spyOn(Auth, 'currentSession');

    beforeEach(() => {
        setupAuthMock();
    })

    describe('response is Base64 encoded', () => {
        beforeEach(() => {
            const sampleBase64EncodingResponse = new Response(SAMPLE_BASE64);

            const mockFetchPromise = Promise.resolve(sampleBase64EncodingResponse);    

            fetchSpy.mockImplementation((url: RequestInfo, options?: RequestInit) => mockFetchPromise);    
        });

        it('calls backend with the correct params', async () => {
            const expectedUrl = "https://z1riua6sa6.execute-api.us-west-2.amazonaws.com/prod/GAME";
    
    
            await BasicBackendCall.call(REQUEST_TYPE, RESOURCE_NAME, REQUEST_BODY);
    
            expect(fetchSpy).toHaveBeenCalledWith(expectedUrl, {
                method: REQUEST_TYPE,
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': ID_TOKEN
                },
                body: REQUEST_BODY
            });
            });
        
        it('returns the correct parsed object', async () => {
            const requestType = 'POST';
            const resourseName = 'GAME';
            const requestBody = 'body';

            const response = await BasicBackendCall.call(REQUEST_TYPE, resourseName, requestBody);
            
            expect(response).toStrictEqual(SAMPLE_RESPONSE_OBJECT)
        });
    })

    describe('response is not encoded', () => {
        beforeEach(() => {
            const sampleNonBase64Response = new Response(SAMPLE_NON_BASE_64);

            const mockFetchPromise = Promise.resolve(sampleNonBase64Response);    

            fetchSpy.mockImplementation((url: RequestInfo, options?: RequestInit) => mockFetchPromise);    
        });

        it('calls backend with the correct params', async () => {
            const expectedUrl = "https://z1riua6sa6.execute-api.us-west-2.amazonaws.com/prod/GAME";
    
    
            await BasicBackendCall.call(REQUEST_TYPE, RESOURCE_NAME, REQUEST_BODY);
    
            expect(fetchSpy).toHaveBeenCalledWith(expectedUrl, {
                method: REQUEST_TYPE,
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': ID_TOKEN
                },
                body: REQUEST_BODY
            });
            });
        
        it('returns the correct parsed object', async () => {
            const response = await BasicBackendCall.call(REQUEST_TYPE, RESOURCE_NAME, REQUEST_BODY);
            
            expect(response).toStrictEqual(SAMPLE_RESPONSE_OBJECT)
        });
    })



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

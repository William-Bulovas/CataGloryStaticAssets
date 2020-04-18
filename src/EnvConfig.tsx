export class APIConfig {
    user: string = '';
    constructor(){
        this.user = "Will"
    }
    public getApiEndpoint(): string {
        return APIConfig.getMapOfConfigValues()['apiEndpoint'][this.user];
    }
    public getCloudfrontDomain(): string {
        return APIConfig.getMapOfConfigValues()['cloudFrontDomain'][this.user];
    }
    public getCognitoUserPoolId(): string {
        return APIConfig.getMapOfConfigValues()['cognito']['userPoolId'][this.user];
    }
    public getCognitoClientId(): string {
        return APIConfig.getMapOfConfigValues()['cognito']['clientId'][this.user];
    }
    public getCognitoUserPoolWebClientId(): string {
        return APIConfig.getMapOfConfigValues()['cognito']['userPoolWebClientId'][this.user];
    }
    public getOathDomain(): string {
        return APIConfig.getMapOfConfigValues()['oath']['domain'][this.user];
    }
    static getMapOfConfigValues(): any {
        return {
            'apiEndpoint': {
                'Ronnie': "https://a24as9zvr4.execute-api.us-west-2.amazonaws.com/prod",
                'Will': "https://z1riua6sa6.execute-api.us-west-2.amazonaws.com/prod"
            },
            'cloudFrontDomain': {
                'Ronnie': "d2pynpzc4gpify.cloudfront.net",
                'Will': "d30igcs3iq7430.cloudfront.net"
            },
            'cognito': {
                'userPoolId' : {
                    'Ronnie': 'us-west-2_BA4Nj2Pt2',
                    'Will': 'us-west-2_GbZzqEa8I'
                },
                'clientId': {
                    'Ronnie': '6t2j9kir6ttqt52m49hha5dptf',
                    'Will': '258qmlhuh1a2h2h2a8d5qg82q6'
                },
                'userPoolWebClientId': {
                    'Ronnie': '6t2j9kir6ttqt52m49hha5dptf',
                    'Will': '258qmlhuh1a2h2h2a8d5qg82q6'
                }
            },
            'oath': {
                'domain': {
                    'Ronnie': "cataglory-dev.auth.us-west-2.amazoncognito.com",
                    'Will': "cataglory.auth.us-west-2.amazoncognito.com"
                }
            }
        }
    }
}
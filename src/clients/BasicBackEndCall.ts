import { Auth } from "aws-amplify";

export default class BasicBackendCall {
  public static call(requestType: string, resource: string, requestBody?: string): Promise<Response> {
    return Auth.currentSession().then(session => 
         fetch("https://z1riua6sa6.execute-api.us-west-2.amazonaws.com/prod/" + resource, {
            method: requestType,
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': session.getIdToken().getJwtToken()
            },
            body: requestBody
        }));
  }
}

import { Auth } from "aws-amplify";
import {APIConfig} from './../EnvConfig';

export default class BasicBackendCall {
  public static call(requestType: string, resource: string, requestBody?: string): Promise<Response> {
    const apiConfig: APIConfig = new APIConfig();
    return Auth.currentSession().then(session => 
         fetch(apiConfig.getApiEndpoint() + "/" + resource, {
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

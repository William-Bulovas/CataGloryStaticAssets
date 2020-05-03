import { Auth } from "aws-amplify";
import {APIConfig} from './../EnvConfig';

export default class BasicBackendCall {
  public static call(requestType: string, resource: string, requestBody?: string): Promise<any> {
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
        }))
        .then(response => response.text())
        .then(text => {
          try {
            return atob(text);
          } catch (e) {
            return text;
          }
        })
        .then(text => JSON.parse(text));
  }
}

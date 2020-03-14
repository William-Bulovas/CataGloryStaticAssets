import React, { useEffect, useState } from 'react';
import './App.css';
import { Hub, Auth, API } from 'aws-amplify';
import NavBar from './components/NavBar';
import { Switch, Route } from 'react-router-dom';
import FacebookPolicyPage from './components/FacebookPolicyPage';
import CreateGame from './clients/CreateGame';
import { CreateGameResponse } from './clients/CreateGame';

function App() {
  const [logInStatus, setLogInStatus] = useState(false);

  useEffect(() => {
    Hub.listen('auth', ({ payload: {event, data}}) => {
      switch (event) {
        case "signIn":
          setLogInStatus(true);
          break;
        case "signOut":
          setLogInStatus(false);
      }
    }); 

    Auth.currentSession().then(
      () => {
        setLogInStatus(true);
      }
    ).catch(
      (err) => { 
        console.log("coudl not fetch creds");
        console.log(err)
        }
    );  
  });

  const theThing = () => {
    CreateGame("game123", 1);
  };

  return (
    <div className="App">
      <NavBar loginState={logInStatus} />
      <Switch>
        <Route path="/privacy" >
          <FacebookPolicyPage loginState={logInStatus} />
        </Route>
        <Route path="/">
          <button onClick={theThing} >Do the thing</button>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

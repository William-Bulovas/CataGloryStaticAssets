import React, { useEffect, useState } from 'react';
import './App.css';
import { Hub, Auth } from 'aws-amplify';
import { Switch, Route } from 'react-router-dom';
import FacebookPolicyPage from './components/FacebookPolicyPage';
import NavBar from './components/nav/NavBar';
import JoinGameComponent from './components/joinGame/JoinGameComponent';

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

    Auth.currentSession()
      .then(() => setLogInStatus(true))
      .catch(() => setLogInStatus(false));  
  });

  return (
    <div className="App">
      <NavBar loginState={logInStatus} />
      <Switch>
        <Route path="/privacy" >
          <FacebookPolicyPage loginState={logInStatus} />
        </Route>
        <Route path="/join">
          <JoinGameComponent/>
        </Route>
        <Route path="/">
          <div/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

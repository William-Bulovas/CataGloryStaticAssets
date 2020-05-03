import React, { useEffect, useState } from 'react';
import './App.css';
import { Hub, Auth } from 'aws-amplify';
import { Switch, Route, useParams, useHistory } from 'react-router-dom';
import FacebookPolicyPage from './components/FacebookPolicyPage';
import NavBar from './components/nav/NavBar';
import JoinGameComponent from './components/joinGame/JoinGameComponent';
import PlayGamePage from './components/playGame/PlayGamePage';
import WelcomePage from './components/homepage/WelcomePage';
import GamesOverviewForUser from './components/homepage/GamesOverviewForUser';


function App() {
  const [logInStatus, setLogInStatus] = useState(false);
  const [isLoading, setLoading] = useState(false)

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
    <div className="App mb-5">
      <NavBar loginState={logInStatus} />
      <Switch>
        <Route path="/privacy" >
          <FacebookPolicyPage loginState={logInStatus} />
        </Route>
        <Route path="/join">
          <JoinGameComponent/>
        </Route>
        <Route path="/play/:gameId/:round">
          <PlayGameWrapper/>
        </Route>
        <Route path="/">
          { HomePageWrapper(logInStatus) }
        </Route>
      </Switch>
    </div>
  );
};

const PlayGameWrapper = () => {
  const history = useHistory();

  const {gameId, round} = useParams();

  if (gameId == null || round == null) {
    history.push('/');
    return (<div/>);
  }

  return <PlayGamePage gameId={gameId} round={round as unknown as number}/>
};

const HomePageWrapper = (userLoggedIn: boolean) => {
  if (userLoggedIn) return <GamesOverviewForUser/>

  return <WelcomePage/>
}

export default App;

import React, { useEffect, useState } from 'react';
import { Hub, Auth } from 'aws-amplify';
import { Switch, Route } from 'react-router-dom';
import FacebookPolicyPage from '../FacebookPolicyPage';
import NavBar from '../nav/NavBar';
import GetGamesForUser from '../../clients/GetGamesForUser';
import { GetGamesResponse, BasicGameInfo } from '../../clients/GetGamesForUser';

import GameInfoForUser from './GameInfoForUser';
import Loading from '../Loading';
import { GameStates } from '../../clients/GetGame';
import CreatedGameInfo from './CreatedGameInfo';

export default function () {
    const [createdGames, setCreatedGames] = useState<GetGamesResponse>()
    const [pendingGames, setPendingGames] = useState<GetGamesResponse>()
    const [waitingGames, setWaitingGames] = useState<GetGamesResponse>()

    const getCreatedGames = () => {
        GetGamesForUser(GameStates.Created)
           .then(response => setCreatedGames(response))
           .catch(err => {
               console.log("Could not retreive games for user " + err)
               console.log(err.stack)
           })
   };

    const getPendingGames = () => {
         GetGamesForUser(GameStates.Pending)
            .then(response => setPendingGames(response))
            .catch(err => {
                console.log("Could not retreive games for user " + err)
                console.log(err.stack)
            })
    };
    const getWaitingGames = () => {
        GetGamesForUser(GameStates.Waiting)
           .then(response => setWaitingGames(response))
           .catch(err => console.log("Could not retreive games for user " + err))
    };
    
    useEffect(() => {
        Auth.currentSession()
            .catch(err => console.log("Could not get game " + err));
        
        if (!createdGames) getCreatedGames();
        if (!pendingGames) getPendingGames();
        if (!waitingGames) getWaitingGames();
    });

    if (!pendingGames || !waitingGames || !createdGames) return <Loading/>;

    if (pendingGames.games.length == 0 && waitingGames.games.length == 0 && createdGames.games.length == 0) {
        return (
            <div>
                <h3>No current active games!</h3>
            </div>
        );
    }

    return (
        <div className="container">
            { createdGames.games.map(game => <CreatedGameInfo game={game} refresh={() => { 
                getCreatedGames();
                getPendingGames();
            }}/>) }
            { pendingGames.games.map(game => <GameInfoForUser game={game}/>) }
            { waitingGames.games.map(game => <GameInfoForUser game={game}/>) }
        </div>    
    );
};

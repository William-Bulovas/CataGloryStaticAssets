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

export default function () {
    const [pendingGames, setPendingGames] = useState<GetGamesResponse>()
    const [waitingGames, setWaitingGames] = useState<GetGamesResponse>()

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
        
        if (!pendingGames) getPendingGames();
        if (!waitingGames) getWaitingGames();
    });

    if (!pendingGames || !waitingGames) return <Loading/>;

    if (pendingGames.games.length == 0 && waitingGames.games.length == 0) {
        return (
            <div>
                <h3>No current active games!</h3>
            </div>
        );
    }

    return (
        <div className="container">
            { pendingGames.games.map(game => <GameInfoForUser game={game}/>) }
            { waitingGames.games.map(game => <GameInfoForUser game={game}/>) }
        </div>    
    );
};

import React, { useEffect, useState } from 'react';
import { Hub, Auth } from 'aws-amplify';
import { Switch, Route } from 'react-router-dom';
import FacebookPolicyPage from '../FacebookPolicyPage';
import NavBar from '../nav/NavBar';
import GetGamesForUser from '../../clients/GetGamesForUser';
import { GetGamesResponse, BasicGameInfo } from '../../clients/GetGamesForUser';

import GameInfoForUser from './GameInfoForUser';

export default function () {
    const [loading, setLoading] = useState(true);
    const [gamesRetrievedForUser, setGamesRetrieved] = useState(false)
    const [allGamesForUser, setAllGamesForUser] = useState<GetGamesResponse>()

    const getGamesForUser = () => {
        Promise.resolve(setLoading(true))
            .then(() => GetGamesForUser())
            .then(response => setAllGamesForUser(response))
            .then(() => setLoading(false))
            .catch(err => console.log("Could not retreive games for user" + err))
      }
    
    const games = () => {
        let game_list: any = []
        if (allGamesForUser) {
            allGamesForUser.games.forEach(game => {
                game_list.push(<GameInfoForUser gameId={game.gameId}/>);
            });
        }
        return game_list;
    }

    useEffect(() => {
        Auth.currentSession()
            .catch(err => console.log("Could not get game " + err));
        
        if (!allGamesForUser) getGamesForUser();
    });

    return (
        <div className=".container-lg">
            <div className="row">
                <div className="col order-1 align-self-center">
                    { games() }
                </div>
            </div>
        </div>    
    );
};

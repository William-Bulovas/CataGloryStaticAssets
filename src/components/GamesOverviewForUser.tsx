import React, { useEffect, useState } from 'react';
import { Hub, Auth } from 'aws-amplify';
import { Switch, Route } from 'react-router-dom';
import FacebookPolicyPage from './../components/FacebookPolicyPage';
import NavBar from './../components/nav/NavBar';
import GetGamesForUser from './../clients/GetGamesForUser';
import { GetGamesResponse, BasicGameInfo } from './../clients/GetGamesForUser';

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
                console.log('Jumping through here now with game id' + game.gameId);
                game_list.push(<GameInfoForUser gameId={game.gameId}/>);
            });
        }
        return game_list;
    }

    useEffect(() => {
        Auth.currentSession()
            .catch(err => console.log("Could not get game " + err))
            // .then(() => setLoading(false));
        
        if (!allGamesForUser) getGamesForUser();
    });

    // if (loading) {
    //     return (<Loading/>);
    // };

    return (
        <div className=".container-lg">
            <h2 className="mb-5"> Welcome Home! </h2>
            <div className="row">
                <div className="col order-1 align-self-center">
                    { games() }
                </div>
            </div>
        </div>    
    );
};

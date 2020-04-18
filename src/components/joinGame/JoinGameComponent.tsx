import React, { useEffect, useState } from 'react';
import GetGame, { GetGameResponse } from '../../clients/GetGame';
import JoinGame from '../../clients/JoinGame';
import Loading from '../Loading';
import { Auth } from 'aws-amplify';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import NicknameForm from '../NicknameForm';
import { Modal } from 'react-bootstrap';

export default function () {
    const [gameData, setGameData] = useState<GetGameResponse>();
    const [loading, setLoading] = useState(true);
    const [gameJoined, setGameJoined] = useState(false);
    const [userId, setUserId] = useState("");
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (gameData) return;
        Auth.currentSession()
            .then(session => setUserId(session.getIdToken().payload["cognito:username"]))
            .catch(() => history.push("/"))
            .then(() => getGameFromURL())
            .then(gameId => GetGame(gameId))
            .then(response => setGameData(response))
            .catch(err => console.log("Could not get game " + err))
            .then(() => setLoading(false));
    });

    const getGameFromURL = () => {
        console.log(location.search);
        const s = new URLSearchParams(location.search).get('gameId');

        if (s == null) {
            history.push('/');
        }
        return s!;
    }

    const joinGame = (nickname: string) => {
        Promise.resolve(setLoading(true))
            .then(() => JoinGame(getGameFromURL(), nickname))
            .then(() => setGameJoined(true))
            .then(() => setLoading(false))
            .catch(err => console.log("Could not join game"))
    }

    if (loading) {
        return (<Loading/>);
    };

    // If user is the host, redirect to the homepage since they shouldn't be able to join
    if (gameData?.host.userId == userId){
        return (
            <Redirect to="/" />
      ) 
    }

    const hide = () => {
        history.push("/");
    }

    return (
        <div className="container">
            <h3>{ "Do you want to join " + gameData?.host.nickname + "'s  Game?" }</h3>

            <h5 className="pt-4">Current Players:</h5> 
            <ul className="lsit-group pt-4">
                { gameData?.players.map((player) => 
                    <li className="list-group-item" key={player.nickname}>
                        {player.nickname}
                    </li>
                )}
            </ul>

            <div className="my-3">
                <NicknameForm createGameFunction={joinGame} buttonText="Join!"/>
            </div>

            <Modal show={gameJoined} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Game Successfully Joined!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You have successfully joined the Game! Wait until the host starts the game!
                </Modal.Body>
            </Modal>
        </div>    
    );
}
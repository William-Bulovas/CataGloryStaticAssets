import React, { useEffect, useState } from 'react';
import GetGame from '../clients/GetGame';
import {GetGameResponse} from '../clients/GetGame';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Loading from './Loading';

interface Props {
    gameId: string
}

export default (props: Props) => {
    const [ gameData, setGameData ] = useState<GetGameResponse>();

    useEffect(() => {
        if (gameData != null) return;
        
        console.log('This is waht props looks like' + JSON.stringify(props));
        GetGame(props.gameId)
            .then(response => {
                console.log(JSON.stringify(response));
                setGameData(response)
            })
            .catch(err => console.log("Could not get game " + err));
    });

    const playerRows = () => {
        let player_list: any = []
        if (gameData) {
            gameData.players.forEach(player => {
                player_list.push(<tr>
                    <td>{player.nickname}</td>
                    <td>{player.score}</td>
                </tr>)
            })
        }
        return player_list;
    }

    const linkToPlayGame = "/play/" + gameData?.gameId + "/1";

    return (
        <div className="container border border-light rounded mb-5">
            <div className="row">
                <div className="col-4">
                { !gameData ? <Loading /> : null }
                    GameId: {gameData?.gameId}
                </div>
                <div className="col-4">
                    Host: {gameData?.host.nickname}
                </div>
                <div className="col-4">
                    <Link className="nav-link" to={linkToPlayGame}>
                    <Button className="btn btn-primary">
                        <span>Play Game</span>
                    </Button>
                    </Link>
                </div>
            </div>
            <div className="row w-75">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nickname</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerRows()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
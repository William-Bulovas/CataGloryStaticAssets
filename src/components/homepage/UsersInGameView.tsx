import * as React from 'react';
import { BasicGameInfo } from '../../clients/GetGamesForUser';
import { ScoreView } from './ScoreView';
import GetGame, { GetGameResponse } from '../../clients/GetGame';
import Loading from '../Loading';

export interface Props {
    game: BasicGameInfo
}

export const UsersInGameView = (props: Props) => {
    const [ gameInfo, setGameInfo ] = React.useState<GetGameResponse>();

    React.useEffect(() => {
        if (gameInfo) return;

        GetGame(props.game.gameId)
            .then(gameResponse => setGameInfo(gameResponse));
    });

    if(!gameInfo) return <Loading/>

    return (
        <div className="row w-50">
            <table className="table">
                <thead>
                    <tr>
                        <th>Players in Game</th>
                    </tr>
                </thead>
                <tbody>
                    {gameInfo.players.map(player => <tr>
                        <td>{player.nickname}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}


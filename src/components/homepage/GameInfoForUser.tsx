import React, { useEffect, useState } from 'react';
import { GameStates } from './../../clients/GetGame';
import { Link } from 'react-router-dom';
import { BasicGameInfo } from '../../clients/GetGamesForUser';
import { ScoreView } from './ScoreView';
import { UsersInGameView } from './UsersInGameView';
import ViewRoundButton from './ViewRound/ViewRoundButton';

interface Props {
    game: BasicGameInfo
}

export default (props: Props) => {
    const linkToPlayGame = '/play/' + props.game.gameId + '/' + props.game.round;

    const ActionButton = () => {
        if (props.game.state === GameStates.Waiting) {
            return (
                <div>Waiting for other players!</div>
            )
        }

        return ( 
            <Link className="btn btn-primary" to={linkToPlayGame}>
                <span>Play Game</span>
            </Link>
        );
    }

    return (
        <div className="container border border-light rounded mb-5 pt-3">
            <div className="row">
                <div className="col-4">
                    GameId: {props.game.gameId}
                </div>
                <div className="col-4">
                    Round: { props.game.round }
                </div>
                <div className="col-4">
                    <div className="row">
                        <ActionButton/>
                    </div>
                    <div className="row pt-3">
                        <ViewRoundButton gameId={props.game.gameId} round={props.game.round - 1} score={props.game.scores} />
                    </div>
                </div>
            </div>

            {
                props.game.scores.scores.length === 0 ?
                    <UsersInGameView game={props.game}/> :
                    <ScoreView score={props.game.scores}/>
            }
        </div>
    );
}
import React, { useEffect, useState } from 'react';
import { GameStates } from './../../clients/GetGame';
import { Link } from 'react-router-dom';
import { BasicGameInfo } from '../../clients/GetGamesForUser';
import { ScoreView } from './ScoreView';
import { UsersInGameView } from './UsersInGameView';
import ViewRoundButton from './ViewRound/ViewRoundButton';
import StartGame from '../../clients/StartGame';
import PutCustomCategory from '../../clients/PutCustomCategory';

interface Props {
    game: BasicGameInfo,
    refresh: () => void
}

export default (props: Props) => {
    const [ loadingCategory, setLoadingCategory ] = useState(false);
    const [ loadingStartGame, setLoadingStartGame ] = useState(false);
    const [ customCategory, setCustomCategoy ] = useState("");

    const startGame = async () => {
        setLoadingStartGame(true);
        await StartGame(props.game.gameId);
        setLoadingStartGame(false);
        props.refresh();
    };

    const ActionButton = () => {
        if (props.game.isHost) {
            return (
                <button className="btn btn-primary" onClick={startGame}>
                    Start!
                    <span className={"ml-2 spinner-border spinner-border-sm" + ( loadingStartGame ? " " : " invisible" )} role="status"/>
                </button>
            )
        }

        return ( 
            <div>Waiting for the host to start the game</div>
        );
    }

    const putCustomCategory = () => {
        setLoadingCategory(true);

        PutCustomCategory(props.game.gameId, customCategory)
            .then(() => {
                setLoadingCategory(false)
                setCustomCategoy("")
            });
    }

    return (
        <div className="container border border-light rounded mb-5 pt-3">
            <div className="row mb-5">
                <div className="col-4">
                    GameId: {props.game.gameId}
                </div>
                <div className="col-4">
                    
                </div>
                <div className="col-4">
                    <div className="row">
                        <ActionButton/>
                    </div>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-8">
                    <div className="row pl-2 pr-5">
                        <input type="custom" className="form-control" 
                            id="custom" aria-describedby="customCategory" 
                            placeholder="Enter a custom category"
                            disabled={loadingCategory}
                            value={customCategory} onChange={event => setCustomCategoy(event.target.value)}
                        />
                    </div>
                    </div>
                <div className="col-4">
                    <div className="row">
                        <button onClick={() => putCustomCategory()} className="btn btn-primary"
                            disabled={loadingCategory}>
                            Add category!
                            <span className={"ml-2 spinner-border spinner-border-sm" + (loadingCategory ? " " : " invisible")} role="status"/>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <UsersInGameView game={props.game}/>
                </div>
            </div>
        </div>
    );
}
import React, { useState } from 'react';
import CreateGame from '../../clients/CreateGame';
import { Modal } from 'react-bootstrap';
import Loading from '../Loading';
import CreateGameSuccessDialog from './CreateGameComponents/CreateGameSuccessDialog';
import NicknameForm from '../NicknameForm';
import { APIConfig } from '../../EnvConfig';

interface Props {
    refresh: () => void
}

export default function CreateGameButton(props: Props) {
    const [showDialog, setShowDialog] = useState(false);
    const [createdGameId, setGameId] = useState("");
    const [loading, setLoading] = useState(false);
    const [gameCreated, setGameCreated] = useState(false);

    const createGame = (nickName: string) => {
        console.log(nickName);

        Promise.resolve(setLoading(true))
            .then(() => CreateGame(nickName))
            .then(response => setGameId(response.gameId))
            .then(() => setGameCreated(true))
            .then(() => setShowDialog(true))
            .then(() => setLoading(false))
            .then(() => props.refresh())
            .catch(err => console.log("Could not create the game :" + err));
    }

    const createLink = () =>{
        const apiConfig = new APIConfig();
        return "https://" + apiConfig.getCloudfrontDomain() + "/join?gameId=" + createdGameId;
    };

    const dialogTitle = gameCreated ? "Game Successfully Created!"
        : "Create a new game!";

    const hide = () => {
        setShowDialog(false);
        setGameCreated(false);
    }

    return (
        <div>
            <button className="btn btn-secondary" onClick={() => setShowDialog(true)}>
                Create Game!
            </button>

            <Modal show={showDialog} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>{dialogTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { gameCreated ? 
                        <CreateGameSuccessDialog createdGameId={createdGameId} joinGameLink={createLink()}/> : 
                    loading ?
                        <Loading/> :

                        <NicknameForm createGameFunction={createGame} buttonText="Create!"/>    
                    }
                </Modal.Body>
            </Modal>
        </div>
    )
}
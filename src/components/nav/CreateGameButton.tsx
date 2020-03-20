import React, { useState } from 'react';
import CreateGame from '../../clients/CreateGame';
import { Modal } from 'react-bootstrap';
import LoadingButton from '../LoadingButton';

export default function CreateGameButton() {
    const [showDialog, setShowDialog] = useState(false);
    const [createdGameId, setGameId] = useState("");
    const [loading, setLoading] = useState(false);

    const createGame = () => {
        Promise.resolve(() => setLoading(true))
            .then(() => CreateGame())
            .then(response => {
                console.log(JSON.stringify(response));
                return response;
            })
            .then(response => setGameId(response.gameId))
            .then(() => setShowDialog(true))
            .then(() => setLoading(false))
            .catch(err => console.log("Could not create the game"));
    }

    const createLink = () =>{
        return "https://d30igcs3iq7430.cloudfront.net/join?gameId=" + createdGameId;
    };

    return (
        <div>
            { loading ? 
                <LoadingButton/>
                :
                <button className="btn btn-secondary" onClick={createGame}>
                    Create Game!
                </button>
            }

            <Modal show={showDialog} onHide={() => setShowDialog(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Game Successfully Created!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You have successfully created a game! Share this link to get others to join!

                    <div className="input-group mb-3">
                        <div className="form-control">
                            {createdGameId}
                        </div>
                        <div className="input-group-append">
                            <button className="btn btn-light" type="button" 
                            onClick={() => navigator.clipboard.writeText(createLink())}>
                                Copy
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
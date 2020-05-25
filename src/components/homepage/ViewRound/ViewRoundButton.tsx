import React, { useEffect, useState, FormEvent } from 'react';
import { GameScore } from '../../../clients/GetGamesForUser';
import { Modal, Table } from 'react-bootstrap';
import ViewRoundResults from './ViewRoundResults';

interface Props {
    gameId: string,
    round: number,
    score: GameScore
}

export default (props: Props) => {
    const[showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    if (props.round === 0) {
        return (<div/>);
    }

    return (<div>
        <button className="btn btn-primary" onClick={() => handleShow()}>
            View Round {props.round} Results
        </button>
        <Modal size="xl" aria-labelledby="example-modal-sizes-title-xl" show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-xl">Results for Round: {props.round} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ViewRoundResults gameId={props.gameId} round={props.round} score={props.score}/>
            </Modal.Body>
        </Modal>
    </div>);
}

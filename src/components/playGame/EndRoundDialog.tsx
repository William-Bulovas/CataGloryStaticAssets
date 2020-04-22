import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import EndRound from '../../clients/EndRound';
import Loading from '../Loading';

interface Props {
    onCancel: () => void,
    show: boolean,
    gameId: string
};

export default (props: Props) => {
    const history = useHistory();
    const [ roundFinished, setRoundFinished ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const endRound = () => {
        Promise.resolve(() => setLoading(true))
            .then(() => EndRound(props.gameId))
            .then(() => setRoundFinished(true));
    };

    const onHide = () => {
        if (roundFinished) {
            history.push('/');
        } else {
            props.onCancel();
        }
    }

    let body = <div>
        <div className="row">
            Do you want to submit this round? After you submit than you will not be able to change any answers!
        </div>

        <button className="btn btn-primary mt-3" onClick={endRound}>Confirm</button>
    </div>;

    if (roundFinished) {
        body = <div>
            <div className="row">
                You successfully submitted the round! Go back to the home screen to wait for your opponents to continue!
            </div>

            <button className="btn btn-primary mt-3" onClick={onHide}>Go home</button>
        </div>;
    } else if (loading) {
        body = <Loading/>
    }

    return (
        <Modal show={props.show} onHide={onHide}>
            <Modal.Header>
                <Modal.Title>End Round?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    {body}
                </div>
            </Modal.Body>
        </Modal>
    );
};

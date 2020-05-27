import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

interface Props {
    onClose: () => void
}

export default (props: Props) => {
    const [timer, setTimeLeft] = useState(60);
    const [showEndRoundDialog, setShowEndRoundDialog] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer === 0) {
                props.onClose();
                setShowEndRoundDialog(true);
                return;
            }

            setTimeLeft(timer - 1);
        }, 1000);

        return () => clearInterval(interval);
    });

    const hide = () => {
        history.push('/');
    }

    return (
        <>
            <div className="card px-5">
                <div className="card-body">
                    Time left: {timer}
                </div>
            </div>

            <Modal show={showEndRoundDialog} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Times done!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You ran out of time! Any answers submitted with have been recorded!
                </Modal.Body>
            </Modal>
        </>
    )
}
import React, { useEffect, useState, FormEvent } from 'react';
import {GetAnswersResponse} from './../../clients/GetAnswers';
import GetAnswers from '../../clients/GetAnswers';
import { Modal } from 'react-bootstrap';

interface Props {
    gameId: string,
    round: number
}

export default (props: Props) => {
    const[answerData, setAnswerData] = useState<GetAnswersResponse>();
    const[showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (answerData != null) return;

        GetAnswers(props.gameId, props.round)
            .then(response =>{
                console.log(JSON.stringify(response));
                setAnswerData(response);
            })
            .then(response => {handleShow()})
            .catch(err => console.log("Could not get Answers " + err));
    });

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const formatAnswersAsTable = () => {
        if (answerData == null) return;

        let groupedResultsByQuestion: {[k: string]: [{}]} = {};

        answerData!.answers.forEach(resp => {
            let questionNumber = resp['questionNumber'];
            if (!(questionNumber in groupedResultsByQuestion)) {
                groupedResultsByQuestion[questionNumber].push(
                    {
                        userId: resp['userId'],
                        answer: resp['answer']
                    }
                );
            }
        })
    }

    return (
        <div className="container-lg">
            <Modal show={showModal} onHide={handleClose}>
               <Modal.Header closeButton>
                    <Modal.Title>View Round Results :)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </div>
    );
}
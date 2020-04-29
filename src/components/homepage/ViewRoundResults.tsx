import React, { useEffect, useState, FormEvent } from 'react';
import {GetAnswersResponse} from './../../clients/GetAnswers';
import GetAnswers from '../../clients/GetAnswers';
import { GetQuestions, GetQuestionsResponse } from '../../clients/GetQuestions';
import { Modal, Table } from 'react-bootstrap';

interface Props {
    gameId: string,
    round: number
}

export default (props: Props) => {
    const[questionData, setQuestionData] = useState<GetQuestionsResponse>();
    const[answerData, setAnswerData] = useState<GetAnswersResponse>();
    const[showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (answerData != null) return;

        GetAnswers(props.gameId, props.round)
            .then(response =>{
                // console.log(JSON.stringify(response));
                setAnswerData(response);
            })
            .catch(err => console.log("Could not get Answers " + err));
        
        if (questionData != null) return;

        GetQuestions(props.gameId, props.round)
            .then(response =>{
                // console.log(JSON.stringify(response));
                setQuestionData(response);
            })
            .catch(err => console.log("Could not get Questions " + err));
    });

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const getTableBody = () => {
        let userList: [] = []
        if (questionData == null || answerData == null) return;

        let groupedResultsByUser: {[k: string]: any} = {};

        // create mapping of {user... -> {questionNum : answer}... 
        let questionNumVar: number;
        answerData!.answers.forEach(resp => {
            let userId = resp['userId'];
            if (!(userId in groupedResultsByUser)) {
                groupedResultsByUser[userId] = {}
                userList.push(userId);
                questionNumVar = resp['questionNumber'];
                groupedResultsByUser[userId][questionNumVar] = resp['answer'];
            }
            else {
                questionNumVar = resp['questionNumber'];
                groupedResultsByUser[userId][questionNumVar] = resp['answer'];
            }
        });
        
        // For each user, get answers for every question...
        let userRowsInTable: any = []
        userList.forEach(user => {
            let userAnswerCells: any = []
            userAnswerCells.push(<th scope="row">{user}</th>)
            let userMap : any = groupedResultsByUser[user]
            questionData.categories.forEach(category => {
                let answer = "";
                if (category.QuestionNumber in userMap){
                    answer = userMap[category.QuestionNumber];
                }

                // This will help in answer contention workflow later...
                let cellKey: string = user + '/' + props.gameId + '/' + category.QuestionNumber;
                userAnswerCells.push(<td key={cellKey}>{answer}</td>);
            })
            userRowsInTable.push(
                <tr>
                    { userAnswerCells }
                </tr>
            )
        })

        return (
            <tbody>
                { userRowsInTable }
            </tbody>
        )
    }

    const getUserRowForTable = () => {
        if (questionData == null || answerData == null) return;

        questionData.categories.forEach(category => {
            
        })
    }

    const getTableHeaders = () => {
        if (questionData == null) return;
        
        let headerList: any = []
        headerList.push(<th>Users</th>)
        questionData.categories.forEach(category => {
            headerList.push(<th>{category.Category}</th>)
        });

        return headerList;
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={() => handleShow()}>
                View Round Results
            </button>
            <Modal size="xl" aria-labelledby="example-modal-sizes-title-xl" show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-xl">Results for Round: {props.round} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                { getTableHeaders() }
                            </tr>
                        </thead>
                            { getTableBody() }
                    </Table>
                </Modal.Body>
            </Modal>
        </div>
    );
}
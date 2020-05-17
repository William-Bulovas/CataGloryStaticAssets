import React, { useEffect, useState, FormEvent } from 'react';
import {GetAnswersResponse, UserAnswer} from '../../../clients/GetAnswers';
import GetAnswers from '../../../clients/GetAnswers';
import ReportAnswers from '../../../clients/ReportAnswer';
import { GetQuestions, GetQuestionsResponse } from '../../../clients/GetQuestions';
import { Modal, Table } from 'react-bootstrap';
import { GameScore } from '../../../clients/GetGamesForUser';
import Loading from '../../Loading';
import { Auth } from 'aws-amplify';
import ReportButton from './ReportButton';

interface Props {
    gameId: string,
    round: number,
    score: GameScore
}

interface UserNicknameTuple {
    userId: string,
    nickname: string
}

export default (props: Props) => {
    const [questionData, setQuestionData] = useState<GetQuestionsResponse>();
    const [answerData, setAnswerData] = useState<GetAnswersResponse>();
    const [user, setUser] = useState<string>();

    if (props.round === 0) {
        return null;
    }

    const getAnswers = () => {
        GetAnswers(props.gameId, props.round)
            .then(response =>{
                setAnswerData(response);
            })
            .catch(err => console.log("Could not get Answers " + err));
    }

    useEffect(() => {
        if (answerData) return;

        getAnswers();

        if (questionData) return;

        GetQuestions(props.gameId, props.round)
            .then(response =>{
                setQuestionData(response);
            })
            .catch(err => console.log("Could not get Questions " + err));

        Auth.currentSession().then(session => setUser(session.getIdToken().payload["cognito:username"]));
    });


    if (!questionData || !answerData || !user) {
        return <Loading/>
    };

    const getAnswer = (userAnswer: UserAnswer) => {
        if (userAnswer.strikes.length > 0) {
            return <p>
                <del>{userAnswer.answer}</del>
            </p>
        }

        return <p>
            {userAnswer.answer}
        </p>
    }

    const getReportButton = (userAnswer: UserAnswer) => {
        if (userAnswer.userId === user || userAnswer.strikes.length > 0
            || userAnswer.strikes.includes(user)) {
                return <div/>;
        }

        return (
            <ReportButton gameId={props.gameId} round={props.round} answer={userAnswer} refresh={getAnswers}/>
        );
    }

    const getTableBody = () => 
        (<tbody>
            { props.score.scores.map(score => (
                <tr>
                    <th scope="row" className="col-1">{score.nickname}</th>
                    { answerData.answers
                        .filter(answer => answer.userId === score.userId)
                        .sort((a, b) => a.questionNumber - b.questionNumber)
                        .map(answer => 
                            <td key={score.userId + '/' + props.gameId + '/' + answer.questionNumber} className="col-1">
                                <div className="row">
                                    <div className="col-8">
                                        {getAnswer(answer)}
                                    </div>
                                    <div className="col-4">
                                        {getReportButton(answer)}
                                    </div>
                                </div>
                            </td>)}
                </tr>
            ))}
        </tbody>);

    const getTableHeaders = () => {        
        let headerList: any = []
        headerList.push(<th className="col-1">Users</th>)
        questionData.categories.forEach(category => {
            headerList.push(<th className="col-1">{category.Category}</th>)
        });

        return headerList;
    }

    return (
        <Table bordered hover>
            <thead>
                <tr>
                    { getTableHeaders() }
                </tr>
            </thead>
            { getTableBody() }
        </Table>
    );
}
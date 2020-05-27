import React, { useEffect, useState, FormEvent } from 'react';
import { GetQuestions, GetQuestionsResponse } from '../../clients/GetQuestions';
import { SubmitAnswer } from '../../clients/SubmitAnswer';
import Loading from '../Loading';
import CheckIcon from '@material-ui/icons/Check';
import SubmissionPage from './SubmissionPage';
import EndRoundDialog from './EndRoundDialog';
import NavBar from '../nav/NavBar';
import PlayGameTimer from './PlayGameTimer';
import EndRound from '../../clients/EndRound';

interface Props {
    gameId: string,
    round: number
}

export default (props: Props) => {
    const [ questions, setQuestions ] = useState<GetQuestionsResponse>();
    const [ currentQuestion, setCurrent ] = useState(0);
    const [ loadingSet, setLoadingSet ] = useState([] as number[]);
    const [ doneSet, setDoneSet ] = useState([] as number[]);
    const [ showEndRoundDialog, setShowEndRoundDialog ] = useState(false);

    useEffect(() => {
        if (questions != null) return;

        GetQuestions(props.gameId, props.round)
            .then(response => {
                console.log(JSON.stringify(response));
                setQuestions(response)
            })
            .catch(err => console.log("Could not get questions " + err));
    });

    if (questions == null) {
        return <Loading/>;
    }

    const questionClassForNumber = (questionNumber: number) => {
        if (questionNumber == currentQuestion) {
            return "list-group-item active text-left";
        }
        return "list-group-item text-left";
    };

    const clickQuestion = (questionNumber: number) => {
        setCurrent(questionNumber);
    };

    const submitAnswer = (answer: string) => {
        const questionSubmitting = currentQuestion;

        setLoadingSet(loadingSet.concat(questionSubmitting));
        if (questionSubmitting < questions.categories.length - 1) {
            setCurrent(currentQuestion + 1);
        } else {
            setShowEndRoundDialog(true);
        }
        SubmitAnswer(props.gameId, props.round, answer, currentQuestion)
            .then(() => setDoneSet(doneSet.concat(questionSubmitting)));
    };

    const getQuestionStatus = (questionNumber: number) => {
        if (doneSet.includes(questionNumber)) {
            return <CheckIcon className="ml-2" fontSize="small"/>;
        }
        if (loadingSet.includes(questionNumber)) {
            return (
                <div className="spinner-border spinner-border-sm mx-2"  role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        }
    }
    const selectedCategory = questions.categories.filter(category => category.QuestionNumber == currentQuestion)[0];

    return (
        <div>
            <NavBar loginState={true} refreshCreated={() => {}} />
            <div className="container-lg">
                <div className="row">
                    <div className="col-4">
                        <PlayGameTimer onClose={() => EndRound(props.gameId)}/>
                    </div>
                    <div className="col-4">
                        <h3>Play Round {props.round}</h3>
                        <h4>Letter is {questions.letter}</h4> 
                    </div>
                    <div className ="col-4">
                        <button className="btn btn-primary" onClick={() => setShowEndRoundDialog(true)}>Submit Round!</button>
                    </div>
                </div>
                <div className="row pt-5">
                    <div className="col-sm-2">
                        <ul className="list-group">
                            { questions.categories.map(question => {
                                return (
                                    <li className={ questionClassForNumber(question.QuestionNumber) } onClick={() => clickQuestion(question.QuestionNumber)} key={ question.QuestionNumber }>
                                        Question { question.QuestionNumber + 1 }

                                        { getQuestionStatus(question.QuestionNumber) }
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <SubmissionPage letter={ questions.letter } category={ selectedCategory.Category } submissionFunction={ submitAnswer }/>
                </div>

                <EndRoundDialog gameId={props.gameId} 
                    show={showEndRoundDialog} 
                    onCancel={() => setShowEndRoundDialog(false)}/>
            </div>
        </div>
    );
};
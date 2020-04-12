import React, { useEffect, useState } from 'react';
import { GetQuestions, GetQuestionsResponse } from '../../clients/GetQuestions';
import Loading from '../Loading';

interface Props {
    gameId: string,
    round: number
}

export default (props: Props) => {
    const [ questions, setQuestions ] = useState<GetQuestionsResponse>();
    const [ currentQuestion, setCurrent ] = useState(0);
    const [ answer, setAnswer ] = useState("");

    useEffect(() => {
        console.log("here baby");
        if (questions != null) return;

        GetQuestions(props.gameId, props.round)
            .then(response => {
                console.log(JSON.stringify(response));
                setQuestions(response)
            })
            .catch(err => console.log("Could not get questions " + err));
    });

    if (questions == null) {
        console.log("null");
        return <Loading/>;
    }
    console.log("not null");

    const questionClassForNumber = (questionNumber: number) => {
        if (questionNumber == currentQuestion) {
            return "list-group-item active";
        }
        return "list-group-item";
    };

    const clickQuestion = (questionNumber: number) => {
        setAnswer("");
        setCurrent(questionNumber);
    };

    const selectedCategory = questions.categories.filter(category => category.QuestionNumber == currentQuestion)[0];

    return (
        <div className="container-lg">
            <h3>Play Round {questions.round}</h3>
            <h4>Letter is {questions.letter}</h4> 
            <div className="row pt-5">
                <div className="col-sm-2">
                    <ul className="list-group">
                        { questions.categories.map(question => {
                            return (
                                <li className={questionClassForNumber(question.QuestionNumber)} onClick={() => clickQuestion(question.QuestionNumber)} key={question.QuestionNumber}>
                                    Question {question.QuestionNumber + 1}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="col-sm-10">
                    <div className="row">
                        <label htmlFor="inputEmail3" className="col-sm-4">Name a {selectedCategory.Category}!</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" placeholder={"Must start with " + questions.letter + "!"} 
                                value={answer} onChange={event => setAnswer(event.target.value)}/>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-sm">
                            <button className="btn btn-primary mb-2">Submit Answer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
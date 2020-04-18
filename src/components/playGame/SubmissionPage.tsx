import React, { useState, FormEvent, useEffect } from 'react';

interface Props {
    letter: string,
    category: string,
    submissionFunction: (answer: string) => void
}

export default (props: Props) => {
    const [ answer, setAnswer ] = useState("");
    const [ validationError, setValidationError ] = useState(false);

    useEffect(() => {
        setValidationError(false);
        setAnswer('');
    }, [props.category]);

    const isValidAnswer = () => {
        const trimedAnswer = answer.trim();

        if (trimedAnswer.length == 0) return false;
        if (trimedAnswer.substr(0,1).toLowerCase() !== props.letter.toLowerCase()) return false;

        return true;
    }

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isValidAnswer()) {
            setValidationError(true);
            return;
        }

        props.submissionFunction(answer);
    };

    return (
        <form className="col-sm-10" onSubmit={submit}>
            <div className="row">
                <label htmlFor="form-control" className="col-sm-4">Name a {props.category}!</label>
                <div className="col-sm-8">
                    <input type="text" className={"form-control" + (validationError ? ' is-invalid' : '')} placeholder={"Must start with " + props.letter + "!"} 
                        value={answer} onChange={event => setAnswer(event.target.value)} data-testid="AnswerInput"/>
                    <div className={(validationError ? 'd-flex p-2 ' : 'd-none ') +  "invalid-feedback"}>
                        Invalid answer
                    </div>
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-sm">
                    <button type="submit" className="btn btn-primary mb-2" data-testid="SubmitAnswerButton">Submit Answer</button>
                </div>
            </div>
        </form>
    );
};

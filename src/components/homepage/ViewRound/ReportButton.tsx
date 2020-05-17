import React, { useEffect, useState, FormEvent } from 'react';
import { UserAnswer } from '../../../clients/GetAnswers';
import ReportAnswer from '../../../clients/ReportAnswer';
import Loading from '../../Loading';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TooltipProps } from 'react-bootstrap';

interface Props {
    gameId: string,
    round: number,
    answer: UserAnswer,
    refresh: () => void
}

export default (props: Props) => {
    const [loading, setLoading] = useState(false);

    if (loading) {
        return (
            <button className='btn btn-danger btn-sm px-1' disabled>
                <span className="spinner-border spinner-border-sm" role="status">
                    <span className="sr-only">Loading...</span> 
                </span>
            </button>
        );
    }

    const report = () => {
        setLoading(true);
        ReportAnswer(props.answer.userId, props.gameId, props.round, props.answer.questionNumber)
            .then(() => setLoading(false))
            .then(() => props.refresh());
    }

    const overLayContent = (props: TooltipProps) => (
        <Tooltip {...props}>
            <div>Flag this answer as incorrect!</div>
        </Tooltip>
    );

    return (
        <OverlayTrigger delay={{ show: 50, hide: 50 }} overlay={overLayContent} placement="bottom">
            <button onClick={() => report()} className='btn btn-danger btn-sm'>
                X
            </button>
        </OverlayTrigger>
    )
}
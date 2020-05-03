import { GameScore } from "../../clients/GetGamesForUser";
import * as React from 'react';

export interface Props {
    score: GameScore
}

export const ScoreView = (props: Props) => {
    return (
        <div className="row w-50">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nickname</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {props.score.scores.map(score => <tr>
                        <td>{score.nickname}</td>
                        <td>{score.score}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}
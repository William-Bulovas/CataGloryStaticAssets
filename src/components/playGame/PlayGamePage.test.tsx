import React from 'react';
import PlayGamePage from './PlayGamePage';
import * as Questions from '../../clients/GetQuestions';
import { render, RenderResult } from '@testing-library/react';
import SubmissionPage from './SubmissionPage';

describe('<PlayGamePage/>', () => {
    const sampleGameId = 'gameId';
    const sampleRound = 1;
    const sampleLetter = 'a';
    const sampleCatagories = [
        {
            QuestionNumber: 0,
            Category: 'movie'
        },
        {
            QuestionNumber: 1,
            Category: 'tv show'
        }
    ] as Questions.Category[];

    const getQuestionsSpy = jest.spyOn(Questions, 'GetQuestions');

    let playGamePage: RenderResult;

    beforeEach(() => {
        getQuestionsSpy.mockImplementation((gameId: string, round: number) => 
            Promise.resolve({
                gameId: sampleGameId,
                round: sampleRound,
                letter: sampleLetter,
                categories: sampleCatagories
            })
        );

        playGamePage = render(<PlayGamePage gameId={sampleGameId} round={sampleRound}/>);
    });

    afterEach(() => {
        getQuestionsSpy.mockClear();
    });

    it('will call get questions on mount', () => {
        expect(getQuestionsSpy).toHaveBeenCalledTimes(1);
        expect(getQuestionsSpy).toHaveBeenCalledWith(sampleGameId, sampleRound);
    });
});

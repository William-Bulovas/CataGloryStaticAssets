import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import PlayGamePage from './PlayGamePage';
import * as Questions from '../../clients/GetQuestions';
import { act } from 'react-dom/test-utils';

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

    let container: Element;

    beforeEach(() => {
        getQuestionsSpy.mockImplementation((gameId: string, round: number) => 
            Promise.resolve({
                gameId: sampleGameId,
                round: sampleRound,
                letter: sampleLetter,
                categories: sampleCatagories
            })
        );

        container = document.createElement('div');
        document.body.appendChild(container);
        
        act(() => {
            ReactDOM.render(<PlayGamePage gameId={sampleGameId} round={sampleRound}/>, container)
        });
    });

    afterEach(() => {
        getQuestionsSpy.mockClear();

        document.body.removeChild(container);
    });

    it('will call get questions on mount', () => {
        expect(getQuestionsSpy).toHaveBeenCalledTimes(1);
        expect(getQuestionsSpy).toHaveBeenCalledWith(sampleGameId, sampleRound);
    });
});

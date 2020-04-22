import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import SubmissionPage from './SubmissionPage';

describe('<SubmissionPage/>', () => {
    const sampleLetter = 'g';
    const sampleCategory = 'movie';
    const mockCallBackFunction = jest.fn((answer: string) => {});
    const sampleValidAnswer = 'Goodfellas';
    const sampleValidAnswerWithLowerCase = 'godFather';
    const sampleInValidAnswer = 'Departed';

    let submissionPage: RenderResult;

    beforeEach(() => {
        mockCallBackFunction.mockClear();

        submissionPage = render(<SubmissionPage category={sampleCategory} 
                letter={sampleLetter} submissionFunction={mockCallBackFunction}/>);
    });

    describe('when submitting a valid answer', () => {
        it('calls the callback method with answer', () => {
            const inputForm = submissionPage.getByTestId('AnswerInput');
            fireEvent.change(inputForm, { target: { value: sampleValidAnswer }});

            const submitButton = submissionPage.getByTestId('SubmitAnswerButton');
            fireEvent.click(submitButton);

            expect(mockCallBackFunction).toHaveBeenCalledTimes(1);
            expect(mockCallBackFunction).toHaveBeenCalledWith(sampleValidAnswer);
        });
    });

    describe('when submitting a valid lower case answer', () => {
        it('calls the callback method with answer', () => {
            const inputForm = submissionPage.getByTestId('AnswerInput');
            fireEvent.change(inputForm, { target: { value: sampleValidAnswerWithLowerCase }});

            const submitButton = submissionPage.getByTestId('SubmitAnswerButton');
            fireEvent.click(submitButton);

            expect(mockCallBackFunction).toHaveBeenCalledTimes(1);
            expect(mockCallBackFunction).toHaveBeenCalledWith(sampleValidAnswerWithLowerCase);
        });
    });

    describe('when submitting an invalid lower case answer', () => {
        it('calls the callback method with answer', () => {
            const inputForm = submissionPage.getByTestId('AnswerInput');
            fireEvent.change(inputForm, { target: { value: sampleInValidAnswer }});

            const submitButton = submissionPage.getByTestId('SubmitAnswerButton');
            fireEvent.click(submitButton);

            expect(mockCallBackFunction).toHaveBeenCalledTimes(0);
        });
    });
});
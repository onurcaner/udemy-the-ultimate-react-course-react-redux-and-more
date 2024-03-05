import { Dispatch, MouseEventHandler } from 'react';

import { Action, ActionType } from '../appReducer';

export interface NextButtonProps {
  isQuestionAnswered: boolean;
  questionIndex: number;
  totalQuestions: number;
  dispatch: Dispatch<Action>;
}

export function NextButton({
  isQuestionAnswered,
  questionIndex,
  totalQuestions,
  dispatch,
}: NextButtonProps): JSX.Element {
  if (!isQuestionAnswered) return <></>;

  const isReadyToFinishQuiz = questionIndex + 1 === totalQuestions;

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({
      type: isReadyToFinishQuiz
        ? ActionType.FinishQuiz
        : ActionType.NextQuestion,
    });
  };

  return (
    <button className="btn btn-ui" onClick={handleClick} type="button">
      {isReadyToFinishQuiz ? 'Finish' : 'Next'}
    </button>
  );
}

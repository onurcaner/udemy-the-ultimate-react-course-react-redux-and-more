import { Dispatch, MouseEventHandler } from 'react';

import { Action, ActionType } from '../appReducer';

export interface StartScreenProps {
  numberOfQuestions: number;
  dispatch: Dispatch<Action>;
}

export function StartScreen({
  numberOfQuestions,
  dispatch,
}: StartScreenProps): JSX.Element {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: ActionType.StartQuiz });
  };

  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>Test your React knowledge with {numberOfQuestions} questions</h3>
      <button className="btn" type="button" onClick={handleClick}>
        Let&apos;s start
      </button>
    </div>
  );
}

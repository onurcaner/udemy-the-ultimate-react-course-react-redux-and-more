import { Dispatch, MouseEventHandler } from 'react';

import { Action, ActionType } from '../appReducer';

export interface FinishScreenProps {
  points: number;
  maximumPossiblePoints: number;
  highScore: number;
  dispatch: Dispatch<Action>;
}

export function FinishScreen({
  points,
  maximumPossiblePoints,
  highScore,
  dispatch,
}: FinishScreenProps): JSX.Element {
  const pointsPercent = (points / maximumPossiblePoints) * 100;

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: ActionType.RestartQuiz });
  };

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maximumPossiblePoints} (
        {Math.round(pointsPercent)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button className="btn btn-ui" type="button" onClick={handleClick}>
        Restart quiz
      </button>
    </>
  );
}

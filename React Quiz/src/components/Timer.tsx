import { Dispatch, useEffect } from 'react';

import { Action, ActionType } from '../appReducer';

export interface TimerProps {
  remainingTime: number;
  dispatch: Dispatch<Action>;
}

export function Timer({ remainingTime, dispatch }: TimerProps): JSX.Element {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!remainingTime) dispatch({ type: ActionType.FinishQuiz });
      else dispatch({ type: ActionType.TimerTick });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [remainingTime, dispatch]);

  const minutes = Math.floor(remainingTime / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (remainingTime % 60).toString().padStart(2, '0');

  return (
    <div className="timer" aria-label="Remaining time">
      {minutes}:{seconds}
    </div>
  );
}

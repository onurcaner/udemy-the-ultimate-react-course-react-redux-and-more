import { useEffect, useReducer, Reducer } from 'react';

import { Header } from './components/Header';
import { Main } from './components/Main';
import { Loader } from './components/Loader';
import { Error } from './components/Error';
import { StartScreen } from './components/StartScreen';
import { Progress } from './components/Progress';
import { Question } from './components/Question';
import { NextButton } from './components/NextButton';
import { FinishScreen } from './components/FinishScreen';

import { getQuestions } from './questions/getQuestions';

import { AppState, Status, initialState } from './AppState';
import { appReducer, ActionType, Action } from './appReducer';

export function App(): JSX.Element {
  const [
    { questions, status, questionIndex, answerIndex, totalPoints, highScore },
    dispatch,
  ] = useReducer<Reducer<Readonly<AppState>, Action>>(appReducer, initialState);

  const numberOfQuestions = questions.length;
  const question = questions[questionIndex];
  const isQuestionAnswered = answerIndex !== null;
  const maximumPossiblePoints = questions.reduce(
    (total, { points }) => total + points,
    0
  );

  useEffect(() => {
    getQuestions()
      .then((questions) => {
        dispatch({ type: ActionType.InsertQuestions, payload: questions });
      })
      .catch((_error: Error) => {
        dispatch({ type: ActionType.FetchError });
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === Status.Loading && <Loader />}

        {status === Status.Error && <Error />}

        {status === Status.Ready && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}

        {status === Status.Active && (
          <>
            <Progress
              questionIndex={questionIndex}
              totalQuestions={questions.length}
              isQuestionAnswered={isQuestionAnswered}
              points={totalPoints}
              maximumPossiblePoints={maximumPossiblePoints}
            />
            <Question
              question={question}
              answerIndex={answerIndex}
              isQuestionAnswered={isQuestionAnswered}
              dispatch={dispatch}
            />
            <NextButton
              questionIndex={questionIndex}
              totalQuestions={questions.length}
              isQuestionAnswered={isQuestionAnswered}
              dispatch={dispatch}
            />
          </>
        )}

        {status === Status.Finished && (
          <FinishScreen
            points={totalPoints}
            maximumPossiblePoints={maximumPossiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

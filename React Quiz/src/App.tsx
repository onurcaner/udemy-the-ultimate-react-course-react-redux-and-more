import { useEffect, useReducer } from 'react';

import { Header } from './components/Header';
import { Main } from './components/Main';
import { Loader } from './components/Loader';
import { Error } from './components/Error';
import { StartScreen } from './components/StartScreen';

import { getQuestions, QuestionAttributes } from './questions/getQuestions';

//
//
// App State
interface AppState {
  questions: QuestionAttributes[];
  status: Status;
}

enum Status {
  Loading = 1,
  Error,
  Ready,
  Active,
  Finished,
}

const initialState: AppState = {
  questions: [],
  status: Status.Loading,
};

//
//
// useReducer Actions
enum ActionType {
  InsertQuestions = 1,
  FetchError,
}

interface InsertQuestions {
  type: ActionType.InsertQuestions;
  payload: AppState['questions'];
}

interface FetchError {
  type: ActionType.FetchError;
  payload?: null;
}

type Action = InsertQuestions | FetchError;

function appReducer(state: Readonly<AppState>, action: Action): AppState {
  const { type, payload } = action;

  switch (type) {
    case ActionType.InsertQuestions:
      return { ...state, questions: payload, status: Status.Ready };

    case ActionType.FetchError:
      return { ...state, status: Status.Error };

    default:
      return state;
  }
}

export function App(): JSX.Element {
  const [{ questions, status }, dispatch] = useReducer(
    appReducer,
    initialState
  );

  const numberOfQuestions = questions.length;

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
          <StartScreen numberOfQuestions={numberOfQuestions} />
        )}
      </Main>
    </div>
  );
}

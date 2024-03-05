import { AppState, Status, initialState } from './AppState';

export enum ActionType {
  InsertQuestions = 'insertQuestions',
  FetchError = 'fetchError',
  StartQuiz = 'startQuiz',
  AnswerQuestion = 'answer',
  NextQuestion = 'nextQuestion',
  FinishQuiz = 'finishQuiz',
  RestartQuiz = 'restartQuiz',
}

interface InsertQuestions {
  type: ActionType.InsertQuestions;
  payload: AppState['questions'];
}

interface FetchError {
  type: ActionType.FetchError;
  payload?: undefined;
}

interface StartQuiz {
  type: ActionType.StartQuiz;
  payload?: undefined;
}

interface AnswerQuestion {
  type: ActionType.AnswerQuestion;
  payload: AppState['answerIndex'];
}

interface NextQuestion {
  type: ActionType.NextQuestion;
  payload?: undefined;
}

interface FinishQuiz {
  type: ActionType.FinishQuiz;
  payload?: undefined;
}

interface RestartQuiz {
  type: ActionType.RestartQuiz;
  payload?: undefined;
}

export type Action =
  | InsertQuestions
  | FetchError
  | StartQuiz
  | AnswerQuestion
  | NextQuestion
  | FinishQuiz
  | RestartQuiz;

export function appReducer(
  state: Readonly<AppState>,
  action: Action
): Readonly<AppState> {
  const { type, payload } = action;

  switch (type) {
    case ActionType.InsertQuestions: {
      return { ...state, questions: payload, status: Status.Ready };
    }

    case ActionType.FetchError: {
      return { ...state, status: Status.Error };
    }

    case ActionType.StartQuiz: {
      return { ...state, status: Status.Active };
    }

    case ActionType.AnswerQuestion: {
      const answerIndex = payload;
      const currentQuestion = state.questions[state.questionIndex];
      const isCorrectAnswer = answerIndex === currentQuestion.correctOption;

      return {
        ...state,
        answerIndex,
        ...(isCorrectAnswer && {
          totalPoints: state.totalPoints + currentQuestion.points,
        }),
      };
    }

    case ActionType.NextQuestion: {
      return {
        ...state,
        answerIndex: null,
        questionIndex: state.questionIndex + 1,
      };
    }

    case ActionType.FinishQuiz: {
      const hasNewHighscore = state.totalPoints > state.highScore;
      return {
        ...state,
        status: Status.Finished,
        ...(hasNewHighscore && { highScore: state.totalPoints }),
      };
    }

    case ActionType.RestartQuiz: {
      return {
        ...initialState,
        highScore: state.highScore,
        questions: state.questions,
        status: Status.Ready,
      };
    }

    default:
      return state;
  }
}

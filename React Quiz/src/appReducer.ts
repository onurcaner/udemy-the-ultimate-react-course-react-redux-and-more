import { SECONDS_FOR_PER_QUESTION } from './config';

import { AppState, Status, initialState } from './AppState';

export enum ActionType {
  InsertQuestions = 'insertQuestions',
  FetchError = 'fetchError',
  StartQuiz = 'startQuiz',
  AnswerQuestion = 'answer',
  NextQuestion = 'nextQuestion',
  FinishQuiz = 'finishQuiz',
  RestartQuiz = 'restartQuiz',
  TimerTick = 'timerTick',
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

interface TimerTick {
  type: ActionType.TimerTick;
  payload?: undefined;
}

export type Action =
  | InsertQuestions
  | FetchError
  | StartQuiz
  | AnswerQuestion
  | NextQuestion
  | FinishQuiz
  | RestartQuiz
  | TimerTick;

export function appReducer(
  state: Readonly<AppState>,
  action: Action
): Readonly<AppState> {
  const { type, payload } = action;

  switch (type) {
    case ActionType.InsertQuestions: {
      const questions = payload;

      return {
        ...state,
        questions,
        status: Status.Ready,
        remainingTime: questions.length * SECONDS_FOR_PER_QUESTION,
      };
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
        remainingTime: state.questions.length * SECONDS_FOR_PER_QUESTION,
        status: Status.Ready,
      };
    }

    case ActionType.TimerTick: {
      return { ...state, remainingTime: state.remainingTime - 1 };
    }

    default:
      return state;
  }
}

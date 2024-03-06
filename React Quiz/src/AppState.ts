import { QuestionAttributes } from './questions/getQuestions';

export interface AppState {
  questions: QuestionAttributes[];
  status: Status;
  questionIndex: number;
  answerIndex: number | null;
  totalPoints: number;
  highScore: number;
  remainingTime: number;
}

export enum Status {
  Loading = 'loading',
  Error = 'error',
  Ready = 'ready',
  Active = 'active',
  Finished = 'finished',
}

export const initialState: AppState = {
  questions: [],
  status: Status.Loading,
  questionIndex: 0,
  answerIndex: null,
  totalPoints: 0,
  highScore: 0,
  remainingTime: 0,
};

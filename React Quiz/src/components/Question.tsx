import { Dispatch, MouseEventHandler } from 'react';

import { QuestionAttributes } from '../questions/getQuestions';
import { Action, ActionType } from '../appReducer';
import { AppState } from '../AppState';

export interface QuestionProps {
  question: QuestionAttributes;
  answerIndex: AppState['answerIndex'];
  isQuestionAnswered: boolean;
  dispatch: Dispatch<Action>;
}

export function Question({
  question,
  answerIndex,
  isQuestionAnswered,
  dispatch,
}: QuestionProps): JSX.Element {
  const { options, question: questionTitle } = question;

  return (
    <div>
      <h4>{questionTitle}</h4>

      <ul className="options" style={{ listStyleType: 'none' }}>
        {options.map((option, index) => (
          <OptionItem
            key={option}
            itemIndex={index}
            {...{ question, answerIndex, isQuestionAnswered, dispatch }}
          />
        ))}
      </ul>
    </div>
  );
}

interface OptionItemProps extends QuestionProps {
  itemIndex: number;
}

function OptionItem({
  question,
  answerIndex,
  isQuestionAnswered,
  itemIndex,
  dispatch,
}: OptionItemProps): JSX.Element {
  const { correctOption, options } = question;

  const isAnswer = answerIndex === itemIndex;
  const isCorrect = correctOption === itemIndex;

  const buttonClassList = ['btn btn-option'];
  isQuestionAnswered && isAnswer && buttonClassList.push('answer');
  isQuestionAnswered && isCorrect && buttonClassList.push('correct');
  isQuestionAnswered && !isCorrect && buttonClassList.push('wrong');

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch({ type: ActionType.AnswerQuestion, payload: itemIndex });
  };

  return (
    <li className="option">
      <button
        className={buttonClassList.join(' ')}
        type="button"
        onClick={handleClick}
        disabled={isQuestionAnswered}
      >
        {options[itemIndex]}
      </button>
    </li>
  );
}

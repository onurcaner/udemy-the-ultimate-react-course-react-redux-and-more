export interface ProgressProps {
  questionIndex: number;
  totalQuestions: number;
  isQuestionAnswered: boolean;
  points: number;
  maximumPossiblePoints: number;
}

export function Progress({
  questionIndex,
  totalQuestions,
  isQuestionAnswered,
  points,
  maximumPossiblePoints,
}: ProgressProps) {
  const progressValue = isQuestionAnswered ? questionIndex + 1 : questionIndex;
  return (
    <div className="progress">
      <progress value={progressValue} max={totalQuestions} />

      <p>
        Question <strong>{questionIndex + 1}</strong> / {totalQuestions}
      </p>
      <p>
        Points <strong>{points}</strong> / {maximumPossiblePoints}
      </p>
    </div>
  );
}

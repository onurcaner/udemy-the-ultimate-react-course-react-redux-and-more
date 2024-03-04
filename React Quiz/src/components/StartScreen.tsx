export interface StartScreenProps {
  numberOfQuestions: number;
}

export function StartScreen({
  numberOfQuestions,
}: StartScreenProps): JSX.Element {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>Test your React knowledge with {numberOfQuestions} questions</h3>
      <button className="btn" type="button">
        Let&apos;s start
      </button>
    </div>
  );
}

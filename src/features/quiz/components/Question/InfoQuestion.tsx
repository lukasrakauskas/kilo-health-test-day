import { QuestionProps } from './QuestionProps';

function InfoQuestion({ question, onAnswer }: QuestionProps): JSX.Element {
  const handleAnswer = (): void => {
    onAnswer(null);
  };

  return (
    <div>
      <h3>{question.label}</h3>
      {question.description ? <p>{question.description}</p> : null}
      <button onClick={handleAnswer}>Continue</button>
    </div>
  );
}
export default InfoQuestion;

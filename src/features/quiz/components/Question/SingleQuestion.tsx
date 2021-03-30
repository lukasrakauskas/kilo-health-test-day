import { QuestionProps } from './QuestionProps';

function SingleQuestion({ question, onAnswer }: QuestionProps): JSX.Element {
  const options = question.options ?? [];

  return (
    <div>
      <h3>{question.label}</h3>
      {question.description ? <p>{question.description}</p> : null}
      {options.map((option) => (
        <div key={option.value}>
          <button onClick={() => onAnswer(option.value)}>{option.label}</button>
        </div>
      ))}
    </div>
  );
}
export default SingleQuestion;

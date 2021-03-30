import { QuestionProps } from './QuestionProps';

function InfoQuestion({ question, onAnswer }: QuestionProps): JSX.Element {
  const handleAnswer = (): void => {
    onAnswer(null);
  };

  return (
    <div>
      <h3 className="mb-4 text-2xl font-semibold">{question.label}</h3>
      {question.description ? (
        <p className="mb-4">{question.description}</p>
      ) : null}

      <button
        className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white border border-transparent rounded-md bg-primary md:py-4 md:text-lg md:px-10"
        onClick={handleAnswer}
      >
        Continue
      </button>
    </div>
  );
}
export default InfoQuestion;

import { useState } from 'react';

import { QuestionProps } from './QuestionProps';

function MultipleQuestion({ question, onAnswer }: QuestionProps): JSX.Element {
  const [answers, setAnwsers] = useState<string[]>([]);

  const options = question.options ?? [];
  const handleSelectAnswer = (selectedAnswer: string): void => {
    setAnwsers((prevAnswers) => {
      if (prevAnswers.includes(selectedAnswer)) {
        return [...prevAnswers].filter((answer) => answer !== selectedAnswer);
      }

      return [...prevAnswers, selectedAnswer];
    });
  };
  const handleSubmitAnwsers = (): void => {
    onAnswer(answers);
  };

  return (
    <div>
      <h3>{question.label}</h3>
      {question.description ? <p>{question.description}</p> : null}

      {options.map((option) => (
        <div key={option.value}>
          <button onClick={() => handleSelectAnswer(option.value)}>
            {option.label}
          </button>
        </div>
      ))}

      <button onClick={handleSubmitAnwsers}>Continue</button>
    </div>
  );
}
export default MultipleQuestion;

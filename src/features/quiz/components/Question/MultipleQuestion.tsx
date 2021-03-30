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

  const isContinueDisabled = answers.length === 0;

  return (
    <div>
      <h3 className="mb-4 text-2xl font-semibold">{question.label}</h3>
      {question.description ? (
        <p className="mb-4">{question.description}</p>
      ) : null}
      <div className="flex flex-col items-start mb-4">
        {options.map((option) => {
          const isActive = answers.includes(option.value);
          const isDeselect = option.custom?.deselectAll ?? false;
          const checkState = isActive ? 'selected' : 'empty';

          const onClick = (): void =>
            isDeselect ? onAnswer([]) : handleSelectAnswer(option.value);

          const iconName = option.custom?.icon;
          const iconSize = option.custom?.iconSize;

          return (
            <button
              className={`flex items-center justify-between w-full p-3 mb-2 border rounded-md focus:outline-none ${
                isActive ? 'border-primary' : ''
              }`}
              key={option.value}
              onClick={onClick}
            >
              <div className="flex items-center">
                {iconName ? (
                  <img
                    className="mr-4"
                    width={iconSize}
                    height={iconSize}
                    src={`${process.env.PUBLIC_URL}/assets/icons/${iconName}.svg`}
                    alt={iconName}
                  />
                ) : null}
                <span>{option.label}</span>
              </div>
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/check-${checkState}.svg`}
                alt="check"
              />
            </button>
          );
        })}
      </div>

      <button
        className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white border border-transparent rounded-md bg-primary disabled:bg-gray-400 disabled:hover:bg-gray-500 md:py-4 md:text-lg md:px-10"
        onClick={handleSubmitAnwsers}
        disabled={isContinueDisabled}
      >
        Continue
      </button>
    </div>
  );
}
export default MultipleQuestion;

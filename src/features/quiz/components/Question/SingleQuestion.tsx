import { QuestionProps } from './QuestionProps';

function SingleQuestion({ question, onAnswer }: QuestionProps): JSX.Element {
  const options = question.options ?? [];

  return (
    <div>
      <h3 className="mb-6 text-2xl font-semibold">{question.label}</h3>
      {question.description ? (
        <p className="mb-4">{question.description}</p>
      ) : null}
      <div className="flex flex-col items-start">
        {options.map((option) => {
          const iconName = option.custom?.icon;
          const iconSize = option.custom?.iconSize;
          return (
            <button
              className="flex items-center justify-between w-full p-3 mb-2 border rounded-md focus:outline-none"
              key={option.value}
              onClick={() => onAnswer(option.value)}
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
                src={`${process.env.PUBLIC_URL}/assets/icons/arrow_right.svg`}
                alt="arrow pointing right"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default SingleQuestion;

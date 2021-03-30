import { QuestionType } from 'features/quiz/quizDto';

import InfoQuestion from './InfoQuestion';
import MultipleQuestion from './MultipleQuestion';
import { QuestionProps } from './QuestionProps';
import SingleQuestion from './SingleQuestion';

export const defaultRenderQuestion = ({
  question,
  onAnswer,
}: QuestionProps): JSX.Element => {
  switch (question.type) {
    case QuestionType.Single:
      return <SingleQuestion question={question} onAnswer={onAnswer} />;
    case QuestionType.Multiple:
      return <MultipleQuestion question={question} onAnswer={onAnswer} />;
    case QuestionType.Info:
      return <InfoQuestion question={question} onAnswer={onAnswer} />;
    default:
      throw new Error('Question type is not implemented.');
  }
};

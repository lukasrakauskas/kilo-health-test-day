import { QuizDTO } from 'features/quiz/quizDto';

export const defaultGetNextQuestion = (
  quiz: QuizDTO,
  questionKey: string
): string | null => {
  const currentQuestionIndex = quiz.questions.findIndex(
    (question) => question.key === questionKey
  );
  const nextQuestionKey = quiz.questions?.[currentQuestionIndex + 1]?.key;

  return nextQuestionKey;
};

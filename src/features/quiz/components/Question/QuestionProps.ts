import { Question } from 'features/quiz/quizDto';

export interface QuestionProps {
  question: Question;
  onAnswer: (answer: string | string[] | null) => void;
}

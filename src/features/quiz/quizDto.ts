export interface QuizDTO {
  name: string;
  slug: string;
  questions: Question[];
}

export interface Question {
  type: QuestionType;
  options?: Option[];
  label: string;
  key: string;
  description?: string;
}

export interface Option {
  label: string;
  value: string;
  custom?: Custom;
}

export interface Custom {
  icon?: string;
  iconSize?: number;
  deselectAll?: boolean;
}

export enum QuestionType {
  Info = 'info',
  Multiple = 'multiple',
  Single = 'single',
}

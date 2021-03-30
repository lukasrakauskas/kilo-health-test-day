import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { fetchQuiz, resetQuiz } from 'features/quiz/quizSlice';
import { useAppDispatch, useAppSelector } from 'store/store';

import { AnswersDTO } from '../answersDto';
import { defaultGetNextQuestion } from '../components/Question/defaultGetNextQuestion';
import { defaultRenderQuestion } from '../components/Question/defaultRenderQuestion';
import { QuestionProps } from '../components/Question/QuestionProps';
import { QuizDTO } from '../quizDto';

interface QuizProps {
  slug: string;
  onSubmit: (answers: AnswersDTO) => void;
  renderQuestion?: (questionProps: QuestionProps) => JSX.Element;
  getNextQuestion?: (
    quiz: QuizDTO,
    questionKey: string,
    answer: string | string[] | null
  ) => string | null;
}

interface QuizParams {
  quizSlug: string;
  questionSlug?: string;
}

function Quiz({
  slug,
  renderQuestion = defaultRenderQuestion,
  getNextQuestion = defaultGetNextQuestion,
  onSubmit,
}: QuizProps): JSX.Element {
  const params = useParams<QuizParams>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { quiz, error, status } = useAppSelector((store) => store.quiz);
  const [answers, setAnwers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchQuiz(slug));

    return () => {
      dispatch(resetQuiz());
    };
  }, [dispatch, slug]);

  if (status === 'error') {
    return <p>{error}</p>;
  }

  if (status === 'idle' || status === 'pending' || quiz == null) {
    return <p>Loading...</p>;
  }

  if (submitted) {
    return <p>Thank you for answering this quizz</p>;
  }

  const questionKey = params.questionSlug;

  if (questionKey == null) {
    const firstQuestionKey = quiz.questions?.[0]?.key;
    if (firstQuestionKey) history.push(`/${slug}/${firstQuestionKey}`);
    return <p>Loading...</p>;
  }

  const currentQuestionIndex = quiz.questions.findIndex(
    (question) => question.key === questionKey
  );
  const currentQuestion = quiz.questions?.[currentQuestionIndex];

  const handleAnswer = (answer: string | string[] | null): void => {
    if (questionKey && answer != null)
      setAnwers({ ...answers, [questionKey]: answer });

    const nextQuestionKey = getNextQuestion(quiz, questionKey, answer);

    if (nextQuestionKey) history.push(`/${slug}/${nextQuestionKey}`);

    if (nextQuestionKey == null) {
      setSubmitted(true);
      onSubmit(answers);
      history.push(`/${slug}`);
    }
  };

  return (
    <div>
      <p>Quiz:</p>
      <p>{quiz.name}</p>

      <button>Back</button>

      <hr />

      {currentQuestion
        ? renderQuestion({ question: currentQuestion, onAnswer: handleAnswer })
        : null}
    </div>
  );
}

export default Quiz;

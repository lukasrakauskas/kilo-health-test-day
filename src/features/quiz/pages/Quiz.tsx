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
    return (
      <div className="flex items-center justify-center h-screen">{error}</div>
    );
  }

  if (status === 'idle' || status === 'pending' || quiz == null) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center h-screen">
        Thank you for answering this quizz
      </div>
    );
  }

  const totalQuestions = quiz.questions.length;
  const questionKey = params.questionSlug;

  if (questionKey == null) {
    const firstQuestionKey = quiz.questions?.[0]?.key;
    if (firstQuestionKey) history.replace(`/${slug}/${firstQuestionKey}`);
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

  const handleBackClick = (): void => {
    history.goBack();
  };

  const completePercentage =
    (100 * (currentQuestionIndex + 1)) / totalQuestions;

  return (
    <div className="h-screen">
      <div className="flex flex-col h-12 mb-2 border-b-2 border-gray-200 shadow-xl">
        <div className="flex items-center justify-between flex-1 w-full px-4">
          <button className="outline-none" onClick={handleBackClick}>
            Back
          </button>
          <span>
            <span className="font-bold">{currentQuestionIndex + 1}</span> of{' '}
            {totalQuestions}
          </span>
        </div>
        <div
          id="loading-bar"
          className="max-w-full bg-primary transition-width"
          style={{ height: 2, bottom: -2, width: `${completePercentage}%` }}
        ></div>
      </div>

      <div className="p-4">
        {currentQuestion
          ? renderQuestion({
              question: currentQuestion,
              onAnswer: handleAnswer,
            })
          : null}
      </div>
    </div>
  );
}

export default Quiz;

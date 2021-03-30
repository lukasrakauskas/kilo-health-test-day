import { Route, Switch } from 'react-router-dom';
import { AnswersDTO } from 'features/quiz/answersDto';
import { defaultGetNextQuestion } from 'features/quiz/components/Question/defaultGetNextQuestion';
import Quiz from 'features/quiz/pages/Quiz';
import Quizzes from 'features/quiz/pages/Quizzes';
import { QuizDTO } from 'features/quiz/quizDto';
import useLocalStorage from 'hooks/useLocalStorage';

function App(): JSX.Element {
  const [, setAnswers] = useLocalStorage<AnswersDTO>('answers', {});

  const handleSubmit = (newAnswers: AnswersDTO): void => {
    setAnswers(newAnswers);
  };

  const handleNextQuestion = (
    quiz: QuizDTO,
    questionKey: string,
    answer: string | string[] | null
  ): string | null => {
    if (
      questionKey === 'primary_goal' &&
      answer !== 'improve_specific_body_areas'
    ) {
      const currentIndex = quiz.questions.findIndex(
        (question) => question.key === questionKey
      );

      const nextQuestionKey = quiz.questions?.[currentIndex + 1]?.key ?? '';

      return defaultGetNextQuestion(quiz, nextQuestionKey);
    }

    return defaultGetNextQuestion(quiz, questionKey);
  };

  return (
    <Switch>
      <Route
        path="/:quizSlug/:questionSlug?"
        render={(routeProps) => {
          const slug = routeProps.match.params.quizSlug;
          return (
            <Quiz
              slug={slug}
              onSubmit={handleSubmit}
              getNextQuestion={handleNextQuestion}
            />
          );
        }}
      />
      <Route exact path="/" component={Quizzes} />
    </Switch>
  );
}

export default App;

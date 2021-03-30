import { Route, Switch } from 'react-router-dom';
import { AnswersDTO } from 'features/quiz/answersDto';
import { defaultGetNextQuestion } from 'features/quiz/components/Question/defaultGetNextQuestion';
import Quiz from 'features/quiz/pages/Quiz';
import Quizzes from 'features/quiz/pages/Quizzes';
import useLocalStorage from 'hooks/useLocalStorage';

function App(): JSX.Element {
  const [, setAnswers] = useLocalStorage<AnswersDTO>('answers', {});

  const handleSubmit = (newAnswers: AnswersDTO): void => {
    setAnswers(newAnswers);
  };

  return (
    <Switch>
      <Route
        path="/:quizSlug/:questionSlug?"
        render={(routeProps) => (
          <Quiz
            slug={routeProps.match.params.quizSlug}
            onSubmit={handleSubmit}
            getNextQuestion={(quiz, questionKey, answer) => {
              if (
                routeProps.match.params.quizSlug === 'test-day' &&
                questionKey === 'primary_goal' &&
                answer === 'improve_specific_body_areas'
              )
                return 'body_areas';

              const newQuiz = {
                ...quiz,
                questions: quiz.questions.filter(
                  (question) => question.key !== 'body_areas'
                ),
              };

              return defaultGetNextQuestion(newQuiz, questionKey);
            }}
          />
        )}
      />
      <Route exact path="/" component={Quizzes} />
    </Switch>
  );
}

export default App;

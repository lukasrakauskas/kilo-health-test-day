import { Link } from 'react-router-dom';

function Quizzes(): JSX.Element {
  return (
    <div>
      <p>Quizzes: </p>
      <Link to="/test-day">Get back in shape.</Link>
    </div>
  );
}

export default Quizzes;

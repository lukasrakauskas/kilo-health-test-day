import { Link } from 'react-router-dom';

function Quizzes(): JSX.Element {
  return (
    <div className="flex flex-col items-center p-4">
      <img
        className="flex-1 mb-6"
        src={`${process.env.PUBLIC_URL}/assets/icons/main.svg`}
        alt="mother with a baby"
      />
      <div className="flex-1 w-full">
        <h1 className="mb-4 text-2xl font-bold text-center">
          Get back in shape.
        </h1>
        <Link
          to="/test-day"
          className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white border border-transparent rounded-md bg-primary md:py-4 md:text-lg md:px-10"
        >
          Start The Quiz
        </Link>
      </div>
    </div>
  );
}

export default Quizzes;

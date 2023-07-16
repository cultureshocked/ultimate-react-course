import { useQuiz } from "../contexts/QuizContext";

export default function StartScreen() {
  const { questions, handleStart } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questions.length} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleStart}>
        Let's start!
      </button>
    </div>
  );
}

import { useQuiz } from "../contexts/QuizContext";

export default function Options() {
  const { getQuestion, dispatch, answer } = useQuiz();
  const q = getQuestion();
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {q.options.map((o, i) => (
        <button
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            hasAnswered ? (i === q.correctOption ? "correct" : "wrong") : ""
          }`}
          key={o}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

import { useQuiz } from "../contexts/QuizContext";

export default function FinishScreen() {
  const { points, maxPoints, dispatch, highscore } = useQuiz();
  return (
    <>
      <p className="result">
        Congratulations! you scored: <strong>{points}</strong> points out of{" "}
        {maxPoints} for a percentage of {Math.ceil((points / maxPoints) * 100)}%
      </p>
      <p className="highscore">
        The highscore to beat is <strong>{highscore}</strong> points.
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Start Over
      </button>
    </>
  );
}

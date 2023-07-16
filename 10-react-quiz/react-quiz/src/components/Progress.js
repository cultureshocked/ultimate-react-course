import { useQuiz } from "../contexts/QuizContext";

export default function Progress() {
  const { idx, questions, points, maxPoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={questions.length} value={idx + Number(answer !== null)} />
      <p>
        Question <strong>{idx}</strong> / {questions.length}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints} points
      </p>
    </header>
  );
}

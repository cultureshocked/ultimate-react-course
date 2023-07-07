export default function Progress({
  idx,
  numQuestions,
  points,
  maxPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={idx + Number(answer !== null)} />
      <p>
        Question <strong>{idx}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints} points
      </p>
    </header>
  );
}

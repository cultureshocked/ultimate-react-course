import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

export default function Question() {
  const { getQuestion, answer, dispatch } = useQuiz();
  const question = getQuestion();
  return (
    <div>
      <h4>{question.question}</h4>
      <Options q={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton.js";
import Progress from "./Progress.js";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  idx: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * 20,
      };
    case "newAnswer":
      const q = state.questions[state.idx];
      return {
        ...state,
        answer: action.payload,
        points:
          state.points + (q.correctOption === action.payload ? q.points : 0),
      };
    case "nextQuestion":
      return { ...state, idx: state.idx + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.highscore > state.points ? state.highscore : state.points,
      };
    case "reset":
      return { ...state, idx: 0, points: 0, answer: null, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("unknown action: " + action.type);
  }
};

export default function App() {
  const [
    { questions, status, idx, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    };
    fetchQuestions();
  }, []);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" ? <Loader /> : null}
        {status === "error" ? <Error /> : null}
        {status === "ready" ? (
          <StartScreen len={numQuestions} dispatch={dispatch} />
        ) : null}
        {status === "active" ? (
          <>
            <Progress
              idx={idx}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[idx]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} seconds={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={idx}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        ) : null}
        {status === "finished" ? (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            dispatch={dispatch}
            highscore={highscore}
          />
        ) : null}
      </Main>
    </div>
  );
}

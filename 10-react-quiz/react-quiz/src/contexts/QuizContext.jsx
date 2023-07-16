import { createContext, useContext, useEffect, useReducer } from "react";

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

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
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

  const handleStart = (e) => {
    dispatch({ type: "startQuiz" });
  };

  const getQuestion = () => {
    return questions[idx];
  };

  const maxPoints = questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        idx,
        answer,
        points,
        highscore,
        secondsRemaining,
        handleStart,
        maxPoints,
        getQuestion,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

function useQuiz() {
  const c = useContext(QuizContext);
  if (c === undefined)
    throw new Error("ERR: Context used out of context scope");
  return c;
}

export { useQuiz, QuizProvider };

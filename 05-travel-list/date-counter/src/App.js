import { useState } from "react";

export default function App() {
  const date = new Date();
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const incrementCount = () => {
    setCount((c) => c + 1);
  };
  const decrementCount = () => {
    setCount((c) => c - 1);
  };
  const setCountFromInput = (e) => {
    if (e.target.value === "") return;
    setCount(Number(e.target.value));
  };

  const setSlider = (e) => {
    setStep(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="step">
          <label for="steps">Step:</label>
          <input
            name="steps"
            type="range"
            min={1}
            max={31}
            value={step}
            onChange={setSlider}
          ></input>
        </div>
        <h4>Count:</h4>
        <div className="count">
          <button onClick={decrementCount}>-</button>
          <input type="text" value={count} onChange={setCountFromInput}></input>
          <button onClick={incrementCount}>+</button>
        </div>
      </form>
      <RenderDate days={count * step} date={date} />
    </>
  );
}

function RenderDate({ date, days }) {
  const offsetDate = new Date(date);
  offsetDate.setDate(offsetDate.getDate() + days);
  const dateStr = offsetDate.toDateString();
  return (
    <p>
      {days === 0
        ? "Today's date is " + dateStr
        : `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} ${
            days < 0 ? "ago was" : "from now will be"
          } ${dateStr}`}
    </p>
  );
}

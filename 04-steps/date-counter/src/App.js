import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(1);
  const currentDate = new Date();

  const buttonStyle = {
    width: "25px",
    height: "25px",
    fontSize: "14px",
  };

  const incrementStep = () => {
    setStep((s) => {
      return s + 1;
    });
  };

  const incrementCount = () => {
    setCount((c) => {
      return c + 1;
    });
  };

  const decrementStep = () => {
    setStep((s) => {
      return s - 1;
    });
  };

  const decrementCount = () => {
    setCount((c) => {
      return c - 1;
    });
  };

  return (
    <div style={{ margin: "auto" }}>
      <div
        className="steps"
        style={{
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
          width: "250px",
          justifyContent: "space-around",
        }}
      >
        <button onClick={decrementStep} style={buttonStyle}>
          -
        </button>
        <p>Step: {step}</p>
        <button onClick={incrementStep} style={buttonStyle}>
          +
        </button>
      </div>
      <div
        className="count"
        style={{
          display: "flex",
          flexFlow: "row",
          alignItems: "center",
          width: "250px",
          justifyContent: "space-around",
        }}
      >
        <button onClick={decrementCount} style={buttonStyle}>
          -
        </button>
        <p>Count: {count}</p>
        <button onClick={incrementCount} style={buttonStyle}>
          +
        </button>
      </div>
      <br></br>
      <GetDate date={currentDate} days={step * count} />
    </div>
  );
}

function GetDate({ date, days }) {
  const result = new Date();
  result.setDate(result.getDate() + days);
  return (
    <p>
      {days === 0
        ? `Today's date is ${date.toDateString()}`
        : `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} ${
            days < 0 ? "ago was" : "from now will be"
          } ${result.toDateString()}`}
    </p>
  );
}

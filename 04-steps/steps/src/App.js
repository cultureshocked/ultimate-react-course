import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep((s) => {
        return s - 1;
      });
    }
  };
  const handleNextStep = () => {
    if (step < 3) {
      setStep((s) => {
        return s + 1;
      });
    }
  };
  const toggleVisibility = () => {
    setIsOpen((toggle) => !toggle);
  };

  return (
    <>
      <button className="close" onClick={toggleVisibility}>
        &times;
      </button>
      {isOpen ? (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <Button
              textColor="#FFF"
              bgColor="#7950F2"
              onClickHandler={handlePreviousStep}
            >
              <span>👈</span> Previous
            </Button>
            <Button
              textColor="#FFF"
              bgColor="#7950F2"
              onClickHandler={handleNextStep}
            >
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Button({ textColor, bgColor, onClickHandler, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}

import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
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
            <button
              style={{ backgroundColor: "#7950F2", color: "#FFF" }}
              onClick={handlePreviousStep}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950F2", color: "#FFF" }}
              onClick={handleNextStep}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

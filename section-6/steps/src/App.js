import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Learn focus and patience 🧘‍♂️",
  "Apply for jobs 💼",
  "Invest in a new computer 💻",
  "Invest your new income 🤑",
  "Enjoy your life 🎉",
];

export default function App() {
  const [step, setStep] = useState(1);

  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) {
      setStep((s) => s - 1);
    }
  }

  function handleNext() {
    if (step < 6) {
      setStep((s) => s + 1);
      setStep((s) => s + 1);
    }
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      <div>
        {isOpen && (
          <div className="steps">
            <div className="numbers">
              <div className={step >= 1 ? "active" : ""}>1</div>
              <div className={step >= 2 ? "active" : ""}>2</div>
              <div className={step >= 3 ? "active" : ""}>3</div>
              <div className={step >= 4 ? "active" : ""}>4</div>
              <div className={step >= 5 ? "active" : ""}>5</div>
              <div className={step >= 6 ? "active" : ""}>6</div>
            </div>

            <p className="message">
              Step {step}: {messages[step - 1]}
            </p>

            <div className="buttons">
              <button
                style={{ backgroundColor: "#7950f2", color: "#fff" }}
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                style={{ backgroundColor: "#7950f2", color: "#fff" }}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

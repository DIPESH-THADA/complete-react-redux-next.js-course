import "./index.css";
import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  // function stepAhead() {
  //   setStep((s) => s + 1);
  // }

  // function stepBack() {
  //   setStep((s) => s - 1);
  // }

  function countIncrement() {
    setCount((c) => c + step);
  }

  function countDecrement() {
    setCount((c) => c - step);
  }

  function resetBtn() {
    setCount(0);
    setStep(1);
  }
  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <div className="App">
      <h1>Counter App</h1>
      <div className="counter">
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>Step: {step}</span>
      </div>

      <div className="counter">
        <button onClick={countDecrement}>-</button>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />{" "}
        <button onClick={countIncrement}>+</button>
      </div>

      <p>
        <span>
          {count === 0
            ? "Today "
            : count > 0
              ? `In ${count} days `
              : `${Math.abs(count)} days ago `}
        </span>
        <span>{date.toDateString()}</span>
      </p>
      {count !== 0 || step !== 1 ? (
        <div>
          <button onClick={resetBtn}>Reset</button>
        </div>
      ) : null}
    </div>
  );
}

export default App;

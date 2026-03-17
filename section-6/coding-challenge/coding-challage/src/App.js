import "./index.css";
import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function stepAhead() {
    setStep((s) => s + 1);
  }

  function stepBack() {
    setStep((s) => s - 1);
  }

  function countIncrement() {
    setCount((c) => c + step);
  }

  function countDecrement() {
    setCount((c) => c - step);
  }

  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <div className="App">
      <h1>Counter App</h1>
      <div className="counter">
        <button onClick={stepBack}>-</button>
        <p>Step: {step}</p>
        <button onClick={stepAhead}>+</button>
      </div>

      <div className="counter">
        <button onClick={countDecrement}>-</button>
        <p>Count: {count}</p>
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
    </div>
  );
}

export default App;

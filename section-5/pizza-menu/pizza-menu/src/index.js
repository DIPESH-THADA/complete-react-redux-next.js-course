import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return <h1>Pizza Menu Starter!</h1>;
}

// react v18 syntax
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// react before v18 syntax
// ReactDOM.render(<App />, document.getElementById("root"));

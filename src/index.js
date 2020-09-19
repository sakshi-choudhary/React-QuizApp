import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import MainQuiz from "./components/MainQuiz";

function App() {
  return (
    <div className="App">
      <MainQuiz />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

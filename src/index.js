import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import MainQuiz from "./components/MainQuiz";
import Header from "./components/header";

const App = () => (
  <div className="App">
    <Header />
    <MainQuiz />
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

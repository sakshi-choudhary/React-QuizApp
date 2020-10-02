import React from "react";
import { quizData } from "./quizData";

class MainQuiz extends React.Component {
  state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false,
  };

  loadQuizData = () => {
    this.setState(() => {
      return {
        questions: quizData[this.state.currentQuestion].question,
        answer: quizData[this.state.currentQuestion].answer,
        options: quizData[this.state.currentQuestion].options,
      };
    });
  };

  componentDidMount() {
    this.loadQuizData();
  }

  nextQuestionHandler = () => {
    const { myAnswer, answer, score } = this.state;

    if (myAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
    });
    console.log(this.state.currentQuestion);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: quizData[this.state.currentQuestion].options,
          answer: quizData[this.state.currentQuestion].answer,
        };
      });
    }
  }

  //check answer
  checkAnswer = (answer) => {
    this.setState({ myAnswer: answer, disabled: false });
  };
  finishHandler = () => {
    if (this.state.currentQuestion === quizData.length - 1) {
      this.setState({
        isEnd: true,
      });
    }
    if (this.state.myAnswer === this.state.answer) {
      this.setState({
        score: this.state.score + 1,
      });
    }
  };

  reloadPage = () => window.location.reload();

  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;

    return isEnd ? (
      <div className="result">
        <h2 className="over">QUIZ Over</h2>
        <h2>
          Your Final score is{" "}
          <h1 className="score">
            <strong> {this.state.score}</strong>
          </h1>{" "}
          points{" "}
        </h2>
        <div className="Container">
          <p className="answerintro">
            {" "}
            The correct answer's for the questions was
          </p>
          <ul>
            {quizData.map((item, index) => (
              <li className="ui floating message options" key={index}>
                {item.answer}
              </li>
            ))}
          </ul>
          <button
            onClick={this.reloadPage}
            className="ui inverted button"
            style={{ display: "block", marginRight: "120px" }}
          >
            {" "}
            Try Again{" "}
          </button>
        </div>
      </div>
    ) : (
      <div className="Container">
        <h1 className="question">{this.state.questions} </h1>
        <span className="remaining">{`Questions ${currentQuestion}  out of ${
          quizData.length - 1
        } remaining `}</span>
        {options.map((option) => (
          <p
            key={option.id}
            className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}
            onClick={() => this.checkAnswer(option)}
          >
            {option}
          </p>
        ))}
        {currentQuestion < quizData.length - 1 && (
          <button
            className="ui inverted button "
            disabled={this.state.disabled}
            onClick={this.nextQuestionHandler}
            style={{ display: "block", marginRight: "120px" }}
          >
            Next
          </button>
        )}
        {/* //adding a finish button */}
        {currentQuestion === quizData.length - 1 && (
          <button
            className="ui inverted button"
            onClick={this.finishHandler}
            style={{ display: "block", marginRight: "120px" }}
          >
            Finish
          </button>
        )}
      </div>
    );
  }
}
export default MainQuiz;

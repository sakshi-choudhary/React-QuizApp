import React, {Component} from 'react';
import Question from './question/Question';
import Answer from './answer/Answer';
import './QuizMain.css';

export default class Quiz extends Component {

    // initiating the local state
    state = {
        quiestions: {
            1: 'What US city is known as the "birthplace of jazz"?',
            2: 'What is the capital of Greece?',
            3: 'What planet gave birth to Superman?'
        },
        answers: {
            1: {
                1: 'Chicago',
                2: 'New Orleans',
                3: 'New York'
            },
            2: {
                1: 'Athens',
                2: 'Patras',
                3: 'Kalamata'
            },
            3: {
                1: 'Krypton',
                2: 'Mars',
                3: 'Saturn'
            }
        },
        correctAnswers: {
            1: '2',
            2: '1',
            3: '1'
        },
        correctAnswer: 0,
        clickedAnswer: 0,
        step: 1,
        score: 0
    }

    // the method that checks the correct answer
    checkAnswer = answer => {
        const { correctAnswers, step, score } = this.state;
        if(answer === correctAnswers[step]){
            this.setState({
                score: score + 1,
                correctAnswer: correctAnswers[step],
                clickedAnswer: answer
            });
        }else{
            this.setState({
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }

    // method to move to the next question
    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
    }

    render(){
        let { quiestions, answers, correctAnswer, clickedAnswer, step, score } = this.state;

        function refreshPage() {
            window.location.reload(false);
          }
       
        return(
            <div className="Content">
                {step <= Object.keys(quiestions).length ? 
                    (<>

                       <div className="nextbtn">
                        
                        <button className="QuestionNum">{step}/{Object.keys(quiestions).length}</button>
                        </div>
                      

                        <Question
                            question={quiestions[step]}
                        />
                        <div  className="container">
                      <div className="center">
                        <Answer
                            answer={answers[step]}
                            step={step}
                            checkAnswer={this.checkAnswer}
                            correctAnswer={correctAnswer}
                            clickedAnswer={clickedAnswer}
                           
                        />
                        </div>
                        </div>
                       
                        
                        <div className="skipbtn">
                        <button
                        className="skipQuestion"
                       
                        onClick={() => this.nextStep(step)}>Skip</button></div>
                        
                        <div className="container">
                        <div className="nextbtn">
                        <button 
                        className="NextStep"
                        disabled={
                            clickedAnswer && Object.keys(quiestions).length >= step
                            ? false : true
                        }
                        onClick={() => this.nextStep(step)}>Next</button> </div></div>
                    </>) : (
                        <div className="finalPage">
                            <h1>You have completed the quiz!</h1>
                            <h4>Your score is: {score} of {Object.keys(quiestions).length}</h4>
                            <p>Thank you!</p>
                           
                            <button className="tryagainbtn"  onClick={refreshPage}>TRY AGAIN </button>
                        </div>
                    )
                }
            </div>
        );
    }
}
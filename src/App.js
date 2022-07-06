import { useState, useEffect } from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz"
import he from 'he'
import "./styles/App.css"
import blueBlob from "./images/blue-blob.png"
import yellowBlob from "./images/yellow-blob.png"

export default function App() {
  //quiz api:
  //  "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
  //game state
  const [showHome, setShowHome] = useState(true);
  //check answer state
  const [checkAnswer, setCheckAnswer] = useState(false);
  //quizForm state
  const [quizForm, setQuizForm] = useState([]);
  //quiz score
  const [score, setScore] = useState(0);

  //fetching quiz api
  useEffect(() => {
    setQuizForm([]);
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
    .then(res => res.json())
    .then(data => setQuizForm(insertData(data.results)))

  }, [showHome])


  //Fisher-Yates shuffle function
  function shuffle(inputArray) {
    let array = [...inputArray]
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  //function to record data into quiz form
  function insertData(data){

    const answerArray = data.map((quiz, index) => {
      return {id: index,
              correct_answer: quiz.correct_answer,
              question: he.decode(quiz.question),
              options: shuffle([quiz.correct_answer, ...quiz.incorrect_answers]),
              choosenAnswer: ""        
      }
    })
    return answerArray
  }

  //function to handle buttonClick
  function buttonClick(event, id){
    if(!checkAnswer){
      setQuizForm(prev => prev.map(quiz => {
        return quiz.id === id ? {...quiz, choosenAnswer: event.target.value} : quiz
      }))
    }

  }

  //function to start quiz, set showHome to false
  function startQuiz(){
    setShowHome(false);
  }

  //function to check answer, set checkAnswer to true
  function submitAnswer(){
    setCheckAnswer(true);

    //checking the choosen answer vs correct_answer of each item in the quiz form
    quizForm.forEach(quiz => {
      if(quiz.choosenAnswer === quiz.correct_answer){
        setScore(prev => prev + 1);
      }
    })
  }

  //function to restart quiz, set showHome to true
  function restartQuiz(){
    setShowHome(true);
    setCheckAnswer(false);
    setScore(0);
  }

  //map quizForm into individual quiz elements
  const quizElements = quizForm.map( quiz => <Quiz 
                                                key={quiz.id}
                                                question={quiz.question}
                                                options={quiz.options}
                                                correct_answer={quiz.correct_answer}
                                                choosenAnswer={quiz.choosenAnswer}
                                                checkAnswer={checkAnswer}
                                                buttonClick={(event) => buttonClick(event, quiz.id)}
                                                />)

  return (
    <>
      <img src={blueBlob} alt="blue-blob" className="blue-blob"/>
      <img src={yellowBlob} alt="yellow-blob" className="yellow-blob"/>

      {showHome ? 
      <Home startQuiz={startQuiz}/> 
      : 
      <main>
        {quizElements}
        {checkAnswer ? 
          <div className="quiz-info-area">
            <p className="quiz-scoreboard">You scored {score}/{quizForm.length} correct answers</p>
            <button onClick={restartQuiz} className="btn quiz-playAgain-btn">Play Again</button>
          </div> 
            : 
            <button onClick={submitAnswer} className="btn quiz-checkAnswer-btn">Check Answer</button>
          }
      </main>
      }
    </>
  )
}



import React, { useEffect } from "react"
import CheckAnswers from "./components/check-answers"
import Question from "./components/questions"
import axios from "axios"


export default function App() {
    const [quiz, setQuiz] = React.useState([])
    const [score, setScore] = React.useState(null)
    const [playAgain, setPlayAgain] = React.useState(false)
    let quizDisplay = []

    React.useEffect(() => {
        setQuiz([])
        setScore(null)
        axios("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
        .then(res =>{
            res.data.results.map(q =>{
                const question = decodeHtml(q.question)
                function formatAnswer(text){
                    return(
                        {
                            text: decodeHtml(text),
                            isCorrect: text === q.correct_answer ? true : false,
                            isSelected: false
                        }
                    )
                }
                const correctAnswer = formatAnswer(q.correct_answer)
                const incorrectAnswers = q.incorrect_answers.map(ans => formatAnswer(ans))
                const shuffledAnswers = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5)
                const quizObject = {
                    question,
                    correctAnswer,
                    incorrectAnswers,
                    shuffledAnswers
                }
                
                function saveInitState(prevData){
                    if(prevData.length){
                        return([...prevData, quizObject])
                    } else{
                        return([quizObject])
                    }
                }
                setQuiz(prevData => saveInitState(prevData))                
            })
        })
        
    }, [playAgain]) 
    
    console.log(quiz)

        quizDisplay = quiz.map(function(item, index) {
            return (
                <Question
                    key={index}
                    id={index}
                    question={item.question}
                    answers={item.shuffledAnswers}
                    clickHandler={selectAnswer}
                    playerScore = {score}            
                />
            )
        })
  
    function selectAnswer(event) {
        const clickedAnswer = (event.target.innerHTML)
        const clickedQuestion = (event.target.parentElement.firstChild.innerHTML)

            const updatedQuiz = quiz.map(function(question) {
                if(question.question === clickedQuestion) {
                    const updatedAnswers = question.shuffledAnswers.map(function(answer) {
                        if(answer.text === clickedAnswer) {
                            return{...answer, isSelected:true}
                        } else {
                           return{...answer, isSelected:false}
                        }                     
                    })
                    return{...question, shuffledAnswers:updatedAnswers}
                } else {
                    return{...question}
                } 
        })
        setQuiz(prevQuiz => updatedQuiz)
    }

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    function checkScore() {
        let count = 0
        quiz.forEach(function(question) {
                question.shuffledAnswers.forEach(function(answer) {
                    if(answer.isSelected && answer.isCorrect) {
                        count++
                    }
                })
            })
            setScore(prevScore => count)
    }

    function playAgainClick() {
        setPlayAgain(prevState => !prevState)
    }

    return (
        <>
            {quizDisplay}
            <br></br>
            <br></br>
            <CheckAnswers 
                clickHandler={checkScore} 
                playerScore={score}
                playAgainClickHandler={playAgainClick}
            />
        </>
    )
}
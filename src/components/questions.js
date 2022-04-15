import React from "react"
import Answer from "./answer"



export default function Question(props) {  

    const answersDisplay = props.answers.map(function(item, index) {
        return (
            <Answer 
                key= {index}
                text={item.text}
                isSelected={item.isSelected}
                isCorrect={item.isCorrect}
                clickHandler={props.clickHandler}   
                playerScore={props.playerScore}        
            />
        )
    })
    return (
        <div className="question-container">
            <h2>{props.question}</h2>
            {answersDisplay}
        </div>
    )
}
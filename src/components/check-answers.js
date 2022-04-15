import React from "react"

export default function CheckAnswers(props) {

    if(props.playerScore != null) {
        return (
            <div>
                <p>{`your score is: ${props.playerScore} out of 5`}</p>
                <button onClick={props.playAgainClickHandler}>Play again?</button>
            </div>
        )
    } else {
        return (
            <>
            <button onClick={props.clickHandler}>Check Answers</button>
            </>
        )
    }
    
}
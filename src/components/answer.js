import React from "react"

export default function Answer(props) {

    let styles

    if(props.playerScore == null) {
        props.isSelected ? styles={backgroundColor: "#d6dbf5"} : styles={backgroundColor: "white"}
    } else {
        if(props.isCorrect) {
            styles={backgroundColor: "#94d7a2"}
        } else if(!props.isCorrect && props.isSelected) {
            styles={backgroundColor: "#f6dadc"}
        }
    }
    

    return (
        <>
        <button style={styles} onClick={props.clickHandler}>{props.text}</button>
        </>
    )
}
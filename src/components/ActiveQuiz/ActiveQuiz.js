import React from 'react'
import classes from './ActiveQuiz.module.scss'
import AnswersList from "./AswersList/AnswersList";

function ActiveQuiz(props) {
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>
                        {props.answerNumber}.
                    </strong>&nbsp;
                    {props.question}
                </span>
                <small>{props.answerNumber} из {props.quizLength}</small>
            </p>
           <AnswersList
               answers = {props.answers}
               onAswerClick = {props.onAnswerCLick}
               answerState = {props.answerState}
           />
        </div>
    )
}

export default ActiveQuiz

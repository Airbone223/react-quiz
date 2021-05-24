import React from 'react'
import classes from './AnswersList.module.scss'
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = (props) => (
    <ul className={classes.AnswersList}>
        {props.answers.map((answer, idx) => {
            return <AnswerItem
                answer = {answer}
                key = {idx}
                onAnswerClick = {props.onAswerClick}
                answerState = {props.answerState ? props.answerState[answer.id] : null}
            />
        })}
    </ul>
)


export default AnswersList
import React, {useEffect} from "react";
import classes from './Quiz.module.scss'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from 'react-redux'
import {fetchQuizById, quizAnswerClick, quizRetryClick} from '../../store/actions/quiz'

function Quiz(props) {

    useEffect(() => {
        props.quizRetryClick()
       props.fetchQuizById(props.match.params.id)
    }, [])

    return (
        <div className={classes.Quiz}>
            <div className={classes.QuizWrapper}>
                <h1>Ответьте на все вопросы</h1>
                {
                    props.loading || !props.quiz
                        ? <Loader/>
                        : props.isFinished
                        ? <FinishedQuiz results={props.results}
                                        quiz={props.quiz}
                                        onRetry={props.quizRetryClick}
                        />
                        : <ActiveQuiz
                            answers={props.quiz[props.activeQuestion].answers}
                            question={props.quiz[props.activeQuestion].question}
                            onAnswerCLick={props.quizAnswerClick}
                            quizLength={props.quiz.length}
                            answerNumber={props.activeQuestion + 1}
                            answerState={props.answerState}
                        />
                }
            </div>

        </div>
    )
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        quizRetryClick: () => dispatch(quizRetryClick())
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
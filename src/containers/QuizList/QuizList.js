import React, {useEffect} from 'react'
import classes from './QuizList.module.scss'
import {NavLink} from "react-router-dom";
import {fetchQuizes} from '../../store/actions/quiz'
import Loader from "../../components/UI/Loader/Loader";
import {connect} from 'react-redux'


function QuizList(props) {

    useEffect(() => {
        props.fetchQuizes()
    }, [])

    return (<div className={classes.QuizList}>
        <div>
            <h1>Список тестов</h1>
            {
                props.error
                    ? <h2 className={classes.danger}>
                        {'Что-то пошло не так...'}
                    </h2>
                    : props.loading
                    ? <Loader/>
                    : <ul>
                        {props.quizes.map((quiz, idx) => {
                            return (
                                <li key={quiz.id}>
                                    <NavLink to={'/quiz/' + quiz.id}>
                                        {quiz.name}
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
            }

        </div>
    </div>)
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading,
        error: state.quiz.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
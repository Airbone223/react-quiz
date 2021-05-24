import {combineReducers} from 'redux'
import quizReducer from './quiz'
import {createQuizreducer} from './createQuiz'
import authReducer from './auth'

export default combineReducers({
    quiz: quizReducer,
    createQuiz: createQuizreducer,
    auth: authReducer
})
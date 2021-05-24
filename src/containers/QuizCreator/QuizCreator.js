import React, {useState} from 'react'
import classes from './QuizCreator.module.scss'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {createControl, validate, validateForm} from "../../form/formFramework"
import Select from "../../components/UI/select/Select";
import {connect} from 'react-redux'
import {createQuizQestion, finishCreateQuiz} from '../../store/actions/creaetQuiz'

const createOptionControl = (number) => {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Вариант не может быть пустым',
        id: number
    }, {required: true})
}

const createFormControls = () => {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
        option5: createOptionControl(5)
    }
}

function QuizCreator(props) {
    let [state, setState] = useState({
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    })

    function renderControls() {
        return Object.keys(state.formControls)
            .map((controlName, idx) => {
                const control = state.formControls[controlName]
                return (
                    <React.Fragment key={idx + controlName}>
                        <Input
                            label={control.label}
                            value={control.value}
                            valid={control.valid}
                            shouldValidate={!!control.validation}
                            touched={control.touched}
                            errorMessage={control.errorMessage}
                            onChange={event => changeHandler(event.target.value, controlName)}
                        />
                        {idx === 0 ? <hr key={idx + 'hr'} style={{marginRight: '15px'}}/> : null}
                    </React.Fragment>
                )
            })
    }

    const submitHandler = (event) => {
        event.preventDefault()
    }
    const addQuestionHandler = (event) => {
        event.preventDefault()

        const questionItem = {
            question: state.formControls.question.value,
            id: props.quiz.length + 1,
            rightAnswerId: state.rightAnswerId,
            answers: [
                {text: state.formControls.option1.value, id: state.formControls.option1.id},
                {text: state.formControls.option2.value, id: state.formControls.option2.id},
                {text: state.formControls.option3.value, id: state.formControls.option3.id},
                {text: state.formControls.option4.value, id: state.formControls.option4.id},
                {text: state.formControls.option5.value, id: state.formControls.option5.id}
            ]
        }

        props.createQuizQestion(questionItem)

        setState({
            ...state,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }
    const createQuizHandler = event => {
        event.preventDefault()
            setState({
                ...state,
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControls()
            })
           props.finishCreateQuiz()

    }
    const selectChangeHandler = (event) => {
        setState({...state, rightAnswerId: +event.target.value})
    }
    const changeHandler = (value, controlName) => {
        const formControls = {...state.formControls}
        const control = {...formControls[controlName]}
        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)
        formControls[controlName] = control
        setState({
            ...state, formControls, isFormValid: validateForm(formControls)
        })
    }

    return (<div className={classes.QuizCreator}>
            <div>
                <h1>Создание теста</h1>
                <form onSubmit={submitHandler}>


                    {renderControls()}

                    <Select
                        label='Выберите правильный ответ'
                        value={state.rightAnswerId}
                        onChange={selectChangeHandler}
                        options={[
                            {text: '1', value: 1},
                            {text: '2', value: 2},
                            {text: '3', value: 3},
                            {text: '4', value: 4},
                            {text: '5', value: 5}
                        ]}
                    />
                    <Button
                        type='primary'
                        onClick={addQuestionHandler}
                        disabled={!state.isFormValid}
                    >
                        Добавить вопрос
                    </Button>
                    <Button
                        type='success'
                        onClick={createQuizHandler}
                        disabled={props.quiz.length === 0}
                    >
                        Создать тест
                    </Button>
                </form>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        quiz: state.createQuiz.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQestion: item => dispatch(createQuizQestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)
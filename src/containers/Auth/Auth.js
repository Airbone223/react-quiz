import React, {useState} from 'react'
import classes from './Auth.module.scss'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
import {connect} from 'react-redux'
import {auth} from '../../store/actions/auth'

function Auth(props) {

    let [state, setState] = useState({
            isFormValid: false,
            formControls: {
                email: {
                    value: '',
                    type: 'email',
                    label: 'Email',
                    errorMessage: 'Введите корректный email',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        email: true
                    }
                },
                password: {
                    value: '',
                    type: 'password',
                    label: 'Пароль',
                    errorMessage: 'Введите корректный password',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    }
                }
            }
        }
    )

    const renderInputs = () => {
        return Object.keys(state.formControls)
            .map((controlName, idx) => {
                const control = state.formControls[controlName]
                return (
                    <Input
                        key={controlName + idx}
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        errorMessage={control.errorMessage}
                        shouldValidate={!!control.validation}
                        onChange={event => onChangeHandler(event, controlName)}
                    />
                )
            })
    }

    const validateControl = (value, validation) => {
        if (!validation) {
            return true
        }
        let isValid = true
        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = is.email(value.trim()) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    const onChangeHandler = (event, controlName) => {
        const formControls = {...state.formControls}
        const control = {...formControls[controlName]}
        control.value = event.target.value
        control.touched = true
        control.valid = validateControl(control.value, control.validation)
        formControls[controlName] = control
        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })
        setState({...state, isFormValid, formControls})
    }

    const loginHandler = () => {
        props.auth(state.formControls.email.value, state.formControls.password.value, true)
    }
    const registerHandler = () => {
        props.auth(state.formControls.email.value, state.formControls.password.value, false)
    }
    const submitHandler = event => {
        event.preventDefault()
    }
    return (<div className={classes.Auth}>
        <div>
            <h1>Авторизация</h1>
            <form onClick={submitHandler} className={classes.AuthForm}>
                {renderInputs()}
                <Button
                    type='success'
                    onClick={loginHandler}
                    disabled={!state.isFormValid}
                >
                    Войти
                </Button>
                <Button
                    type='primary'
                    onClick={registerHandler}
                    disabled={!state.isFormValid}
                >
                    Зарегистрироваться
                </Button>
            </form>
        </div>
    </div>)
}


function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password,isLogin))

    }
}

export default connect(null, mapDispatchToProps)(Auth)
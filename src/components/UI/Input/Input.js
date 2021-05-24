import React from 'react'
import classes from './Input.module.scss'

function Input(props) {
    const isInvalid = ({valid, touched, shouldValidate}) => {
        return !valid && shouldValidate && touched
    }
    const inputType = props.type || 'text'
    const cls = [classes.Input]
    if (isInvalid(props)) {
        cls.push(classes.invalid)
    }
    const htmlFor = `${inputType}-${Math.random()}`


    return (<div className={cls.join(' ')}>
        <label htmlFor={htmlFor}>{props.label}</label>
        <input
            id={htmlFor}
            type={inputType}
            value={props.value}
            onChange={props.onChange}
        />
        {
            isInvalid(props)
                ? <span>{props.errorMessage || 'Введите корректные данные'}</span>
                : null
        }

    </div>)
}

export default Input
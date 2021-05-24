import React from 'react'
import classes from './Drawer.module.scss'
import {NavLink} from 'react-router-dom'
import BackDrop from "../../UI/BackDrop/BackDrop";



function Drawer (props) {
    const clickHandler = () => {
        props.onClose()
    }

    const cls = [
        classes.Drawer
    ]
    if (!props.isOpen) {
        cls.push(classes.close)
    }

    const links = [
        {to: '/', label: 'Список', exact: true}
    ]

    if (props.isAuthenticated) {
        links.push({to: '/quiz-creator', label: 'Создать тест', exact: true})
        links.push({to: '/logout', label: 'Выйти', exact: true})
    } else {
        links.push({to: '/auth', label: 'Авторизация', exact: true})
    }

    return (
        <>
            {props.isOpen ? <BackDrop onClick = {props.onClose}/>: null }

        <nav className={cls.join(' ')}>
            <ul>
                {links.map((link, idx) => {
                    return <li key={idx}>
                        <NavLink
                        to = {link.to}
                        exact={link.exact}
                        activeClassName = {classes.active}
                        onClick = {clickHandler}
                        >
                            {link.label}
                        </NavLink>
                    </li>
                })}
            </ul>
        </nav>
        </>
    )

}

export default Drawer
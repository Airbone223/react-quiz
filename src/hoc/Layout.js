import classes from './Layout.module.scss'
import React, {useState} from "react";
import MenuToggle from "../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../components/Navigation/Drawer/Drawer";
import {connect} from 'react-redux'

function Layout(props) {

    let [state, setState] = useState({menu: false})

    const toggleMenuHandler = () => {
        setState({...state, menu: !state.menu})
    }

    const menuCloseHandler = () => {
        setState({...state, menu: false})
    }

    return (
        <div className={classes.Layout}>
            <Drawer
                onClose = {menuCloseHandler}
                isOpen={state.menu}
                isAuthenticated={props.isAuthenticated}
            />
            <MenuToggle
                onToggle={toggleMenuHandler}
                isOpen={state.menu}
            />
            <main>
                {props.children}
            </main>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)

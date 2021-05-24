import React from 'react'
import classes from './Loader.module.scss'

function Loader (props) {
return (
    <div className={classes.Loader}>
    <div className={classes.LoaderDual}></div>
    </div>)
}

export default Loader
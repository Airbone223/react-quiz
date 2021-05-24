import Layout from "./hoc/Layout";
import React, {useEffect} from "react";
import Quiz from "./containers/Quiz/Quiz";
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";
import QuizList from "./containers/QuizList/QuizList";
import {connect} from 'react-redux'
import Logout from './components/Logout/Logout'
import {autoLogin} from './store/actions/auth'

function App(props) {

    useEffect(() => {
        props.autoLogin()
    }, [props])

    let routes = (
        <Switch>
            <Route path="/quiz/:id" component={Quiz}/>
            <Route path="/auth" component={Auth}/>
            <Route path="/" exact component={QuizList}/>
            <Redirect to="/"/>
        </Switch>
    )

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/quiz-creator" component={QuizCreator}/>
                <Route path="/quiz/:id" component={Quiz}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/" exact component={QuizList}/>
                <Redirect to="/" />
            </Switch>
        )
    }

    return (
        <Layout>
            {routes}
        </Layout>
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
     autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

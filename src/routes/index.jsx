import React from 'react'
import { Router, Route, Switch, Redirect } from 'dva/router'
import { Home, Login } from './router'

export default function RouterConfig({ history }) {

    return (
        <Router history={history}>
            <React.Fragment>
                <Switch>
                    <Route path='/home' component={Home} />
                    <Route path='/login' component={Login} />
                    <Redirect to='/home' />
                </Switch>
            </React.Fragment>
        </Router>
    )
}

import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { DatasList, DatasInsert, DatasUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/" exact component={DatasList} />
                <Route path="/datas/create" exact component={DatasInsert} />
                <Route
                    path="/datas/update/:id"
                    exact
                    component={DatasUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App
import React from 'react';
import './App.css';
import ToDoListLayout from "./layout/ToDoListLayout";
import {BrowserRouter as Router, Route} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import SignInLayout from "./layout/SignInLayout";
import SignUpLayout from "./layout/SignUpLayout";


function App() {
    return (
        <Router>
            <Route path={ROUTES.SIGN_IN} component={SignInLayout}/>
            <Route path={ROUTES.SIGN_UP} component={SignUpLayout}/>
            <Route path={ROUTES.HOME} component={ToDoListLayout}/>
            <Route exact path={ROUTES.LANDING} component={ToDoListLayout}/>
        </Router>
    );
}

export default App;

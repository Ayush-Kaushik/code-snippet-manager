import React, {useContext} from 'react';
import {Route, Redirect} from "react-router-dom";
import {FirebaseContext} from "../context/FirebaseContext";
import * as ROUTES from "../constants/routes";

const PrivateRoute = (props) => {
    const fireBaseContext = useContext(FirebaseContext);
    return (fireBaseContext.initialUserState) ? <Route exact component={props.component} path={props.path}/>:
            <Redirect to={ROUTES.SIGN_IN} />
};

export default PrivateRoute;
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { FirebaseContext } from "../context/FirebaseContext";
import * as ROUTES from "../constants/routes";

const PrivateRoute = (props) => {
    const fireBaseContext = useContext(FirebaseContext);

    if (fireBaseContext.initialUserState != null) {
        if (fireBaseContext.initialUserState.emailVerified) {
            return <Route exact component={props.component} path={props.path} />;
        } else {
            return <Redirect to={ROUTES.EMAIL_VERIFICATION} />;
        }
    }

    return <Redirect to={ROUTES.SIGN_IN} />;
};

export default PrivateRoute;

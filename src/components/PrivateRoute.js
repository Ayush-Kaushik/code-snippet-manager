import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { FirebaseContext } from "../context/FirebaseContext";
import * as ROUTES from "../constants/routes";

const PrivateRoute = (Component) => {
    const fireBaseContext = useContext(FirebaseContext);

    /* eslint-disable no-console */
    console.log("this works");
    /* eslint-enable no-console */

    if (fireBaseContext.initialUserState != null) {
        if (fireBaseContext.initialUserState.emailVerified) {
            return <Component />;
        } else {
            return <Navigate to={ROUTES.EMAIL_VERIFICATION} />;
        }
    }

    return <Navigate to={ROUTES.SIGN_IN} />;
};

export default PrivateRoute;

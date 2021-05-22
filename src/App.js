import React, {useContext} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import SignInLayout from "./layout/SignInLayout";
import SignUpLayout from "./layout/SignUpLayout";
import PrivateRoute from "./components/PrivateRoute";
import SideBar from "./components/Sidebar";
import ProfileLayout from "./layout/ProfileLayout";
import {FirebaseContext} from "./context/FirebaseContext";
import TaskListLayout from "./layout/TaskListLayout";
import EmailVerificationLayout from "./layout/EmailVerificationLayout";

const showSideBar = (initialUserState) => {
    if (initialUserState) {
        return initialUserState.emailVerified === true ? <SideBar /> : <></>;
    }

    return <></>;
};

function App() {
    const firebaseContext = useContext(FirebaseContext);

    return (
        <div>
            <Router>
                    {showSideBar(firebaseContext.initialUserState)}
                        <Route exact path={ROUTES.SIGN_UP} component={SignUpLayout} />
                        <Route exact path={ROUTES.SIGN_IN} component={SignInLayout} />
                        <Route
                            exact
                            path={ROUTES.EMAIL_VERIFICATION}
                            component={EmailVerificationLayout}
                        />
                        <PrivateRoute
                            exact
                            path={ROUTES.HOME}
                            component={TaskListLayout}
                        />
                        <PrivateRoute
                            exact
                            path={ROUTES.LANDING}
                            component={TaskListLayout}
                        />
                        <PrivateRoute
                            exact
                            path={ROUTES.PROFILE}
                            component={ProfileLayout}
                        />
            </Router>
        </div>
    );
}

export default App;

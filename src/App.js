import React, { useContext } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import SignInLayout from "./views/Login/LoginPage";
import SignUpLayout from "./views/Signup/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import SideBar from "./components/Sidebar";
import ProfileLayout from "./layout/ProfileLayout";
import { FirebaseContext } from "./context/FirebaseContext";
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

    /* eslint-disable no-console */
    console.log("someThing");
    /* eslint-enable no-console */

    return (
        <Router>
            <Routes>
                {showSideBar(firebaseContext.initialUserState)}
                <Route exact path={ROUTES.SIGN_UP} element={<SignUpLayout />} />
                <Route exact path={ROUTES.SIGN_IN} element={<SignInLayout />} />
                <Route
                    exact
                    path={ROUTES.EMAIL_VERIFICATION}
                    component={EmailVerificationLayout}
                />
                <Route
                    exact
                    path={ROUTES.HOME}
                    element={<PrivateRoute Component={TaskListLayout} />}
                />
                <Route
                    exact
                    path={ROUTES.LANDING}
                    element={<PrivateRoute Component={TaskListLayout} />}
                />
                <Route
                    exact
                    path={ROUTES.PROFILE}
                    element={<PrivateRoute Component={ProfileLayout} />}
                />
            </Routes>
        </Router>
    );
}

export default App;

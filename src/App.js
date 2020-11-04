import React, {useContext} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import SignInLayout from "./layout/SignInLayout";
import SignUpLayout from "./layout/SignUpLayout";
import PrivateRoute from "./components/PrivateRoute";
import SideBar from "./components/Sidebar";
import ProfileLayout from "./layout/ProfileLayout";
import {FirebaseContext} from "./context/FirebaseContext";
import TaskCollectionLayout from "./layout/TaskCollectionLayout";
import EmailVerificationLayout from "./layout/EmailVerificationLayout";

const backgroundStyle = {
    display: "flex",
    flexDirection: "row"
}

const showSideBar = (initialUserState) => {
    if (initialUserState) {
        return (initialUserState.emailVerified === true) ? <SideBar/> : <></>
    }

    return <></>
}

function App() {
    const firebaseContext = useContext(FirebaseContext);

    return (
        <div>
            <Router>
                <div style={
                    backgroundStyle
                }>
                    {showSideBar(firebaseContext.initialUserState)}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%"
                    }}>
                        <Route exact path={ROUTES.SIGN_UP} component={SignUpLayout}/>
                        <Route exact path={ROUTES.SIGN_IN} component={SignInLayout}/>
                        <Route exact path={ROUTES.EMAIL_VERIFICATION} component={EmailVerificationLayout}/>
                        <PrivateRoute exact path={ROUTES.HOME} component={TaskCollectionLayout}/>
                        <PrivateRoute exact path={ROUTES.LANDING} component={TaskCollectionLayout}/>
                        <PrivateRoute exact path={ROUTES.PROFILE} component={ProfileLayout}/>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default App;

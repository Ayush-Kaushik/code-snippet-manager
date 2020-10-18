import React, {useContext} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import * as ROUTES from "./constants/routes";
import SignInLayout from "./layout/SignInLayout";
import SignUpLayout from "./layout/SignUpLayout";
import PrivateRoute from "./components/PrivateRoute";
import SideBar from "./components/Sidebar";
import ProfileLayout from "./layout/ProfileLayout";
import {FirebaseContext} from "./context/FirebaseContext";
import ToDoListLayout from "./layout/ToDoListLayout";

const backgroundStyle = {
    display: "flex",
    flexDirection: "row"
}

function App() {
    const firebaseContext = useContext(FirebaseContext);

    return (
        <div>
            <Router>
                <div style={
                    backgroundStyle
                }>
                    {(firebaseContext.initialUserState) ? <SideBar/> : <></>}

                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%"
                    }}>
                        <Route exact path={ROUTES.SIGN_UP} component={SignUpLayout}/>
                        <Route exact path={ROUTES.SIGN_IN} component={SignInLayout}/>
                        <PrivateRoute exact path={ROUTES.HOME} component={ToDoListLayout}/>
                        <PrivateRoute exact path={ROUTES.LANDING} component={ToDoListLayout}/>
                        <PrivateRoute exact path={ROUTES.PROFILE} component={ProfileLayout}/>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default App;

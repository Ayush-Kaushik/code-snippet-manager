import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {TextInputField, Button, Pane} from 'evergreen-ui';
import * as ROUTES from "../constants/routes";
import * as LABELS from "../constants/signuplabels";
import {FirebaseContext} from "../context/FirebaseContext";

const SignInForm = () => {
    const firebaseContext = useContext(FirebaseContext);
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await firebaseContext.signInWithEmailAndPassword(username, password);
            history.push(ROUTES.HOME);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Pane
            elevation={3}
            display={"flex"}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            flexWrap={"wrap"}
            padding={"1.5vw"}
            style={{
                backgroundColor: "#EDF0F2",
                borderRadius: "5px"
            }}
        >
            <img src={require('../assets/images/logo_new.png')} height={250} width={250} alt={LABELS.SIGN_IN}/>
            <TextInputField
                type="text"
                name={"username"}
                value={username}
                label={LABELS.USERNAME}
                onChange={e => {
                    setUsername(e.target.value)
                }}/>

            <TextInputField
                type="password"
                name={"password"}
                label={LABELS.PASSWORD}
                value={password}
                onChange={e => {
                    setPassword(e.target.value)
                }}/>

            {/*<div style={{*/}
            {/*    display: "flex"*/}
            {/*}}>*/}
                <Button
                    appearance="primary"
                    intent="success"
                    margin={"2px"}

                    width={"150px"}
                    style={{
                        display: "inline-block",
                        verticalAlign: "top"
                    }}
                    onClick={e => {
                        onSubmit(e)
                    }}>
                    {LABELS.SIGN_IN}
                </Button>

                <Button
                    appearance="primary"
                    margin={"5px"}
                    width={"150px"}
                    style={{
                        display: "inline-block",
                        verticalAlign: "top"
                    }}
                    onClick={() => history.push(ROUTES.SIGN_UP)}>
                    {LABELS.CREATE_ACCOUNT}
                </Button>
            {/*</div>*/}
        </Pane>
    )
}

export default SignInForm;
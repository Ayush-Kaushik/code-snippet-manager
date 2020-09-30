import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {TextInputField, Button, Pane} from 'evergreen-ui';
import {FirebaseContext} from "../context/FirebaseContext";
import * as ROUTES from "../constants/routes";
import * as LABELS from "../constants/signuplabels";


const SignUpForm = () => {

    const history = useHistory();
    const firebaseContext = useContext(FirebaseContext);

    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await firebaseContext.createUserWithEmailAndPassword(username, newPassword);
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
        >
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
                label={LABELS.NEW_PASSWORD}
                value={newPassword}
                onChange={e => {
                    setNewPassword(e.target.value)
                }}/>

            <TextInputField
                type="password"
                name={"password"}
                label={LABELS.CONFIRM_NEW_PASSWORD}
                value={confirmPassword}
                onChange={e => {
                    setConfirmPassword(e.target.value)
                }}/>

            <Button
                appearance="primary"
                intent="success"
                onClick={e => {
                onSubmit(e)
            }}>
                SignUp
            </Button>


            {firebaseContext.error ? <p>{JSON.stringify(firebaseContext.context)}</p> : <>{firebaseContext.context}</>}
        </Pane>
    )

}

export default SignUpForm;
import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {TextInputField, Button, Pane, InlineAlert} from 'evergreen-ui';
import {FirebaseContext} from "../context/FirebaseContext";
import * as ROUTES from "../constants/routes";
import * as LABELS from "../constants/signuplabels";
import * as EmailValidator from "email-validator";


const SignUpForm = () => {

    const history = useHistory();
    const firebaseContext = useContext(FirebaseContext);

    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({
        isError: null,
        username: "",
        newPassword: "",
        confirmPassword: ""
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        let formHasError = false;

        if (!EmailValidator.validate(username)) {
            formHasError = true;
            setErrors(prevState => {
                return {
                    ...prevState,
                    isError: true,
                    username: "Please provide a valid username"
                }
            });
        }

        if (newPassword.length <= 0) {
            formHasError = true;
            setErrors(prevState => {
                return {
                    ...prevState,
                    isError: true,
                    newPassword: "Please provide a password"
                }
            });
        }

        if (confirmPassword.length <= 0) {
            formHasError = true;
            setErrors(prevState => {
                return {
                    ...prevState,
                    isError: true,
                    confirmPassword: "Please provide a password"
                }
            });
        }

        if(newPassword !== confirmPassword) {
            formHasError = true;
            setErrors(prevState => {
                return {
                    ...prevState,
                    isError: true,
                    confirmPassword: "Passwords do not match"
                }
            });
        }

        if (!formHasError) {
            setErrors(prevState => (
                {
                    ...prevState,
                    isError: false
                }
            ))
        }
    }


    useEffect(() => {
        (async () => {
            if (errors.isError === false) {
                try {
                    await firebaseContext.createUserWithEmailAndPassword(username, newPassword);
                    history.push(ROUTES.HOME);
                } catch (error) {

                    switch (error.code) {
                        default:
                            setErrors((prevState) => (
                                {
                                    ...prevState,
                                    isError: true,
                                    username: error.message
                                }
                            ))
                            break;
                    }
                }
            }
        })();
    }, [errors.isError]);

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
            <img src={require('../assets/images/logo_new.png')} height={250} width={200} alt={LABELS.SIGN_UP}/>
            <TextInputField
                type="text"
                name={"username"}
                value={username}
                label={LABELS.USERNAME}
                onChange={e => {
                    setErrors(prevState => ({
                        ...prevState,
                        username: ""
                    }))
                    setUsername(e.target.value)
                }}/>

            {(errors.username.length > 0) ?
                <InlineAlert intent={"danger"}>{errors.username}</InlineAlert> : <></>}

            <TextInputField
                type="password"
                name={"password"}
                label={LABELS.NEW_PASSWORD}
                value={newPassword}
                onChange={e => {
                    setErrors(prevState => ({
                        ...prevState,
                        newPassword: ""
                    }))
                    setNewPassword(e.target.value)
                }}/>

            {(errors.newPassword.length > 0) ?
                <InlineAlert style={{
                    fontSize: "5px"
                }} intent={"danger"}>{errors.newPassword}</InlineAlert> : <></>}

            <TextInputField
                type="password"
                name={"password"}
                label={LABELS.CONFIRM_NEW_PASSWORD}
                value={confirmPassword}
                onChange={e => {
                    setErrors(prevState => ({
                        ...prevState,
                        confirmPassword: ""
                    }))
                    setConfirmPassword(e.target.value)
                }}/>

            {(errors.confirmPassword.length > 0) ?
                <InlineAlert style={{
                    fontSize: "5px"
                }} intent={"danger"}>{errors.confirmPassword}</InlineAlert> : <></>}

            <Button
                appearance="primary"
                intent="success"
                onClick={e => {
                    onSubmit(e)
                }}>
                SignUp
            </Button>
        </Pane>
    )
}

export default SignUpForm;
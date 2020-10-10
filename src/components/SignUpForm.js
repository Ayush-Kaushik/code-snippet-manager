import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {TextInputField, Button, Pane, InlineAlert} from 'evergreen-ui';
import {FirebaseContext} from "../context/FirebaseContext";
import * as ROUTES from "../constants/routes";
import * as LABELS from "../constants/labels";
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

        if (newPassword !== confirmPassword) {
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
                validationMessage={(errors.username > 0) ? errors.username : false}
                onChange={e => {
                    setErrors(prevState => ({
                        ...prevState,
                        username: ""
                    }))
                    setUsername(e.target.value)
                }}/>

            <TextInputField
                type="password"
                name={"password"}
                label={LABELS.NEW_PASSWORD}
                value={newPassword}
                validationMessage={(errors.newPassword > 0) ? errors.newPassword : false}
                onChange={e => {
                    setErrors(prevState => ({
                        ...prevState,
                        newPassword: ""
                    }))
                    setNewPassword(e.target.value)
                }}/>

            <TextInputField
                type="password"
                name={"password"}
                label={LABELS.CONFIRM_NEW_PASSWORD}
                value={confirmPassword}
                validationMessage={(errors.confirmPassword > 0) ? errors.confirmPassword : false}
                onChange={e => {
                    setErrors(prevState => ({
                        ...prevState,
                        confirmPassword: ""
                    }))
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
        </Pane>
    )
}

export default SignUpForm;
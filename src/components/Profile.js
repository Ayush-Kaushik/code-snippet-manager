import React, {useContext, useEffect, useState} from "react";
import * as LABELS from "../constants/labels";
import * as ROUTES from "../constants/routes";
import {Button, TextInputField} from "evergreen-ui";
import * as EmailValidator from "email-validator";
import {FirebaseContext} from "../context/FirebaseContext";
import {useHistory} from "react-router-dom";

const Profile = () => {
    const firebaseContext = useContext(FirebaseContext);
    const history = useHistory();
    const [username, setUsername] = useState(firebaseContext.initialUserState.email);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({
        isError: null,
        username: "",
        newPassword: "",
        confirmPassword: ""
    });

    const onSubmit = (e) => {
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

        if (newPassword !== confirmPassword) {
            console.log("This should be true");
            formHasError = true;
            setErrors(prevState => {

                console.log("print this out");

                return {
                    ...prevState,
                    isError: true,
                    confirmPassword: "Passwords do not match"
                }
            });
        }

        if (!formHasError) {
            console.log("form has error");
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
            console.log("This is called");

            if (errors.isError === false) {

                const promises = [];
                if (username !== firebaseContext.initialUserState.email) {
                    promises.push(firebaseContext.updateEmail(username));
                }

                if (newPassword.length > 0) {
                    promises.push(firebaseContext.updatePassword(newPassword));
                }

                Promise.all(promises).then(() => {
                    history.push(ROUTES.HOME);
                }).catch((error) => {

                    setErrors((prevState) => (
                        {
                            ...prevState,
                            isError: true,
                            username: error.message
                        }
                    ))
                })
            }
        })();
    }, [errors.isError]);

    return (
        <div style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#EDF0F2",
        }}>
            <div
                style={{
                    marginTop: "10%",
                    width: "40%",
                    marginRight: "30%",
                    marginLeft: "30%"
                }}>
                <TextInputField
                    type="text"
                    name={"username"}
                    value={username}
                    label={LABELS.USERNAME}
                    validationMessage={(errors.username.length > 0) ? errors.username : false}
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
                    placeholder={"leave blank to keep the same"}
                    value={newPassword}
                    validationMessage={(errors.newPassword.length > 0) ? errors.newPassword : false}
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
                    placeholder={"leave blank to keep the same"}
                    label={LABELS.CONFIRM_NEW_PASSWORD}
                    value={confirmPassword}
                    validationMessage={(errors.confirmPassword.length > 0) ? errors.confirmPassword : false}
                    onChange={e => {
                        setErrors(prevState => ({
                            ...prevState,
                            confirmPassword: ""
                        }))
                        setConfirmPassword(e.target.value)
                    }}
                />

                <Button
                    appearance="primary"
                    intent="success"
                    onClick={e => {
                        onSubmit(e)
                    }}>
                    Update
                </Button>
            </div>
        </div>
    )
};

export default Profile;
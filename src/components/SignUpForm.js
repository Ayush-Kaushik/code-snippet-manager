import React, { useContext, useState } from "react";
import Joi from 'joi';
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../context/FirebaseContext";
import * as ROUTES from "../constants/routes";
import * as LABELS from "../constants/labels";

const signUpSchema = Joi.object().keys({
    username: Joi.string().email({ tlds: { allow: false } }).required(),
    newPassword: Joi.string().required().min(5),
    confirmNewPassword: Joi.string().required().min(5)
});

const SignUpForm = () => {
    const history = useHistory();
    const firebaseContext = useContext(FirebaseContext);

    const [creds, setCreds] = useState({
        username: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const [metaData, setMetaData] = useState({
        isError: false,
        errors: []
    })

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            let valid = signUpSchema.validate(creds, { abortEarly: false });
            if (valid.error) {
                console.log(valid);
                setMetaData((prevState) => ({
                    ...prevState,
                    isError: true,
                    errors: valid.error.details
                }));
            } else {
                await firebaseContext.createUserWithEmailAndPassword(
                    creds.username,
                    creds.newPassword
                );

                if (!firebaseContext.initialUserState.email_verified) {
                    history.push(ROUTES.EMAIL_VERIFICATION);
                }

                history.push(ROUTES.HOME);
            }
        } catch (error) {
            switch (error.code) {
                default:
                    setMetaData((prevState) => ({
                        ...prevState,
                        isError: true,
                        errors: error.message,
                    }));
                    break;
            }
        }
    };

    return (
        <div className="form-layout">
            <div>{metaData.errors.length !== 0 ? JSON.stringify(metaData.errors) : false}</div>

            <label htmlFor="username">{LABELS.USERNAME}</label>
            <input
                type="text"
                name={"username"}
                value={creds.username}
                label={LABELS.USERNAME}
                onChange={(e) => {
                    let userNameInput = e.target.value;
                    setCreds((prevState) => ({
                        ...prevState,
                        username: userNameInput,
                    }));
                }}
            />


            <label htmlFor="password">{LABELS.NEW_PASSWORD}</label>
            <input
                type="password"
                name={"password"}
                label={LABELS.NEW_PASSWORD}
                value={creds.newPassword}
                onChange={(e) => {
                    let newPassWordInput = e.target.value;
                    setCreds((prevState) => ({
                        ...prevState,
                        newPassword: newPassWordInput,
                    }));
                }}
            />

            <label htmlFor="confirmPassword">{LABELS.CONFIRM_NEW_PASSWORD}</label>
            <input
                type="password"
                name={"confirmPassword"}
                label={LABELS.CONFIRM_NEW_PASSWORD}
                value={creds.confirmPassword}
                onChange={(e) => {
                    let confirmPasswordInput = e.target.value;
                    setCreds((prevState) => ({
                        ...prevState,
                        confirmNewPassword: confirmPasswordInput
                    }));
                }}
            />

            <button
                appearance="primary"
                intent="success"
                onClick={(e) => {
                    onSubmit(e);
                }}
            >
                SignUp
            </button>

            <button
                onClick={() => history.push(ROUTES.SIGN_IN)}
            >
                {LABELS.ALREADY_A_USER}
            </button>
        </div>
    );
};

export default SignUpForm;

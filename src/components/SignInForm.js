import React, { useState, useContext, useEffect } from "react";
import Joi from 'joi';
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { FirebaseContext } from "../context/FirebaseContext";
import * as LABELS from "../constants/labels";
import "../App.css";

const signInSchema = Joi.object().keys({
    username: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().required().min(8),
    isError: Joi.boolean().required(),
    errors: Joi.array()
});

const SignInForm = () => {
    const firebaseContext = useContext(FirebaseContext);
    const history = useHistory();

    const [creds, setCreds] = useState({
        username: "",
        password: "",
        isError: false,
        errors: []
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            let valid = signInSchema.validate(creds, { abortEarly: false });

            if (valid.error) {
                setCreds((prevState) => ({
                    ...prevState,
                    isError: true,
                    errors: valid.error.details
                }));
            } else {
                const authState = await firebaseContext.signInWithEmailAndPassword(
                    creds.username,
                    creds.password
                );

                console.log(firebaseContext.initialUserState);
                if (authState.user) {
                    if (authState.user.emailVerified) {
                        history.push(ROUTES.HOME);
                    } else {
                        history.push(ROUTES.EMAIL_VERIFICATION);
                    }
                } else {
                    history.push(ROUTES.SIGN_IN);
                }
            }
        } catch (error) {
            console.log(error);
            switch (error.code) {
                default:
                    setCreds((prevState) => ({
                        ...prevState,
                        isError: true,
                        errors: error.message,
                    }));
                    break;
            }
        }
    }


    return (
        <div className="form-layout">
            <div>{creds.errors.length !== 0 ? JSON.stringify(creds.errors) : false}</div>

            <label htmlFor="username">{LABELS.USERNAME}</label>
            <input
                type="text"
                name={"username"}
                value={creds.username}
                onChange={(e) => {
                    let newInput = e.target.value;
                    setCreds((prevState) => ({
                        ...prevState,
                        username: newInput
                    }
                    ));
                }}
            />

            <label htmlFor="password">{LABELS.PASSWORD}</label>
            <input
                type={"password"}
                name={"password"}
                value={creds.password}
                onChange={(e) => {
                    let newInput = e.target.value;
                    setCreds((prevState) => ({
                        ...prevState,
                        password: newInput
                    }));
                }}
            />

            <button
                onClick={(e) => {
                    onSubmit(e);
                }}
            >
                {LABELS.SIGN_IN}
            </button>

            <button
                onClick={() => history.push(ROUTES.SIGN_UP)}
            >
                {LABELS.CREATE_ACCOUNT}
            </button>
        </div>
    );

}

export default SignInForm;

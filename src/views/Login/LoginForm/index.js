import React, { useState, useContext, useEffect } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";
import { FirebaseContext } from "../../../context/FirebaseContext";
import * as LABELS from "../../../constants/labels";
import "./LoginForm.styles.css";

const signInSchema = Joi.object().keys({
    username: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    password: Joi.string().required(),
    isError: Joi.boolean().required(),
    errors: Joi.array()
});

const SignInForm = () => {
    /* eslint-disable no-console */
    console.log("Login Form");
    /* eslint-enable no-console */

    const firebaseContext = useContext(FirebaseContext);
    const navigate = useNavigate();

    const [creds, setCreds] = useState({
        username: "",
        password: "",
        isError: false,
        errors: []
    });

    useEffect(() => {
        if (firebaseContext.initialUserState) {
            if (firebaseContext.initialUserState.emailVerified) {
                navigate(ROUTES.HOME);
            }
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            let valid = signInSchema.validate(creds, { abortEarly: false });
            if (valid.error) {
                setCreds((prevState) => ({
                    ...prevState,
                    isError: true,
                    errors: valid.error.details.map((item) => item.message)
                }));
            } else {
                const authState = await firebaseContext.signInWithEmailAndPassword(
                    creds.username,
                    creds.password
                );

                if (authState.user) {
                    if (authState.user.emailVerified) {
                        navigate(ROUTES.HOME);
                    } else {
                        navigate(ROUTES.EMAIL_VERIFICATION);
                    }
                } else {
                    navigate(ROUTES.SIGN_IN);
                }
            }
        } catch (error) {
            setCreds((prevState) => ({
                ...prevState,
                isError: true,
                errors: [error.message]
            }));
        }
    };

    const printErrors = () => {
        return creds.errors.map((item) => {
            return <p>{item}</p>;
        });
    };

    return (
        <div className="form-layout">
            <div>
                <img
                    src={require("../../../assets/checkmark.png")}
                    height={150}
                    width={150}
                    alt={LABELS.SIGN_IN}
                />
                <img
                    src={require("../../../assets/write.png")}
                    height={150}
                    width={150}
                    alt={LABELS.SIGN_IN}
                />
            </div>

            <div className="error-layout"> {printErrors()} </div>

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
                    }));
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

            <div>
                <button
                    className="success-button"
                    onClick={(e) => {
                        onSubmit(e);
                    }}
                >
                    {LABELS.SIGN_IN}
                </button>

                <button
                    className="create-account-button"
                    onClick={() => navigate(ROUTES.SIGN_UP)}
                >
                    {LABELS.CREATE_ACCOUNT}
                </button>
            </div>
        </div>
    );
};

export default SignInForm;

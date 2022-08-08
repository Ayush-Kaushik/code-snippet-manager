import React, { useContext, useState, useEffect } from "react";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../../context/FirebaseContext";
import * as ROUTES from "../../../constants/routes";
import * as LABELS from "../../../constants/labels";
import { FireStoreContext } from "../../../context/FireStoreContext";

const signUpSchema = Joi.object().keys({
    username: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    newPassword: Joi.string().required().min(5),
    confirmNewPassword: Joi.string().required().min(5)
});

const SignUpForm = () => {
    const navigate = useNavigate();
    const firebaseContext = useContext(FirebaseContext);
    const firestoreContext = useContext(FireStoreContext);

    useEffect(() => {
        if (firebaseContext.initialUserState) {
            if (firebaseContext.initialUserState.emailVerified) {
                navigate(ROUTES.HOME);
            }
        }
    }, []);

    const [creds, setCreds] = useState({
        username: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const [metaData, setMetaData] = useState({
        isError: false,
        errors: []
    });

    const printErrors = () => {
        if (metaData.errors) {
            return metaData.errors.map((item) => {
                return <p>{item}</p>;
            });
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            let valid = signUpSchema.validate(creds, { abortEarly: false });
            if (valid.error) {
                setMetaData((prevState) => ({
                    ...prevState,
                    isError: true,
                    errors: valid.error.details.map((item) => item.message)
                }));
            } else {
                await firebaseContext.createUserWithEmailAndPassword(
                    creds.username,
                    creds.newPassword
                );

                await firestoreContext.initializeCollection(creds.username);

                if (!firebaseContext.initialUserState.email_verified) {
                    navigate(ROUTES.EMAIL_VERIFICATION);
                }

                navigate(ROUTES.HOME);
            }
        } catch (error) {
            setMetaData((prevState) => ({
                ...prevState,
                isError: true,
                errors: error.message
            }));
        }
    };

    return (
        <div className="form-layout">
            <div>
                <img
                    src={require("../../../assets/write.png")}
                    height={150}
                    width={150}
                    alt={LABELS.SIGN_IN}
                />
                <img
                    src={require("../../../assets/checkmark.png")}
                    height={150}
                    width={150}
                    alt={LABELS.SIGN_IN}
                />
            </div>

            <div className="error-layout">{printErrors()}</div>

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
                        username: userNameInput
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
                        newPassword: newPassWordInput
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

            <div>
                <button
                    className="success-button"
                    onClick={(e) => {
                        onSubmit(e);
                    }}
                >
                    {"SignUp"}
                </button>

                <button
                    className="create-account-button"
                    onClick={() => navigate(ROUTES.SIGN_IN)}
                >
                    {LABELS.ALREADY_A_USER}
                </button>
            </div>
        </div>
    );
};

export default SignUpForm;

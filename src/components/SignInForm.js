import React, {useState, useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import {TextInputField, Button, Pane} from "evergreen-ui";
import * as ROUTES from "../constants/routes";
import * as LABELS from "../constants/labels";
import {FirebaseContext} from "../context/FirebaseContext";
import * as EmailValidator from "email-validator";

const SignInForm = () => {
    const firebaseContext = useContext(FirebaseContext);
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        isError: null,
        username: "",
        password: "",
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        let formHasError = false;

        if (!EmailValidator.validate(username)) {
            formHasError = true;
            setErrors((prevState) => {
                return {
                    ...prevState,
                    isError: true,
                    username: "Please provide a valid username",
                };
            });
        }

        if (password.length <= 0) {
            formHasError = true;
            setErrors((prevState) => {
                return {
                    ...prevState,
                    isError: true,
                    password: "Please provide a password",
                };
            });
        }

        if (!formHasError) {
            setErrors((prevState) => ({
                ...prevState,
                isError: false,
            }));
        }
    };

    useEffect(() => {
        (async () => {
            if (errors.isError === false) {
                try {
                    const authState = await firebaseContext.signInWithEmailAndPassword(
                        username,
                        password
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
                } catch (error) {
                    switch (error.code) {
                        case "auth/wrong-password":
                            setErrors((prevState) => ({
                                ...prevState,
                                isError: true,
                                password: error.message,
                            }));
                            break;

                        case "auth/user-not-found":
                            setErrors((prevState) => ({
                                ...prevState,
                                isError: true,
                                username: error.message,
                            }));
                            break;

                        default:
                            setErrors((prevState) => ({
                                ...prevState,
                                isError: true,
                                username: error.message,
                            }));
                            break;
                    }
                }
            }
        })();
    }, [errors.isError, firebaseContext, history, password, username]);

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
                borderRadius: "5px",
            }}
        >
            <img
                src={require("../assets/images/logo_new.png")}
                height={250}
                width={250}
                alt={LABELS.SIGN_IN}
            />
            <TextInputField
                type="text"
                name={"username"}
                value={username}
                label={LABELS.USERNAME}
                isInvalid={errors.username.length > 0}
                validationMessage={errors.username.length > 0 ? errors.username : false}
                onChange={(e) => {
                    setErrors((prevState) => ({
                        ...prevState,
                        username: "",
                    }));
                    setUsername(e.target.value);
                }}
            />

            <TextInputField
                type="password"
                name={"password"}
                label={LABELS.PASSWORD}
                isInvalid={errors.password.length > 0}
                validationMessage={errors.password.length > 0 ? errors.password : false}
                value={password}
                onChange={(e) => {
                    setErrors((prevState) => ({
                        ...prevState,
                        password: "",
                    }));
                    setPassword(e.target.value);
                }}
            />

            <Button
                appearance="primary"
                intent="success"
                margin={"2px"}
                width={"150px"}
                style={{
                    display: "inline-block",
                    verticalAlign: "top",
                }}
                onClick={(e) => {
                    onSubmit(e);
                }}
            >
                {LABELS.SIGN_IN}
            </Button>

            <Button
                appearance="primary"
                margin={"5px"}
                width={"150px"}
                onClick={() => history.push(ROUTES.SIGN_UP)}
            >
                {LABELS.CREATE_ACCOUNT}
            </Button>
        </Pane>
    );
};

export default SignInForm;

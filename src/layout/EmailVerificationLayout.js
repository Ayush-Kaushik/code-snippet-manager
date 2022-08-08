import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../context/FirebaseContext";
import Emoji from "../components/Emoji";
import * as ROUTES from "../constants/routes";

const EmailVerificationLayout = () => {
    const firebaseContext = useContext(FirebaseContext);
    const navigate = useNavigate();
    const [sentEmail, setSentEmail] = useState(false);

    useEffect(() => {
        if (firebaseContext.initialUserState) {
            if (firebaseContext.initialUserState.emailVerified) {
                navigate(ROUTES.HOME);
            }
        }
    }, []);

    const successVerification = () => {
        return (
            <button
                className="success-button"
                onClick={(e) => {
                    navigate(ROUTES.HOME);
                }}
            >
                {"Let's get some work done!"}
            </button>
        );
    };

    const askVerification = () => {
        return (
            <div>
                <div>{"Verify your email address"}</div>
                <div>
                    {"Please confirm that you want to use this as your Get it done account." +
                        " Once its done, you'll be able to get your work done!"}
                </div>

                {sentEmail ? (
                    <div>{"Check your email, verify and refresh"}</div>
                ) : (
                    <button
                        className="button success-button"
                        onClick={(e) => {
                            firebaseContext
                                .sendVerificationEmail()
                                .then((result) => {
                                    setSentEmail(true);
                                })
                                .catch((error) => {});
                        }}
                    >
                        {"Send Verification"}
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="emailverification-layout">
            <div>
                <div>
                    Get it Done <Emoji symbol={"🔥"} label={"fire"} />
                </div>
            </div>

            {firebaseContext.initialUserState.emailVerified
                ? successVerification
                : askVerification(firebaseContext)}

            <button
                className="button fail-button"
                onClick={(e) => {
                    firebaseContext.signOut();
                    navigate(ROUTES.SIGN_IN);
                }}
            >
                {"Cancel"}
            </button>
        </div>
    );
};

export default EmailVerificationLayout;

import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {FirebaseContext} from "../context/FirebaseContext";
import Emoji from "../components/Emoji";
import * as ROUTES from "../constants/routes";

const EmailVerificationLayout = () => {
    const firebaseContext = useContext(FirebaseContext);
    const history = useHistory();
    const [sentEmail, setSentEmail] = useState(false);

    useEffect(() => {
        console.log(firebaseContext.initialUserState);
    })

    const successVerification = () => {
        return (
            <button
                onClick={(e) => {
                    history.push(ROUTES.HOME);
                }}
            >
                {"Let's get some work done!"}
            </button>
        );
    };

    const askVerification = () => {
        return (
            <div>
                <div>
                    {"Verify your email address"}
                </div>
                <div
                    style={{
                        textAlign: "center",
                    }}
                >
                    {"Please confirm that you want to use this as your Get it done account." +
                        " Once its done, you'll be able to get your work done!"}
                </div>

                {sentEmail ? (
                    <div>
                        {"Check your email, verify and refresh"}
                    </div>
                ) : (
                    <button
                        onClick={(e) => {
                            firebaseContext
                                .sendVerificationEmail()
                                .then((result) => {
                                    console.log(result);
                                    setSentEmail(true);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }}
                    >
                        {"Send Verification"}
                    </button>
                )}
            </div>
        );
    };

    return (
        <div>
            <div>
                <div>
                    Get it Done <Emoji symbol={"🔥"} label={"fire"} />
                </div>
            </div>

            {firebaseContext.initialUserState.emailVerified
                ? successVerification
                : askVerification(firebaseContext)}

            <button
                onClick={(e) => {
                    firebaseContext.signOut();
                    history.push(ROUTES.SIGN_IN);
                }}
            >
                {"Cancel"}
            </button>
        </div>
    );
};

export default EmailVerificationLayout;

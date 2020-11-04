import React, {useContext, useState} from 'react';
import {Button, Paragraph, Heading, Pre} from 'evergreen-ui';
import {FirebaseContext} from "../context/FirebaseContext";
import {useHistory} from "react-router-dom";
import * as ROUTES from "../constants/routes";
import Emoji from "../components/Emoji";

const EmailVerificationLayout = () => {
    const firebaseContext = useContext(FirebaseContext);
    const history = useHistory();
    const [sentEmail, setSentEmail] = useState(false);

    const successVerification = () => {

        return (
            <Button
                appearance="primary"
                intent="success"
                onClick={e => {
                    history.push(ROUTES.HOME);
                }}>
                {"Let's get some work done!"}
            </Button>
        )
    }

    const askVerification = () => {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: "5%",
                marginLeft: "5%"
            }}>
                <Heading size={600}
                         style={{
                             marginBottom: "2%"
                         }}
                >{"Verify your email address"}</Heading>
                <Paragraph style={{
                    textAlign: "center"
                }}>{"Please confirm that you want to use this as your Get it done account." +
                " Once its done, you'll be able to get your work done!"}</Paragraph>

                {sentEmail ? <Paragraph style={{
                    marginBottom: "5%"
                }}>{"Check your email, verify and refresh"}</Paragraph> : <Button
                    appearance="primary"
                    intent="success"
                    style={{
                        marginTop: "5%",
                        marginBottom: "2%",
                        width: "150px",
                        display: "inline-block",
                        verticalAlign: "top"
                    }}
                    onClick={e => {
                        firebaseContext.sendVerificationEmail().then(result => {
                            console.log(result);
                            setSentEmail(true);
                        }).catch(error => {
                            console.log(error);
                        });
                    }}>
                    {"Send Verification"}
                </Button>}

            </div>
        )
    }


    return (
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20%"
        }}>
            <div style={{
                marginBottom: "5%"
            }}>
                <Heading size={900}>Get it Done <Emoji symbol={"🔥"} label={"fire"}/></Heading>
            </div>
            {firebaseContext.initialUserState.emailVerified ? successVerification : askVerification(firebaseContext)}

            <Button
                style={{
                    width: "150px",
                    display: "inline-block",
                    verticalAlign: "top"
                }}
                onClick={e => {
                    firebaseContext.signOut();
                    history.push(ROUTES.SIGN_IN);
                }}>
                {"Cancel"}
            </Button>
        </div>
    )
}

export default EmailVerificationLayout;
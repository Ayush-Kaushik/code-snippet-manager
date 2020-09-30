import React from 'react';
import SignInForm from "../components/SignInForm";
import * as LABELS from "../constants/signuplabels";

const SignInLayout = () => {
    return (
        <div style={{
            margin: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <img src={require('../assets/images/logo_new.png')} height={250} width={250} alt={LABELS.SIGN_IN}/>
            <SignInForm/>
        </div>
    )
}

export default SignInLayout;
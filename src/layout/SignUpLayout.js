import React from 'react';
import SignUpForm from "../components/SignUpForm";

const SignUpLayout = () => {
    return (
        <div style={{
            margin: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <img src={require('../assets/images/logo.png')} height={250} width={200}/>
            <SignUpForm/>
        </div>
    )
}

export default SignUpLayout;
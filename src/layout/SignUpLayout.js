import React from "react";
import SignUpForm from "../components/SignUpForm";

const SignUpLayout = () => {
    return (
        <div
            style={{
                backgroundSize: "cover",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "5%",
            }}
        >
            <SignUpForm />
        </div>
    );
};

export default SignUpLayout;

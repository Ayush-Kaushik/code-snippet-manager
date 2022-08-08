import React from "react";
import SignInForm from "../LoginForm";

const SignInLayout = () => {
    /* eslint-disable no-console */
    console.log("Login Form");
    /* eslint-enable no-console */
    return (
        <div className="form-external-layout">
            <SignInForm />
        </div>
    );
};

export default SignInLayout;

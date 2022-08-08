import React from "react";
import SignUpForm from "../SignupForm/SignUpForm";

const SignUpLayout = () => {
    /* eslint-disable no-console */
    console.log("Signup Layout");
    /* eslint-enable no-console */

    return (
        <div className="form-external-layout">
            <SignUpForm />
        </div>
    );
};

export default SignUpLayout;

import React from 'react';
import SignUpForm from "../components/SignUpForm";
import * as LABELS from "../constants/signuplabels";
import PeopleWorking from "../assets/images/people_working_signup.jpg";

const SignUpLayout = () => {
    return (
        <div style={{
            backgroundImage: `url(${PeopleWorking})`,
            backgroundSize: 'cover',
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <SignUpForm/>
        </div>
    )
}

export default SignUpLayout;
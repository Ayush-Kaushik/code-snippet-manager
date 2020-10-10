import React from 'react';
import SignInForm from "../components/SignInForm";
import PeopleWorking from "../assets/images/people_working.jpg";

const SignInLayout = () => {
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

            <SignInForm/>
        </div>
    )
}

export default SignInLayout;
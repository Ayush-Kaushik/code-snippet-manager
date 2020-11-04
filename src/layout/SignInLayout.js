import React from 'react';
import SignInForm from "../components/SignInForm";
import PeopleWorking from "../assets/images/people_working.jpg";

const SignInLayout = () => {
    return (
        <div style={{
            backgroundSize: 'cover',
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5%"
        }}>

            <SignInForm/>
        </div>
    )
}

export default SignInLayout;
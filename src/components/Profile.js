import React, { useContext, useState } from "react";
import * as LABELS from "../constants/labels";
import * as ROUTES from "../constants/routes";
import { FirebaseContext } from "../context/FirebaseContext";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const firebaseContext = useContext(FirebaseContext);
    const history = useHistory();

    const [creds, setCreds] = useState({
        username: useState(firebaseContext.initialUserState.email),
        newPassword: "",
        confirmPassword: ""
    });

    const [metaData, setMetaData] = useState({
        errors: [],
        isError: false
    })

    const onSubmit = (e) => {
        e.preventDefault();

        const promises = [];

        if (newPassword.length > 0) {
            promises.push(firebaseContext.updatePassword(newPassword));
        }

        Promise.all(promises)
            .then(() => {
                history.push(ROUTES.HOME);
            })
            .catch((error) => {
                setMetaData((prevState) => ({
                    ...prevState,
                    isError: true,
                    errors: error,
                }));
            });
    };

    return (
        <div className="form-layout">
            <label>{LABELS.USERNAME}</label>
            <input
                readOnly
                type="text"
                name={"username"}
                value={creds.username}
            />

            <label htmlFor={"password"}>{LABELS.NEW_PASSWORD}</label>
            <input
                type="password"
                name={"password"}
                placeholder={"leave blank to keep the same"}
                value={creds.newPassword}
                onChange={(e) => {
                    let newPasswordInput = e.target.value;
                    setCreds((prevState) => ({
                        ...prevState,
                        newPassword: newPasswordInput
                    }));
                }}
            />

            <label>{LABELS.CONFIRM_NEW_PASSWORD}</label>
            <input
                type="password"
                name={"password"}
                placeholder={"leave blank to keep the same"}
                value={creds.confirmPassword}
                onChange={(e) => {
                    let newPasswordInput = e.target.value;
                    setCreds((prevState) => ({
                        ...prevState,
                        confirmPassword: newPasswordInput
                    }));
                }}
            />

            <button
                className="success-button"
                onClick={(e) => {
                    onSubmit(e);
                }}
            >
                Update
                </button>
        </div>
    );
};

export default Profile;

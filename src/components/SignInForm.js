import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {TextInputField, Button, Pane} from 'evergreen-ui';
import * as ROUTES from "../constants/routes";
import * as LABELS from "../constants/signuplabels";


const SignInForm = () => {

    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        try {

            history.push(ROUTES.HOME);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Pane
            elevation={3}
            display={"flex"}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            flexWrap={"wrap"}
            padding={"1.5vw"}
        >
            <TextInputField
                type="text"
                name={"username"}
                value={username}
                label={LABELS.USERNAME}
                onChange={e => {
                    setUsername(e.target.value)
                }}/>

            <TextInputField
                type="password"
                name={"password"}
                label={LABELS.PASSWORD}
                value={password}
                onChange={e => {
                    setPassword(e.target.value)
                }}/>

            <Button
                appearance="primary"
                intent="success"
                onClick={e => {
                    onSubmit(e)
                }}>
                {LABELS.SIGN_IN}
            </Button>
        </Pane>
    )

}

export default SignInForm;
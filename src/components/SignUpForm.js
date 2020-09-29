import React, {useContext, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {TextInput, Button} from 'evergreen-ui';
import {FirebaseContext} from "../context/FirebaseContext";
import * as ROUTES from "../constants/routes";


const SignUpForm = () => {

    const history = useHistory();
    const firebaseContext = useContext(FirebaseContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await firebaseContext.createUserWithEmailAndPassword(username, password);
            history.push(ROUTES.HOME);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={e => {
                onSubmit(e)
            }}>
                <TextInput
                    type="text"
                    name={"username"}
                    value={username}
                    onChange={e => {
                        setUsername(e.target.value)
                    }}/>

                <TextInput
                    type="password"
                    name={"password"}
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value)
                    }}/>

                <Button type="submit">
                    Submit
                </Button>
            </form>

            {firebaseContext.error ? <p>{JSON.stringify(firebaseContext.context)}</p> : <>{firebaseContext.context}</>}
        </div>
    )

}

export default SignUpForm;
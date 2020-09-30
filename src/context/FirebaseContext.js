import React, {createContext, useEffect, useState} from 'react';
import {auth} from "../components/Firebase";
import {Spinner, Pane} from "evergreen-ui";

export const FirebaseContext = createContext(null);

export const FirebaseProvider = (props) => {
    const [initialUser, setInitialUser] = useState(null);
    const [pending, setPending] = useState(true);
    const [error, setError] = useState(null);

    const createUserWithEmailAndPassword = async (email, password) => {
        const authUser = await auth.createUserWithEmailAndPassword(email, password);
        // setInitialUserState(authUser);
    }

    const signInWithEmailAndPassword = async (email, password) => {
        const authUser = await auth.signInWithEmailAndPassword(email, password);
        console.log(authUser);
        setInitialUser(authUser);
    }

    const signOut = () => auth.signOut();

    useEffect(() => {
        auth.onAuthStateChanged((userAuth) => {
            console.log(userAuth);
            setInitialUser(userAuth);
            setPending(false);
        });
    }, []);

    if (pending) {
        return (
            <Pane style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "400"
            }}>
                <Spinner/>
            </Pane>
        )
    }

    return (
        <FirebaseContext.Provider value={{
            initialUserState: initialUser,
            error: error,
            createUserWithEmailAndPassword: createUserWithEmailAndPassword,
            signInWithEmailAndPassword: signInWithEmailAndPassword,
            signOut: signOut
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
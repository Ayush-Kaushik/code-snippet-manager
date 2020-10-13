import React, {createContext, useEffect, useState} from 'react';
import {auth} from "../components/Firebase";
import {Spinner, Pane} from "evergreen-ui";

export const FirebaseContext = createContext(null);

export const FirebaseProvider = (props) => {
    const [initialUser, setInitialUser] = useState(null);
    const [pending, setPending] = useState(true);

    const createUserWithEmailAndPassword = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    const signInWithEmailAndPassword = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const updatePassword = (password) => {
       return auth.currentUser.updatePassword(password);
    }

    const updateEmail = (email) => {
        return auth.currentUser.updateEmail(email);
    }


    const signOut = () => auth.signOut();

    useEffect(() => {
        return auth.onAuthStateChanged((userAuth) => {
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
                height: "100vh"
            }}>
                <Spinner size={40}/>
            </Pane>
        )
    }

    return (
        <FirebaseContext.Provider value={{
            initialUserState: initialUser,
            createUserWithEmailAndPassword: createUserWithEmailAndPassword,
            signInWithEmailAndPassword: signInWithEmailAndPassword,
            signOut: signOut,
            updateEmail: updateEmail,
            updatePassword: updatePassword
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
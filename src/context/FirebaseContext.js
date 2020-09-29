import React, {createContext, useEffect, useState} from 'react';
import {auth} from "../components/Firebase";

export const FirebaseContext = createContext(null);

export const FirebaseProvider = (props) => {

    const [initialUserState, setInitialUserState] = useState({
        user: null
    });

    const [error, setError] = useState(null);

    const createUserWithEmailAndPassword = async (email, password) => {
        const authUser = await auth.createUserWithEmailAndPassword(email, password);
        console.log(authUser);
        setInitialUserState(authUser);
    }

    const signInWithEmailAndPassword = (email, password) => {
        auth.signInWithEmailAndPassword(email, password);
    }

    const passwordReset = email => auth.sendPasswordResetEmail(email);

    const passwordUpdate = password => {
        auth.currentUser.updatePassword(password)
    }

    const signOut = () => auth.signOut();

    useEffect(() => {
        auth.onAuthStateChanged((userAuth) => {
            setInitialUserState({
                user: userAuth
            });
        });
    }, [initialUserState]);

    return (
        <FirebaseContext.Provider value={{
            initialUserState: initialUserState,
            error: error,
            createUserWithEmailAndPassword: createUserWithEmailAndPassword,
            signInWithEmailAndPassword: signInWithEmailAndPassword,
            signOut: signOut,
            passwordReset: passwordReset,
            passwordUpdate: passwordUpdate
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
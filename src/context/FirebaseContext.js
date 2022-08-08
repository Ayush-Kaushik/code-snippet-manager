import React, { createContext, useEffect, useState } from "react";
import { auth } from "../components/Firebase";

export const FirebaseContext = createContext(null);

export const FirebaseProvider = (props) => {
    const [initialUser, setInitialUser] = useState(null);
    const [pending, setPending] = useState(true);

    const createUserWithEmailAndPassword = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    const signInWithEmailAndPassword = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    const sendVerificationEmail = () => {
        return auth.currentUser.sendEmailVerification();
    };

    const updatePassword = (password) => {
        return auth.currentUser.updatePassword(password);
    };

    const updateEmail = (email) => {
        return auth.currentUser.updateEmail(email);
    };

    const signOut = () => auth.signOut();

    useEffect(() => {
        return auth.onAuthStateChanged((userAuth) => {
            setInitialUser(userAuth);
            setPending(false);
        });
    }, []);

    if (pending) {
        return (
            <div>
                <p>{"Lets get some work done! "}</p>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <FirebaseContext.Provider
            value={{
                initialUserState: initialUser,
                createUserWithEmailAndPassword: createUserWithEmailAndPassword,
                signInWithEmailAndPassword: signInWithEmailAndPassword,
                signOut: signOut,
                updateEmail: updateEmail,
                updatePassword: updatePassword,
                sendVerificationEmail: sendVerificationEmail
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    );
};

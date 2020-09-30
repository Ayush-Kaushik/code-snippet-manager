import React, {createContext, useState} from 'react';
import {fireStore} from "../components/Firebase";
import * as COLLECTION from "../constants/fireStoreCollections";

export const FireStoreContext = createContext(null);

export const FireStoreProvider = (props) => {
    const [initialStore, setInitialStore] = useState(null);

    const createNewTask = (taskDetails) => {

    };

    const createNewList = (listDetails) => {

    }

    const getListTasks = () => {
        fireStore.collection(COLLECTION.LISTS).get().then(querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            console.log(data); // array of cities objects
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <FireStoreContext.Provider value={{
            initialStore: initialStore,
            getListTasks: getListTasks
        }}>
            {props.children}
        </FireStoreContext.Provider>
    )
};
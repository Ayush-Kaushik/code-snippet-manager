import React, {createContext, useState} from 'react';
import {fireStore} from "../components/Firebase";
import * as COLLECTION from "../constants/fireStoreCollections";

export const FireStoreContext = createContext(null);

export const FireStoreProvider = (props) => {
    const [initialStore, setInitialStore] = useState({
        list: [],
        tasks: []
    });

    const createNewList = async (listDetails) => {
        await fireStore.collection(COLLECTION.LISTS).add({
            createdBy: listDetails.createdBy,
            createDateTime: listDetails.createDateTime,
            title: listDetails.title
        }).then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        });
    }

    const getListTasks = () => {
        fireStore.collection(COLLECTION.LISTS).get().then(querySnapshot => {

            const data = querySnapshot.docs.map(doc => ( {...doc.data(), id: doc.id}))
            setInitialStore(prevStore => {
                return {
                    ...prevStore,
                    list: data
                }
            })
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <FireStoreContext.Provider value={{
            initialStore: initialStore,
            getListTasks: getListTasks,
            createNewList: createNewList
        }}>
            {props.children}
        </FireStoreContext.Provider>
    )
};
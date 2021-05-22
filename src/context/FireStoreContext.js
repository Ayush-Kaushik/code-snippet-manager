import React, { createContext, useContext, useState } from "react";
import firebase from "firebase/app";
import { fireStore } from "../components/Firebase";
import { FirebaseContext } from "./FirebaseContext";

export const FireStoreContext = createContext(null);

export const FireStoreProvider = (props) => {
    const fireBaseContext = useContext(FirebaseContext);
    const [todoStore, setToDoStore] = useState({
        tasks: [],
        selectedTaskId: null
    });

    /**
     * streams tasks created by a specific user
     */
    const streamTasks = () => {
        // fireStore
        //     .collection(COLLECTION.LISTS)
        //     .where("createdBy", "==", fireBaseContext.initialUserState.email)
        //     .get()
        //     .then((snapshot) => {
        //         console.log("This is called");

        //         const firestoreList = snapshot.docs.map((item) => {
        //             return {...item.data(), id: item.id};
        //         });

        //         setInitialStore((prevStore) => {
        //             return {
        //                 ...prevStore,
        //                 list: firestoreList,
        //             };
        //         });
        //     })
        //     .catch((error) => {
        //         setInitialStore((prevStore) => {
        //             return {
        //                 ...prevStore,
        //                 list: [],
        //             };
        //         });
        //         console.log(error);
        //     });
    };

    /**
     * Creates a new task and returns the promise
     * @param userId - connected to the task list
     * @param taskDetails - task details to be added
     * @returns {Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>}
     */
    const createNewTask = (listId, taskDetails) => {
        return fireStore.collection(listId).add({
            completed: "",
            createdDateTime: firebase.firestore.FieldValue.serverTimestamp(),
            description: taskDetails.description,
            priority: taskDetails.priority,
            title: taskDetails.title,
        });
    };


    const initializeCollection = (email) => {
        return fireStore.collection(email).add({
            "test": "test"
        });
    }

    return (
        <FireStoreContext.Provider
            value={{
                initialStore: todoStore,
                streamTasks: streamTasks,
                createNewTask: createNewTask,
                initializeCollection: initializeCollection
            }}
        >
            {props.children}
        </FireStoreContext.Provider>
    );
};

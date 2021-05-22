import React, { createContext, useContext, useState, useEffect } from "react";
import firebase from "firebase/app";
import { fireStore } from "../components/Firebase";
import { FirebaseContext } from "./FirebaseContext";

export const FireStoreContext = createContext(null);

export const FireStoreProvider = (props) => {
    const fireBaseContext = useContext(FirebaseContext);
    const [todoStore, setToDoStore] = useState({
        tasks: [],
        errors: null
    });


    useEffect(() => {
        streamTasks();
    }, [])

    /**
     * streams tasks created by a specific user
     */
    const streamTasks = () => {

        console.log(fireBaseContext.initialUserState.email);

        fireStore
            .collection(fireBaseContext.initialUserState.email)
            .get()
            .then((snapshot) => {


                const taskList = snapshot.docs.map((item) => {
                    return {...item.data(), id: item.id};
                });

                console.log(taskList);

                setToDoStore((prevStore) => {
                    return {
                        ...prevStore,
                        tasks: taskList
                    };
                });
            })
            .catch((error) => {
                console.log(error);
                setToDoStore((prevStore) => {
                    return {
                        ...prevStore,
                        error: error,
                    };
                });
            });
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


    const initializeCollection = (username) => {
        return fireStore.collection(username).add({
            "title": "your first task!",
            "isActive": true
        });
    }

    return (
        <FireStoreContext.Provider
            value={{
                todoStore: todoStore,
                streamTasks: streamTasks,
                createNewTask: createNewTask,
                initializeCollection: initializeCollection
            }}
        >
            {props.children}
        </FireStoreContext.Provider>
    );
};

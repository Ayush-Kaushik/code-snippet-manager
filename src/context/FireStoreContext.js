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

        if (fireBaseContext.initialUserState) {
            fireStore
                .collection(fireBaseContext.initialUserState.email)
                .get()
                .then((snapshot) => {
                    const taskList = snapshot.docs.map((item) => {
                        return { ...item.data(), id: item.id };
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
        }
    };

    /**
     * Creates a new task and returns the promise
     * @param userId - connected to the task list
     * @param taskDetails - task details to be added
     * @returns {Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>}
     */
    const createNewTask = (collectionId, taskDetails) => {

        console.log(collectionId);
        console.log(taskDetails);

        return fireStore.collection(collectionId).add({
            title: taskDetails.title,
            isActive: taskDetails.isActive
        });
    };

    /**
     * 
     * @param {*} taskId Id of the task as stored in firestore collection
     */
    const deleteTask = (collectionId, taskId) => {
        console.log(collectionId);
        console.log(taskId);

        return fireStore.collection(collectionId).doc(taskId).delete();
    }


    const markAsComplete = (collectionId, taskId) => {
        return fireStore.collection(collectionId).doc(taskId).update({
            isComplete: true
        })
    }


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
                deleteTask: deleteTask,
                markAsComplete: markAsComplete,
                initializeCollection: initializeCollection
            }}
        >
            {props.children}
        </FireStoreContext.Provider>
    );
};

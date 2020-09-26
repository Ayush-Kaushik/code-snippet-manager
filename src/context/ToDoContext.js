import React, {createContext} from 'react';

export const ToDoContext = createContext();
const addTask = () => {
    console.log("Added new task");
}

const removeTask = () => {
    console.log("Remove task");
}

export const ToDoProvider = (props) => {
    const initialState = {};
    return (
        <ToDoContext.Provider
            value={{
                initialState: initialState,
                addTask: addTask,
                removeTask: removeTask
            }}>
            {props.children}
        </ToDoContext.Provider>
    )
}


import React, { useContext, useState } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import { FireStoreContext } from "../context/FireStoreContext";

const NewTask = () => {
    const fireStoreContext = useContext(FireStoreContext);
    const firstBaseContext = useContext(FirebaseContext);

    const [taskInput, setTaskInput] = useState({
        title: "",
        isActive: true
    });

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(firstBaseContext);

        fireStoreContext.createNewTask(
            firstBaseContext.initialUserState.email,
            {
                title: taskInput.title,
                isActive: true
            });
    };

    return (
        <div className="newtask-layout">
            <input
                type="text"
                value={taskInput.title}
                placeholder={"eg. Get groceries"}
                onChange={(e) => {
                    let newTitleInput = e.target.value;
                    setTaskInput((prevState) => {
                        return {
                            ...prevState,
                            title: newTitleInput
                        }
                    });
                }}
            />

            <div>
                <button
                    className="button success-button"
                    onClick={(e) => {
                        onSubmit(e);
                    }}
                >
                    {"Add Task"}
                </button>
                <button className="button fail-button"
                    onSubmit={(e) => {
                        console.log("scratch that bro");
                    }}
                >
                    {"Cancel"}
                </button>
            </div>

        </div>
    );
};

export default NewTask;

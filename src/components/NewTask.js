import React, { useContext, useState } from "react";
import { FireStoreContext } from "../context/FireStoreContext";

const NewTask = () => {
    const fireStoreContext = useContext(FireStoreContext);

    const [taskInput, setTaskInput] = useState({
        title: ""
    });

    const onSubmit = (e) => {
        e.preventDefault();

        fireStoreContext.createNewTask({
            title: taskInput.title
        });

        fireStoreContext.streamList();
    };

    return (
        <div>
            <input
                type="text"
                value={taskInput.title}
                label={"Title"}
                placeholder={"eg. Finish CI/CD pipeline"}
                onChange={(e) => {
                    setTaskInput((prevState) => {
                        let newTitleInput = e.target.value;
                        return {
                            ...prevState,
                            title: newTitleInput
                        }
                    });
                }}
            />
            <button
                onClick={(e) => {
                    onSubmit(e);
                }}
            >
                {"Add Task"}
            </button>
            <button
                onSubmit={(e) => {
                    console.log("scratch that bro");
                }}
            >
                {"Cancel"}
            </button>
        </div>
    );
};

export default NewTask;

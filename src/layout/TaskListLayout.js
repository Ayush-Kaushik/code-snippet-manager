import React, { useContext } from "react";
import { FireStoreContext } from "../context/FireStoreContext";
import NewTask from "../components/NewTask";

const TaskListLayout = () => {
    const fireStoreContext = useContext(FireStoreContext);

    return (
        <div>
            <NewTask />
            <div>

                {fireStoreContext.todoStore.tasks.map((item) => {
                    console.log(item);

                    return (
                        <div key={item.id} className="task-card">
                            <label>{item.title}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TaskListLayout;

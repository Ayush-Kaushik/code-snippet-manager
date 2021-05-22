import React, {useContext} from "react";
import {FireStoreContext} from "../context/FireStoreContext";
import NewTask from "../components/NewTask";

const TaskListLayout = () => {
    const fireStoreContext = useContext(FireStoreContext);

    return (
        <div>
            <NewTask />
            <div>
                {fireStoreContext.initialStore.tasks.map((item) => {
                    console.log(item);

                    return (
                        <div key={item.id}>
                            <input
                                type="checkbox"
                                label={item.title}
                                checked={false}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            
        </div>
    );
};

export default TaskListLayout;

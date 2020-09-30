import React, {useState, useContext, useEffect} from 'react';
import {TextInput, Button} from 'evergreen-ui';
import {ToDoContext} from "../context/ToDoContext";
import {FirebaseContext} from "../context/FirebaseContext";
import {FireStoreContext} from "../context/FireStoreContext";

const ToDoForm = () => {
    const todoContext = useContext(ToDoContext);
    const fireStoreContext = useContext(FireStoreContext)
    const [content, setContent] = useState("");
    const fireBaseContext = useContext(FirebaseContext);

    const confirmSubmission = (e) => {
        e.preventDefault();

        if (content.length !== 0) {
            todoContext.addTask(content);
        }
    }

    useEffect(() => {
        fireStoreContext.getListTasks();
    }, []);

    return (
        <div>
            <Button
                intent={"danger"}
                type={"primary"}
                onClick={() => {
                    fireBaseContext.signOut();
                }}>{"Signout"}</Button>
            <form onSubmit={e => {
                confirmSubmission(e)
            }}>
                <TextInput
                    type="text"
                    value={content}
                    onChange={e => {
                        console.log(e.target.value);
                        setContent(e.target.value)
                    }}/>

                <Button type="submit">
                    Submit
                </Button>
            </form>
        </div>
    )

}

export default ToDoForm;
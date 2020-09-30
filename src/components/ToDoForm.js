import React, {useState, useContext} from 'react';
import {TextInput, Button} from 'evergreen-ui';
import {ToDoContext} from "../context/ToDoContext";
import {FirebaseContext} from "../context/FirebaseContext";

const ToDoForm = () => {
    const todoContext = useContext(ToDoContext);
    const [content, setContent] = useState("");
    const fireBaseContext = useContext(FirebaseContext);

    const confirmSubmission = (e) => {
        e.preventDefault();

        if (content.length !== 0) {
            todoContext.addTask(content);
        }
    }

    return (
        <div>
            <Button
                intent={"error"}
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
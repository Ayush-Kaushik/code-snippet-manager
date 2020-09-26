import React, {useState, useContext} from 'react';
import {Form, Button} from "react-bootstrap";
import {v4 as uuidv4} from 'uuid';
import {ToDoContext} from "../context/ToDoContext";

const ToDoForm = (props) => {
    const todoContext = useContext(ToDoContext);
    const [content, setContent] = useState("");

    const confirmSubmission = (e) => {
        e.preventDefault();

        if (content.length !== 0) {
            const taskId = uuidv4();
            console.log("Add this to list: " + content + " with task ID: " + taskId);

            todoContext.addTask();
        }


    }

    return (
        <Form onSubmit={e => {
            confirmSubmission(e)
        }}>
            <Form.Group controlId="todoForm">
                <Form.Control type="name" value={content} onChange={e => {
                    console.log(e.target.value);
                    setContent(e.target.value)
                }}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )

}

export default ToDoForm;
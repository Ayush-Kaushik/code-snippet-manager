import React from 'react';
import ToDoItem from "../components/ToDoItem";
import ToDoForm from "../components/ToDoForm";

const ToDoListLayout = (propr) => {

    const list = [
        {
            "createdBy": "Ayush",
            "id": "0",
            "createDate": "",
            "content": "Work on this app"
        },
        {
            "createdBy": "Ayush",
            "createDate": "",
            "id": "1",
            "content": "Get it done"
        },
        {
            "createdBy": "Ayush",
            "createDate": "",
            "id": "2",
            "content": "Finish it at all costs within 2 hours"
        }
    ]

    return (
        <div>
            <ToDoForm/>
            <div>{
                list.map((item) => {
                    return (
                        <ToDoItem information={item}/>
                    )
                })
            }</div>
        </div>
    )
};

export default ToDoListLayout;
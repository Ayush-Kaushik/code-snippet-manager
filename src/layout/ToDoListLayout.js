import React from 'react';
import ToDoItem from "../components/ToDoItem";
import ToDoForm from "../components/ToDoForm";
import NewList from "../components/NewList";

const list = [
    {
        "createdBy": "Ayush",
        "id": "0",
        "createDate": "",
        "content": "Work on this app",
        "list_name": "temp_1"
    },
    {
        "createdBy": "Ayush",
        "createDate": "",
        "id": "1",
        "content": "Get it done",
        "list_name": "temp_1"
    },
    {
        "createdBy": "Ayush",
        "createDate": "",
        "id": "2",
        "content": "Finish it at all costs within 2 hours",
        "list_name": "temp_2"
    }
]


const ToDoListLayout = () => {
    return (
        <div style={{
            width: "100%"
        }}>
            <NewList/>
            <ToDoForm/>
            <div>{
                list.map((item) => {
                    return (
                        <ToDoItem key={item.id} information={item}/>
                    )
                })
            }</div>
        </div>
    )
};

export default ToDoListLayout;
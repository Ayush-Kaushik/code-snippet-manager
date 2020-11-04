import React from 'react';
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
        <div >
            {JSON.stringify(list)}
        </div>
    )
};

export default ToDoListLayout;
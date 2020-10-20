import React, {useContext, useState} from 'react';
import {Button, TextInput, AddIcon} from "evergreen-ui";
import {FireStoreContext} from "../context/FireStoreContext";
import {FirebaseContext} from "../context/FirebaseContext";

const NewList = () => {
    const [title, setTitle] = useState("");
    const fireStoreContext = useContext(FireStoreContext);
    const fireBaseContext = useContext(FirebaseContext);

    const onSubmit = (e) => {
        e.preventDefault();

        fireStoreContext.createNewList({
            title: title,
            createdBy: fireBaseContext.initialUserState.email,
            createDateTime: new Date().getSeconds(),
            taskCount: 0
        });

        fireStoreContext.streamList();
        setTitle("");
    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <TextInput
                type="text"
                name={"title"}
                value={title}
                label={""}
                placeholder={"Add list"}
                style={{
                    width: "60%",
                    marginRight: "2px"

                }}
                height={32}
                onChange={e => {
                    setTitle(e.target.value)
                }}/>
            <Button
                appearance="primary"
                intent="success"
                height={32}
                onClick={e => {
                    onSubmit(e)
                }}>
                <AddIcon/>
            </Button>
        </div>
    )
};

export default NewList;
import React, {useContext, useState} from 'react';
import * as LABELS from "../constants/labels";
import {Button, Pane, TextInputField} from "evergreen-ui";
import {FireStoreContext} from "../context/FireStoreContext";
import {FirebaseContext} from "../context/FirebaseContext";

const NewList = () => {
    const [title, setTitle] = useState("");
    const fireStoreContext = useContext(FireStoreContext);
    const fireBaseContext = useContext(FirebaseContext);

    const onSubmit = async (e) => {
        e.preventDefault();

        await fireStoreContext.createNewList({
            title: title,
            createdBy: fireBaseContext.initialUserState.email,
            createDateTime: new Date().getSeconds()
        });
    }

    return (
        <Pane
            elevation={3}
            display={"flex"}
            flexDirection="column"
            flexWrap={"wrap"}
            padding={"1.5vw"}
            style={{
                backgroundColor: "#EDF0F2",
                borderRadius: "5px"
            }}
        >
            <TextInputField
                type="text"
                name={"title"}
                value={title}
                label={LABELS.LIST_TITLE}
                onChange={e => {
                    setTitle(e.target.value)
                }}/>

            <Button
                appearance="primary"
                intent="success"
                margin={"2px"}
                width={"150px"}
                style={{
                    display: "inline-block",
                    verticalAlign: "top"
                }}
                onClick={e => {
                    onSubmit(e)
                }}>
                {LABELS.CREATE_LIST}
            </Button>
        </Pane>
    )
};

export default NewList;
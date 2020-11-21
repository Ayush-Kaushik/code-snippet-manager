import React, {useContext, useState} from "react";
import {
    Button,
    TextInput,
    AddIcon,
    FlagIcon,
    CrossIcon,
    SelectMenu,
    Tooltip,
    TimeIcon,
} from "evergreen-ui";
import {FireStoreContext} from "../context/FireStoreContext";
import {FirebaseContext} from "../context/FirebaseContext";
import * as LABELS from "../constants/labels";

const NewTask = () => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState(null);
    const [dueDateTime, setDueDateTime] = useState(null);
    const fireStoreContext = useContext(FireStoreContext);
    const fireBaseContext = useContext(FirebaseContext);

    const onSubmit = (e) => {
        e.preventDefault();

        fireStoreContext.createNewTask({
            listId: fireBaseContext.initialUserState.selectedListId,
            title: title,
            createDateTime: new Date().getSeconds(),
        });

        fireStoreContext.streamList();
        setTitle("");
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "5px",
                }}
            >
                <TextInput
                    style={{
                        marginRight: "2px",
                    }}
                    type="text"
                    name={"title"}
                    value={title}
                    height={32}
                    label={"Title"}
                    placeholder={"eg. Finish CI/CD pipeline"}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />

                <div
                    style={{
                        marginRight: "2px",
                    }}
                >
                    <Tooltip content={"Priority"}>
                        <SelectMenu
                            height={100}
                            width={180}
                            hasTitle={false}
                            hasFilter={false}
                            selected={priority}
                            options={LABELS.PRIORITY}
                            onSelect={(e) => setPriority(e.target.value)}
                        >
                            <Button>
                                <FlagIcon />
                            </Button>
                        </SelectMenu>
                    </Tooltip>
                </div>
                <Button>
                    <TimeIcon />
                </Button>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                }}
            >
                <Button
                    style={{
                        marginRight: "2px",
                    }}
                    appearance="primary"
                    iconBefore={AddIcon}
                    intent="success"
                    onClick={(e) => {
                        onSubmit(e);
                    }}
                >
                    {"Add Task"}
                </Button>
                <Button
                    style={{
                        marginRight: "2px",
                    }}
                    appearance="primary"
                    iconBefore={CrossIcon}
                    intent={"danger"}
                    onSubmit={(e) => {
                        console.log("scratch that bro");
                    }}
                >
                    {"Cancel"}
                </Button>
            </div>
        </div>
    );
};

export default NewTask;

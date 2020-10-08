import React, {useContext, useEffect} from 'react';
import {FireStoreContext} from "../context/FireStoreContext";
import {Pane, Heading, Button} from "evergreen-ui";
import NewList from "../components/NewList";
import * as LABELS from "../constants/labels";

const ListCollectionLayout = () => {
    const fireStoreContext = useContext(FireStoreContext);

    useEffect(() => {
        fireStoreContext.getListTasks();
        console.log(fireStoreContext.initialStore.list);

    }, []);

    return (
        <div style={{
            width: "100%"
        }}>
            <NewList/>
            <div>
                {
                    fireStoreContext.initialStore.list.map((item) => {
                        console.log(item);

                        return (
                            <Pane
                                elevation={2}
                                display={"flex"}
                                flexDirection={"row"}
                                margin={"1.5vw"}
                                padding={"1.5vw"}
                                key={item.id}
                            >
                                <Heading
                                    flexGrow={1}
                                    is={"h4"}
                                >{item.title}</Heading>
                                <div flexGrow={2}>
                                    <Button
                                        appearance="primary"
                                        margin={"5px"}
                                        onClick={() => {

                                        }}>
                                        {LABELS.LIST_VIEW_TASKS}
                                    </Button>

                                    <Button
                                        appearance="primary"
                                        intent="danger"
                                        margin={"5px"}
                                        onClick={() => {
                                        }}>
                                        {LABELS.LIST_VIEW_DELETE}
                                    </Button>
                                </div>
                            </Pane>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default ListCollectionLayout;
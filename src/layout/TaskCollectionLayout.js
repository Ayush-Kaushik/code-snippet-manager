import React, {useContext, useEffect} from 'react';
import {FireStoreContext} from "../context/FireStoreContext";
import { TrashIcon, Paragraph, Button} from "evergreen-ui";

const TaskCollectionLayout = () => {
    const fireStoreContext = useContext(FireStoreContext);

    useEffect(() => {
        fireStoreContext.streamList()
    }, []);

    return (
        <div>
            <div>
                {
                    fireStoreContext.initialStore.list.map((item) => {
                        console.log(item);

                        return (
                            <div
                                key={item.id}
                                style={{
                                    display: "flex",
                                    padding: "15px",
                                    marginRight: "5px",
                                    alignItems: "center"
                                }}
                            >
                                <Paragraph
                                    size={300}
                                    style={{
                                        overflowX: "hidden",
                                        textOverflow: "ellipsis",
                                        width: "70%"
                                    }}
                                >{item.title}</Paragraph>

                                <Button color={"danger"}
                                        appearance="minimal"
                                        intent="danger"
                                        margin={"5px"}
                                        height={20}
                                        onClick={() => {
                                        }}>
                                    <TrashIcon/>
                                </Button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default TaskCollectionLayout;
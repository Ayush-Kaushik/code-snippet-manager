import React, {useContext, useEffect} from 'react';
import {FireStoreContext} from "../context/FireStoreContext";
import {TrashIcon, Paragraph, Button} from "evergreen-ui";
import * as ROUTES from "../constants/routes";
import {useHistory} from "react-router-dom";
import {FirebaseContext} from "../context/FirebaseContext";

const ListCollectionLayout = () => {
    const fireStoreContext = useContext(FireStoreContext);
    const fireBaseContext = useContext(FirebaseContext);
    const history = useHistory();

    useEffect(() => {
        if(fireBaseContext.initialUserState) {
            fireStoreContext.streamList();
        }
    }, []);

    return (
        <div>
            <div>
                {
                    fireStoreContext.initialStore.list.map((item) => {
                        return (
                            <div
                                key={item.id}
                                style={{
                                    display: "flex",
                                    padding: "15px",
                                    marginRight: "5px",
                                    alignItems: "center"
                                }}

                                onClick={() => {
                                    console.log(`This div is clicked: ${item.id}`)
                                    fireStoreContext.streamListTasks(item.id)
                                    history.push(ROUTES.HOME);
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

export default ListCollectionLayout;
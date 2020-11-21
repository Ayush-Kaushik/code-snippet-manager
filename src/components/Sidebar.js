import React, {useState, useContext} from "react";
import {SidebarTab, Tablist, Pane, Paragraph} from "evergreen-ui";
import * as ROUTES from "../constants/routes";
import {Link} from "react-router-dom";
import {LayersIcon, PersonIcon, PowerIcon} from "evergreen-ui";
import {FirebaseContext} from "../context/FirebaseContext";
import ListCollectionLayout from "../layout/ListCollectionLayout";
import NewList from "./NewList";

const sideBarContent = [
    {
        label: "Lists",
        path: ROUTES.HOME,
        icon: <LayersIcon />,
    },
    {
        label: "Profile",
        path: ROUTES.PROFILE,
        icon: <PersonIcon />,
    },
    {
        label: "SignOut",
        path: ROUTES.PROFILE,
        icon: <PowerIcon />,
    },
];

const SideBar = () => {
    const [selectedIndex, setSelectedIndex] = useState("");
    const firebaseContext = useContext(FirebaseContext);

    return (
        <Pane
            style={{
                height: "100vh",
            }}
            elevation={2}
        >
            <div>
                <Paragraph
                    style={{
                        margin: "5px",
                    }}
                    size={400}
                >
                    {"Main"}
                </Paragraph>
                <Tablist>
                    {sideBarContent.map((item, index) => {
                        if (item.label === "SignOut") {
                            return (
                                <SidebarTab
                                    key={index}
                                    id={index}
                                    onSelect={() => {
                                        firebaseContext.signOut();
                                    }}
                                    isSelected={index === selectedIndex}
                                    aria-controls={`panel-${item.label}`}
                                    style={{
                                        padding: "5px",
                                        margin: "5px",
                                    }}
                                >
                                    {item.icon}
                                    <span
                                        style={{
                                            padding: "5px",
                                        }}
                                    />
                                    {item.label}
                                </SidebarTab>
                            );
                        } else {
                            return (
                                <Link
                                    key={index}
                                    to={item.path}
                                    style={{
                                        textDecoration: "none",
                                    }}
                                >
                                    <SidebarTab
                                        key={index}
                                        id={index}
                                        onSelect={() => setSelectedIndex({index})}
                                        isSelected={index === selectedIndex}
                                        aria-controls={`panel-${item.label}`}
                                        style={{
                                            padding: "5px",
                                            margin: "5px",
                                        }}
                                    >
                                        {item.icon}
                                        <span
                                            style={{
                                                padding: "5px",
                                            }}
                                        />
                                        {item.label}
                                    </SidebarTab>
                                </Link>
                            );
                        }
                    })}
                </Tablist>
            </div>
            <hr />
            <Paragraph
                style={{
                    margin: "5px",
                }}
                size={400}
            >
                {"My Lists"}
            </Paragraph>
            <div
                style={{
                    height: "60%",
                    overflowY: "scroll",
                }}
            >
                <ListCollectionLayout />
            </div>
            <div
                style={{
                    bottom: "0",
                }}
            >
                <NewList />
            </div>
        </Pane>
    );
};

export default SideBar;

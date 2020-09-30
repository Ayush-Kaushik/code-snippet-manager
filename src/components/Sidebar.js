import React, {useState} from 'react';
import {Pane, SidebarTab, Tablist} from "evergreen-ui";
import * as ROUTES from "../constants/routes";
import {Link} from "react-router-dom";

const sideBarContent = [
    {
        label: "Lists",
        path: ROUTES.HOME
    },
    {
        label: "profile",
        path: ROUTES.PROFILE
    }
];

const SideBar = () => {
    const [selectedIndex, setSelectedIndex] = useState("");

    return (
        <Pane display="flex" height={"100vh"}>
            <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
                {
                    sideBarContent.map((item, index) => {
                        return (
                            <SidebarTab
                                key={index}
                                id={index}
                                onSelect={() => setSelectedIndex({index})}
                                isSelected={index === selectedIndex}
                                aria-controls={`panel-${item.label}`}
                            >
                                <Link to={item.path}>
                                    {item.label}
                                </Link>
                            </SidebarTab>
                        )
                    })
                }
            </Tablist>
        </Pane>
    );


};


export default SideBar;
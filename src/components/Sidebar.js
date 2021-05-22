import React, { useState, useContext } from "react";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../context/FirebaseContext";

const sideBarContent = [
    {
        label: "Task List",
        path: ROUTES.HOME,
        icon: "",
    },
    {
        label: "Profile",
        path: ROUTES.PROFILE,
        icon: "",
    },
    {
        label: "SignOut",
        path: ROUTES.PROFILE,
        icon: "",
    },
];

const SideBar = () => {
    const [selectedIndex, setSelectedIndex] = useState("");
    const firebaseContext = useContext(FirebaseContext);

    return (
        <div>
            {sideBarContent.map((item, index) => {
                if (item.label === "SignOut") {
                    return (
                        <div
                            key={index}
                            id={index}
                            onClick={() => {
                                firebaseContext.signOut();
                            }}
                        >
                            {item.label}
                        </div>
                    );
                } else {
                    return (
                        <Link
                            key={index}
                            to={item.path}
                        >
                            <div
                                key={index}
                                id={index}
                                onSelect={() => setSelectedIndex({ index })}
                            >
                                {item.label}
                            </div>
                        </Link>
                    );
                }
            })}
        </div>
    );
};

export default SideBar;

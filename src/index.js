import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { FirebaseProvider } from "./context/FirebaseContext";
import { FireStoreProvider } from "./context/FireStoreContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <FirebaseProvider>
        <FireStoreProvider>
            <App />
        </FireStoreProvider>
    </FirebaseProvider>
);

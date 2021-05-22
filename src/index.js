import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {FirebaseProvider} from "./context/FirebaseContext";
import * as serviceWorker from "./serviceWorker";
import {FireStoreProvider} from "./context/FireStoreContext";

ReactDOM.render(
    <React.StrictMode>
        <FirebaseProvider>
            <FireStoreProvider>
                    <App />
            </FireStoreProvider>
        </FirebaseProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.unregister();

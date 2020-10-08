import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ToDoProvider} from "./context/ToDoContext";
import {FirebaseProvider} from "./context/FirebaseContext";
import * as serviceWorker from './serviceWorker';
import {FireStoreProvider} from "./context/FireStoreContext";

ReactDOM.render(
    <React.StrictMode>
        <FirebaseProvider>
            <FireStoreProvider>
                <ToDoProvider>
                    <App/>
                </ToDoProvider>
            </FireStoreProvider>
        </FirebaseProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();

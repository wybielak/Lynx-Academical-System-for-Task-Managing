import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import { StoreContext, Store } from "./mobx/Store.js";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>

        <StoreContext.Provider value={Store}>
            <App />
        </StoreContext.Provider>

    </React.StrictMode>

);
